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