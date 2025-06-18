const { app, BrowserWindow, ipcMain, systemPreferences, dialog } = require('electron')
const path = require('node:path')
const {spawn} = require("child_process")
const { stringify } = require('node:querystring')
const { spawnSync } = require('node:child_process')

let win
let python
let loginResponseResolver = null;
let userPfpResponseResolver = null;
let getVideoBatchResponseResolver = null;
let getTagsResponseResolver = null
let pythonBuffer = "";


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


  ipcMain.on("uploadPage",
    () => win.loadFile("resources/uploadVideo.html"),
  )

  ipcMain.on("home",
    () => win.loadFile("resources/mainMenu.html"),
  )

  
  ipcMain.handle('open-video-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'ogg'] }],
      properties: ['openFile']
    });
    if (canceled) return null;
    console.log(filePaths[0])
    return filePaths[0];
  });
  

  ipcMain.on("addTag",
    (event, tag) => {
      const tagData = {
      type: "addTagRequest",
      tag: tag,
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(tagData) + "\n");
        win.loadFile("resources/mainMenu.html")
    } else {
        console.log("Python is not writable");
    }
    }
  )

  ipcMain.on("saveSettings",
    (event, data) => {
      const settingsData = {
      type: "saveSettingsRequest",
      pfp: data.pfp,
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(settingsData) + "\n");
        win.loadFile("resources/settings.html")
    } else {
        console.log("Python is not writable");
    }
    }
  )

  ipcMain.on("signOut",
    () => {
      const signOutData = {
      type: "signOutRequest",
      };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(signOutData) + "\n");
        win.loadFile("resources/loginPage.html")
    } else {
        console.log("Python is not writable");
    }
    }
  )

  ipcMain.on("deleteTag",
    (event, tag) => {
      const tagData = {
      type: "deleteTagRequest",
      tag: tag,
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(tagData) + "\n");
        win.loadFile("resources/mainMenu.html")
    } else {
        console.log("Python is not writable");
    }
    }
  )

  ipcMain.handle("userPage", (event, user) => userPage(user))

  ipcMain.handle("login",
    (event, username, password) => login(username, password),
  )


  ipcMain.handle("getUserPfp", () => getUserPfp())
  ipcMain.handle("getVideoBatch", () => getVideoBatch())
  ipcMain.handle("getTags", () => getTags())

  const { spawn } = require("child_process");


  const path = require("path");

  const executablePath = path.join(__dirname, "dist", "main.exe");
  console.log("Launching executable at:", executablePath);

  python = spawn(executablePath, {
    stdio: ["pipe", "pipe", "inherit"],
  });


  python.stdout.on('data', (data) => {
    pythonBuffer += data.toString();
    let lines = pythonBuffer.split('\n');
    pythonBuffer = lines.pop();
    for (const line of lines) {
      if (line.trim()) {
        pythonHandler(line);
      }
    }
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
  
async function getTags(){
  return new Promise((resolve, reject) => {
    getTagsResponseResolver = resolve;
    const data = {
      type: "getTagsRequest"
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(data) + "\n");
    } else {
        getVideoBatchResponseResolver = null;
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
  
  win.loadFile("resources/userPage.html")
  return user
}

async function getVideoBatch(){
   return new Promise((resolve, reject) => {
    getVideoBatchResponseResolver = resolve;
    const data = {
      type: "getVideoBatchRequest"
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(data) + "\n");
    } else {
        getVideoBatchResponseResolver = null;
        reject("Python is not writable");
    }
  });

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
  else if(obj["type"] == "userPfpResponse"){
    userPfpResponseResolver(obj["pfp"])
    userPfpResponseResolver = null;
  }
  else if(obj["type"] == "getVideoBatchResponse"){
    getVideoBatchResponseResolver(obj["titles"])
    getVideoBatchResponseResolver = null;
  }
  else if(obj["type"] == "getTagsResponse"){
    console.log(obj["tags"])
    getTagsResponseResolver(obj["tags"])
    getTagsResponseResolver = null;
  }
  
}
