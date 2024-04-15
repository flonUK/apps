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
  const video = videoWrapper.querySelector('video');
  const poster = videoWrapper.querySelector('.adedayo-video-hero-poster');
  const playButton = videoWrapper.querySelector('.adedayo-video-hero-play-button');
  if (video) {
    // Mute the video to satisfy the autoplay policies of most browsers
    video.muted = true;
    // Attempt to play the video
    video.play().then(function() {
      // Hide the poster and play button on successful play
      if (poster) {
        poster.style.opacity = '0';
        setTimeout(function() {
          poster.style.display = 'none';
        }, 500);
      }
      if (playButton) {
        playButton.style.display = 'none';
      }
    }).catch(function(error) {
      // Log an error if play was not possible, for example, due to user interaction policies
      console.error('Error attempting to play video:', error);
    });
  }