document.addEventListener('DOMContentLoaded', function() {
  // Utility function to play a video within a given wrapper
  function playVideo(videoWrapper) {
  const video = videoWrapper.querySelector('.video-hero-background');
  if (!video) return; // Exit if no video is found
  // Hide cover image and play button upon playing the video
function hideCoverImageAndPlayButton() {
  const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
  const playButton = videoWrapper.querySelector('.video-play-button');

  if (coverImageContainer) coverImageContainer.style.display = 'none';
  if (playButton) playButton.style.display = 'none';
}

// Play video if it's a <video> tag
if (video.tagName === 'VIDEO') {
  video.play().then(hideCoverImageAndPlayButton).catch(error => console.error('Error attempting to play video:', error));
} else if (video.tagName === 'IFRAME') {
  // For <iframe>, just hide controls as autoplay should be handled via URL for embedded videos
  hideCoverImageAndPlayButton();
}
// Hide cover image and play button upon playing the video
function hideCoverImageAndPlayButton() {
  const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
  const playButton = videoWrapper.querySelector('.video-play-button');

  if (coverImageContainer) coverImageContainer.style.display = 'none';
  if (playButton) playButton.style.display = 'none';
}

// Play video if it's a <video> tag
if (video.tagName === 'VIDEO') {
  video.play().then(hideCoverImageAndPlayButton).catch(error => console.error('Error attempting to play video:', error));
} else if (video.tagName === 'IFRAME') {
  // For <iframe>, just hide controls as autoplay should be handled via URL for embedded videos
  hideCoverImageAndPlayButton();
}
}

// Attach event listeners to play buttons
document.querySelectorAll('.video-play-button').forEach(button => {
button.addEventListener('click', function() {
const videoWrapper = this.closest('.video-wrapper');
playVideo(videoWrapper);
});
});

// Autoplay logic for videos marked with the autoplay class
document.querySelectorAll('.video-hero-background.autoplay').forEach(video => {
const videoWrapper = video.closest('.video-wrapper');
playVideo(videoWrapper);
});

// Mobile video handling
function handleMobileVideo() {
const mobileVideo = document.querySelector('.mobile-video');
const desktopVideo = document.querySelector('.desktop-video');
const mobileOnlyCoverImage = document.querySelector('.cover-image-container.mobile-only');
const desktopOnlyCoverImage = document.querySelector('.cover-image-container.desktop-only');
if (window.innerWidth < 768) {
  if (mobileVideo) {
    mobileVideo.style.display = 'block';
    if (desktopVideo) desktopVideo.style.display = 'none';
    if (mobileOnlyCoverImage) mobileOnlyCoverImage.style.display = 'flex';
    if (desktopOnlyCoverImage) desktopOnlyCoverImage.style.display = 'none';
  } else {
    if (desktopVideo) desktopVideo.style.display = 'block';
    if (desktopOnlyCoverImage) desktopOnlyCoverImage.style.display = 'flex';
  }
} else {
  if (mobileVideo) mobileVideo.style.display = 'none';
  if (desktopVideo) desktopVideo.style.display = 'block';
  if (mobileOnlyCoverImage) mobileOnlyCoverImage.style.display = 'none';
  if (desktopOnlyCoverImage) desktopOnlyCoverImage.style.display = 'flex';
}
}

// Initial mobile video handling
handleMobileVideo();

// Handle mobile video on window resize
window.addEventListener('resize', handleMobileVideo);

// Button hover handling
const buttons = document.querySelectorAll('.video-hero-button');
buttons.forEach(button => {
const buttonColor = button.style.backgroundColor;
const buttonTextColor = button.style.color;
