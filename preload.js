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
  getUserPfp: async () => await ipcRenderer.invoke("getUserPfp"),
  getVideoBatch: async () => await ipcRenderer.invoke("getVideoBatch"),
  addTag: (tag) => ipcRenderer.send("addTag", tag),
  getTags: async () => ipcRenderer.invoke("getTags"),
  deleteTag: (tag) => ipcRenderer.send("deleteTag", tag),
  saveSettings: (data) => ipcRenderer.send("saveSettings", data),
  signOut: (data) => ipcRenderer.send("signOut"),
  uploadPage: () => ipcRenderer.send("uploadPage"),
  openVideoFile: async () => await ipcRenderer.invoke('open-video-file'),
  uploadVideo: (data) => ipcRenderer.send("uploadVideo", data),
  noAccount: () => ipcRenderer.send("noAccount"),
  signup: async (username, password) => await ipcRenderer.invoke("signup", username, password),
  search: async (data) => await ipcRenderer.invoke("search", data),
})
