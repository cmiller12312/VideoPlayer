const url = "http://127.0.0.1:8000/"

function createVideo(title, user, coverImg, userPfp, videoLength) {
  const content = document.getElementById("contentMenu");
  const card = document.createElement('div');
  card.className = 'videoCard';
  const thumbnail = document.createElement('img');
  thumbnail.className = 'videoThumbnail';
  thumbnail.src = `data:image/png;base64,${coverImg}`; 

  const time = document.createElement("div")
  time.className = 'VideoTime'
  time.textContent = formatDuration(videoLength)

  const more = document.createElement("div")



  const info = document.createElement('div');
  info.className = 'videoInfo';

  const userSection = document.createElement('div');
  userSection.className = 'videoUserSection';

  const avatar = document.createElement('img');
  avatar.className = 'videoUserPfp';
  avatar.src = `data:image/png;base64,${userPfp}`;
  avatar.alt = `${user}'s profile picture`;

  const textInfo = document.createElement('div');
  textInfo.className = 'videoText';

  const videoTitle = document.createElement('div');
  videoTitle.className = 'videoTitle';
  videoTitle.innerText = title;

  const videoUser = document.createElement('div');
  videoUser.className = 'videoUser';
  videoUser.innerText = user;

  textInfo.appendChild(videoTitle);
  textInfo.appendChild(videoUser);

  userSection.appendChild(avatar);
  userSection.appendChild(textInfo);

  info.appendChild(userSection);

  card.appendChild(thumbnail);
  card.appendChild(info);
  card.appendChild(time);

  content.append(card)
}



function createTag(name) {
  const tags = document.getElementById("tags");
  const tag = document.createElement('div');
  tag.className = 'tagItem';

  const span = document.createElement('span');
  span.innerText = name;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'removeTagBtn';
  removeBtn.id = 'removeTagBtn';
  removeBtn.innerHTML = '<i class="fas fa-times"></i>';
  removeBtn.onclick = () => window.api.deleteTag(span.innerText)

  tag.appendChild(span);
  tag.appendChild(removeBtn);

  tags.appendChild(tag)
}

async function getVideoBatch() {
  console.log("entered");
  window.api.getVideoBatch().then(data => {
    console.log(data);
    for (const video of data) {
      retrieveVideo(video.username, video.title, null);
    }
  });
}
  
async function retrieveVideo(username, title, filters) {
  try {
    const response = await fetch(url + "getVideo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, title, filters})
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    createVideo(data["title"], data["username"], data["thumbnail"], data["userPfp"], data["videoLength"])
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function formatDuration(seconds) {
  console.log("formatting time")
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');

  if (hrs > 0) {
    return `${hrs}:${paddedMins}:${paddedSecs}`;
  } else {
    return `${paddedMins}:${paddedSecs}`;
  }
}

function createUserPopup(username, followerCount, pfp){
  const container = document.createElement("div")
  container.className = "userPopup"

  const userPfp = document.createElement("img")
  userPfp.style.backgroundImage = avatar.src = `data:image/png;base64,${pfp}`;
  userPfp.className = "userPopupPfp"

  const textContainer = document.createElement("div")
  textContainer.className = textContainer

  const user = document.createElement("div")
  user.textContent = username

  return container
}

function createVideoPopup(title, user, coverImg, userPfp, videoLength){

}
