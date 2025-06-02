const settings = document.getElementById("Settings")
const home = document.getElementById("homeButton")

settings.addEventListener("click", () => window.api.settings())
home.addEventListener("click", () => window.api.home())

