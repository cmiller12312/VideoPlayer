const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const {spawn} = require("child_process")


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('mainMenu.html')
  win.setMenu(null)
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  const { spawn } = require("child_process");


  const path = require("path");

  const executablePath = path.join(__dirname, "dist", "main.exe");
  console.log("Launching executable at:", executablePath);

  const python = spawn(executablePath, {
    stdio: ["pipe", "pipe", "inherit"],
  });

  python.stdout.on('data', (data) => {
  console.log('From binary:', data.toString());
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