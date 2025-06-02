const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
  settings: () => ipcRenderer.send("settings"),
  home: () => ipcRenderer.send("home"),
  userPage: (user) => ipcRenderer.send("userPage", user),
})

