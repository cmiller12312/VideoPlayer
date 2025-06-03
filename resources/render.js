const settings = document.getElementById("Settings")
const home = document.getElementById("homeButton")
const user = document.getElementById("profilePicture")

settings.addEventListener("click", () => window.api.settings())
home.addEventListener("click", () => window.api.home())
user.addEventListener("click", () => window.api.userPage("test"))
