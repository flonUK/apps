document.addEventListener('DOMContentLoaded', function() {
  // Utility function to play a video within a given wrapper
  function playVideo(videoWrapper) {
  const video = videoWrapper.querySelector('.video-hero-background');
  if (!video) return; // Exit if no video is found