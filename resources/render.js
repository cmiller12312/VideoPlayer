const settings = document.getElementById("Settings")
const home = document.getElementById("homeButton")
const user = document.getElementById("profilePicture")
const search = document.getElementById("searchIcon")
const searchInput = document.getElementById("searchInput")
const info = document.getElementById("info")
const channelPage = document.getElementById("ChannelPage")


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
    user.addEventListener("click",() => {
        window.api.getUserPfp().then((data) => {
            window.api.userPage(data["username"])
        })
    })
}
catch {
    console.log("couldnt make user")
}

try{
    channelPage.addEventListener("click",() => {
        window.api.getUserPfp().then((data) => {
            window.api.userPage(data["username"])
        })
    })
}
catch {
    console.log("couldnt make channel page")
}

try{
    info.addEventListener("click", () => window.api.info())
}catch {
    console.log("couldnt make info")
}

try{
    search.addEventListener("click", () => {
        console.log(window.api.search(searchInput.value))
        console.log("SEARCH: " + searchInput.value)
    })
}
catch {
    console.log("couldnt make search")
}

