document.addEventListener('DOMContentLoaded', function() {
  // Function to convert YouTube URL to an embed URL
  function convertToEmbedUrl(url) {
  const regExp = /^.(youtu.be/|v/|e/|u/\w+/|embed/|v=)([^#&?]).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
  // Enable JavaScript API for additional control if needed
  return https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]};
  } else {
  // Return the original URL if it doesn't match YouTube video pattern
  return url;
  }
  }
  
  // Update YouTube iframe src to use the embed URL
  document.querySelectorAll('.adedayo-video-hero-background').forEach(function(video) {
  if (video.tagName === 'IFRAME') {
  const videoSrc = video.getAttribute('src');
  const newSrc = convertToEmbedUrl(videoSrc);
  video.setAttribute('src', newSrc);
  }
  });
  
  // Handles video play and cover image visibility
  function playVideo(videoWrapper) {
  const video = videoWrapper.querySelector('video, iframe');
  const poster = videoWrapper.querySelector('.adedayo-video-hero-poster');
  const playButton = videoWrapper.querySelector('.adedayo-video-hero-play-button');
  const overlay = videoWrapper.querySelector('.adedayo-video-hero-overlay');