const { app, BrowserWindow, ipcMain, systemPreferences, dialog } = require('electron')
const path = require('node:path')
const {spawn} = require("child_process")
const { stringify } = require('node:querystring')
const { spawnSync } = require('node:child_process')
const { describe } = require('node:test')

let win
let python
let loginResponseResolver = null;
let userPfpResponseResolver = null;
let getVideoBatchResponseResolver = null;
let signupResolver = null;
let searchResolver = null;
let pythonBuffer = "";
let requestedVideo = {"title": null, "user": null}
let followStatusResolver = null;
let userPageResponseResolver = null;
let requestedUserPage = null
let requestedSearchPage = null

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

  ipcMain.on("setRequestedVideo",
    (event, title, user) => {
      requestedVideo.title = title
      requestedVideo.user = user
    }
  )

  ipcMain.handle("getRequestedVideo",
    () => {return requestedVideo}
  )
  


  ipcMain.on("home",
    () => win.loadFile("resources/mainMenu.html"),
  )

  ipcMain.on("noAccount", () => win.loadFile("resources/signupPage.html"))

  
  ipcMain.handle('open-video-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'ogg'] }],
      properties: ['openFile']
    });
    if (canceled) return null;
    return filePaths[0];
  });
  

  ipcMain.on("uploadVideo",
    (event, data) => {
      const uploadData = {
      type: "uploadVideoRequest",
      url: data["videoUrl"],
      cover: data["cover"],
      description: data["description"],
      title: data["title"],
      tags: data["tags"],
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(uploadData) + "\n");
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
      bio: data.bio,
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

  ipcMain.on("follow",
    (event, data) => {
      const followData = {
      type: "followRequest",
      username: data,
      };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(followData) + "\n");
    } else {
        console.log("Python is not writable");
    }
    }
  )

  ipcMain.on("videoPage", ()=> win.loadFile("resources/videoPage.html"))
  ipcMain.on("info", () => win.loadFile("resources/infoPage.html"))
  ipcMain.on("userPage", (event, data) => {
    win.loadFile("resources/userPage.html")
    requestedUserPage = data
  })

  ipcMain.handle("userPageContent", (event, user) => userPage(user))

  ipcMain.handle("searchPageContent", () => {
    return requestedSearchPage
  })

  ipcMain.handle("login",
    (event, username, password) => login(username, password),
  )

  ipcMain.handle("signup",
    (event, username, password) => signup(username, password),
  )

  ipcMain.handle("followStatus",
    (event, username) => followStatus(username),
  )


  ipcMain.handle("getUserPfp", () => getUserPfp())
  ipcMain.handle("getVideoBatch", () => getVideoBatch())
  ipcMain.handle("search", (event, input) => {
    search(input)
    win.loadFile("resources/search.html")
  })

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

function followStatus(username) {
  return new Promise((resolve, reject) => {
    followStatusResolver = resolve;
    const userData = {
      type: "followStatusRequest",
      username: username,
    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(userData) + "\n");
    } else {
        followStatusResolver = null;
        reject("Python is not writable");
    }
  });
}

function signup(username, password) {
  return new Promise((resolve, reject) => {
    signupResolver = resolve;
    const userData = {
      type: "signupRequest",
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
  

async function userPage(){
  return new Promise((resolve, reject) => {
    userPageResponseResolver = resolve;
    const data = {
      type: "userPageRequest",
      username: requestedUserPage
    };
      console.log(requestedUserPage)
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(data) + "\n");
    } else {
        userPageResponseResolver = null;
        reject("Python is not writable");
    }
  });
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

async function search(input){
   return new Promise((resolve, reject) => {
    searchResolver = resolve;
    console.log("passed value : " + input)
    const data = {
      type: "searchRequest",
      data: input,

    };
      if (python && python.stdin.writable) {
        python.stdin.write(JSON.stringify(data) + "\n");
    } else {
        searchResolver = null;
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
  else if(obj["type"] == "signupResponse"){
    if(obj["value"] === true){
      win.loadFile("resources/mainMenu.html")
    }
    if (signupResolver) {
      signupResolver([obj["value"], obj["message"]]);
      signupResolver = null;
    }
  }
  else if(obj["type"] == "searchResponse"){
    searchResolver(obj["data"]);
    requestedSearchPage = obj["data"]
    searchResolver = null;
    
  }
  else if(obj["type"] == "followStatusResponse"){
    followStatusResolver(obj["data"]);
    followStatusResolver = null;
    
  }
  else if(obj["type"] == "userPageResponse"){
    userPageResponseResolver(obj["data"]);
    userPageResponseResolver = null;
  }
  
}
