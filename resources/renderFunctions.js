function createVideo(title, user, coverImg, userPfp) {
  const card = document.createElement('div');
  card.className = 'videoCard';

  const thumbnail = document.createElement('img');
  thumbnail.className = 'videoThumbnail';
  thumbnail.src = coverImg;
  thumbnail.alt = `${title} thumbnail`;

  const info = document.createElement('div');
  info.className = 'videoInfo';

  const userSection = document.createElement('div');
  userSection.className = 'videoUserSection';

  const avatar = document.createElement('img');
  avatar.className = 'videoUserPfp';
  avatar.src = userPfp;
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

  const actionBtn = document.createElement('button');
  actionBtn.className = 'videoActionBtn';
  actionBtn.innerHTML = '<i class="fas fa-ellipsis-vertical"></i>';

  info.appendChild(userSection);
  info.appendChild(actionBtn);

  card.appendChild(thumbnail);
  card.appendChild(info);

  return card;
}



function createTag(name) {
  const tag = document.createElement('div');
  tag.className = 'tagItem';

  const span = document.createElement('span');
  span.innerText = name;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'removeTagBtn';
  removeBtn.innerHTML = '<i class="fas fa-times"></i>';
  removeBtn.onclick = () => tag.remove();

  tag.appendChild(span);
  tag.appendChild(removeBtn);

  return tag;
}


