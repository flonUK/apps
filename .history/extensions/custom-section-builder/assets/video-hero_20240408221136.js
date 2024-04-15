document.addEventListener('DOMContentLoaded', function() {
  const videoWrapper = document.querySelector('.video-wrapper');
  const video = videoWrapper.querySelector('.video-hero__video');
  const playButton = videoWrapper.querySelector('.video-hero__play-button');
  const coverImage = videoWrapper.querySelector('.video-hero__cover');
  
  function playVideo() {
  if (video.tagName === 'IFRAME') {
  video.src = video.src + '&autoplay=1';
  } else {
  video.play();
  }
  coverImage.style.display = 'none';
  }
  
  function loadMobileVideo() {
  const mobileVideoUrl = video.dataset.mobileVideo;
  if (mobileVideoUrl) {
  video.src = mobileVideoUrl;
  }
  }
  
  if (playButton) {
  playButton.addEventListener('click', playVideo);
  }
  
  if (window.innerWidth < 768) {
  loadMobileVideo();
  }
  });