const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const {spawn} = require("child_process")
const { stringify } = require('node:querystring')

let win
let python
let pythonCache = []

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('resources/mainMenu.html')
  win.setMenu(null)
  win.title = ""
  //win.webContents.openDevTools();

}

app.whenReady().then(() => {
  createWindow()
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

  ipcMain.on("settings",
    () => win.loadFile("resources/settings.html"),
  )

  ipcMain.on("home",
    () => win.loadFile("resources/mainMenu.html"),
  )

  ipcMain.handle("userPage", (event, user) => userPage(user))

})

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
  console.log(obj["type"])
}