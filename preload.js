const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
  createVideo: (titleParam, authorParam) => createVideo(titleParam, authorParam),
  createTag: (tagName) => createTag(tagName),
})

function createVideo(titleParam, authorParam) {
  const container = document.createElement("div");
  container.className = "video";

  const videoIcon = document.createElement("img");
  videoIcon.className = "videoIcon";
  videoIcon.src = "resources/test.jpg";
  container.appendChild(videoIcon);

  const bottomSection = document.createElement("div");
  bottomSection.className = "videoBottomSection";
  container.appendChild(bottomSection);

  const userIcon = document.createElement("div");
  userIcon.className = "videoUserIcon";
  bottomSection.appendChild(userIcon);

  const textSection = document.createElement("div");
  bottomSection.appendChild(textSection);

  const title = document.createElement("p");
  title.textContent = titleParam;
  title.className = "title";
  textSection.appendChild(title);

  const author = document.createElement("p");
  author.textContent = authorParam;
  author.className = "author";
  textSection.appendChild(author);

  const extraBtn = document.createElement("button")
  extraBtn.className = "extraBtn"
  bottomSection.appendChild(extraBtn)

  const extraImg = document.createElement("img")
  extraImg.className = "extraImg"
  extraImg.src = "resources/MoreIcon.png"
  extraBtn.appendChild(extraImg)

  return container;
}

function createTag(tagName){
  const container = document.createElement("div");
  container.className = "tag";

  const text = document.createElement("p");
  text.className = "tagText";
  text.textContent = tagName
  container.appendChild(text);

  const closeBtn = document.createElement("button");
  closeBtn.className = "tagClose";
  container.appendChild(closeBtn);

  const closeImg = document.createElement("img");
  closeImg.src =  "resources/CloseIcon.png"
  closeImg.width = 15
  closeImg.height = 15

  closeBtn.appendChild(closeImg)

  return container

}
