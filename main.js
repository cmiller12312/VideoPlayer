const { app, BrowserWindow, ipcMain, systemPreferences } = require('electron')
const path = require('node:path')
const {spawn} = require("child_process")
const { stringify } = require('node:querystring')
const { spawnSync } = require('node:child_process')

let win
let python
let loginResponseResolver = null;
let userPfpResponseResolver = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('resources/loginPage.html')
  win.setMenu(null)
  win.title = ""
  win.webContents.openDevTools();

}

app.whenReady().then(() => {
  createWindow()

  ipcMain.on("settings",
    () => win.loadFile("resources/settings.html"),
  )

  ipcMain.on("home",
    () => win.loadFile("resources/mainMenu.html"),
  )

  ipcMain.handle("userPage", (event, user) => userPage(user))

  ipcMain.handle("login",
    (event, username, password) => login(username, password),
  )


  ipcMain.handle("getUserPfp", () => getUserPfp())
  const { spawn } = require("child_process");


  const path = require("path");

  const executablePath = path.join(__dirname, "dist", "main.exe");
  console.log("Launching executable at:", executablePath);

  python = spawn(executablePath, {
    stdio: ["pipe", "pipe", "inherit"],
  });

  python.stdout.on('data', (data) => {
    pythonHandler(data.toString());
  });

  python.on("error", (err) => {
    console.error("Failed to start process:", err);
  });

  python.on('before-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
  });


})

function login(username, password) {
  return new Promise((resolve, reject) => {
    loginResponseResolver = resolve;
    const userData = {
      type: "loginPageRequest",
      username: username,
      password: password
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(userData) + "\n");
    } else {
        loginResponseResolver = null;
        reject("Python is not writable");
    }
  });
}

function getUserPfp(){
  return new Promise((resolve, reject) => {
    userPfpResponseResolver = resolve;
    const data = {
      type: "userPfpRequest"
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(data) + "\n");
    } else {
        userPfpResponseResolver = null;
        reject("Python is not writable");
    }
  });
}
  

async function userPage(user){
  console.log("userPage")
  console.log(user)
  const userData = {
    type: "userPageRequest",
    content: user
  }

  
  if (python && python.stdin.writable) {
    python.stdin.write(JSON.stringify(userData) + "\n");
  } else {
    console.error("Python is not writable");
  }
  
  return user
}

async function pythonHandler(data) {
  console.log(data)
  const obj = JSON.parse(data)
  if(obj["type"] == "loginResponse"){
    if(obj["value"] === true){
      win.loadFile("resources/mainMenu.html")
    }
    if (loginResponseResolver) {
      loginResponseResolver([obj["value"], obj["message"]]);
      loginResponseResolver = null;
    }
  }
  if(obj["type"] == "userPfpResponse"){
    userPfpResponseResolver(obj["pfp"])
    userPfpResponseResolver = null;
  }
}
