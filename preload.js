const { contextBridge, ipcRenderer } = require('electron/renderer')
let userData = null

contextBridge.exposeInMainWorld('api', {
  settings: () => ipcRenderer.send("settings"),
  home: () => ipcRenderer.send("home"),
  userPage: async (user) => {
    userData = await ipcRenderer.invoke("userPage", user)
    console.log(userData)
  },
  login: async (username, password) => await ipcRenderer.invoke("login", username, password),
  getUserData: () => userData,
})
