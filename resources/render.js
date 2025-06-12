const settings = document.getElementById("Settings")
const home = document.getElementById("homeButton")
const user = document.getElementById("profilePicture")


try{
    settings.addEventListener("click", () => window.api.settings())
}
catch {
    console.log("couldnt make settings")
}

try{
    home.addEventListener("click", () => window.api.home())
}
catch {
    console.log("couldnt make home")
}

try{
    user.addEventListener("click", () => window.api.userPage("test"))
}
catch {
    console.log("couldnt make user")
}


