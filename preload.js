const { contextBridge, ipcRenderer } = require('electron/renderer')
let userData = null

contextBridge.exposeInMainWorld('api', {
  settings: () => ipcRenderer.send("settings"),
  home: () => ipcRenderer.send("home"),
  userPageContent: async () => await ipcRenderer.invoke("userPageContent"),
  userPage: (data) => ipcRenderer.send("userPage", data),
  login: async (username, password) => await ipcRenderer.invoke("login", username, password),
  getUserData: () => userData,
  getUserPfp: async () => await ipcRenderer.invoke("getUserPfp"),
  getVideoBatch: async () => await ipcRenderer.invoke("getVideoBatch"),
  saveSettings: (data) => ipcRenderer.send("saveSettings", data),
  signOut: () => ipcRenderer.send("signOut"),
  uploadPage: () => ipcRenderer.send("uploadPage"),
  openVideoFile: async () => await ipcRenderer.invoke('open-video-file'),
  uploadVideo: (data) => ipcRenderer.send("uploadVideo", data),
  noAccount: () => ipcRenderer.send("noAccount"),
  signup: async (username, password) => await ipcRenderer.invoke("signup", username, password),
  search: async (input) => await ipcRenderer.invoke("search", input=input),
  videoPage: () => ipcRenderer.send("videoPage"),
  getRequestedVideo: () => ipcRenderer.invoke("getRequestedVideo"),
  setRequestedVideo: (title, user) => ipcRenderer.send("setRequestedVideo", title, user),
  followStatus: async (username) => await ipcRenderer.invoke("followStatus", username),
  follow: (data) => ipcRenderer.send("follow", data),

})
