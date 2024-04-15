document.addEventListener('DOMContentLoaded', function() {
  const playButtonSelector = '.video-play-button';
  const videoWrapperSelector = '.video-wrapper, .mobile-video';
  const videoSelector = '.video-hero-background';

  // Function to play video
  function playVideo(videoElement) {
    if (videoElement.tagName === 'VIDEO') {
      videoElement.play().catch(error => console.error('Error attempting to play video:', error));
    } else if (videoElement.tagName === 'IFRAME') {
      const videoUrl = videoElement.getAttribute('src');
      videoElement.src = videoUrl + "&autoplay=1"; // Ensure autoplay is enabled
    }
  }

  // Event listener for play button clicks
  document.querySelectorAll(playButtonSelector).forEach(button => {
    button.addEventListener('click', function() {
      const videoWrapper = this.closest(videoWrapperSelector);
      const video = videoWrapper.querySelector(videoSelector);
      playVideo(video);

      // Hide cover image and play button
      const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
      if (coverImageContainer) coverImageContainer.style.display = 'none';
      this.style.display = 'none';
    });
  });

  // Autoplay videos if setting is enabled
  document.querySelectorAll(`${videoSelector}[autoplay]`).forEach(video => {
    playVideo(video);
  });

  // Adjust video display for mobile and desktop views
  function adjustVideoForDevice() {
    const mobileVideo = document.querySelector('.mobile-video');
    const desktopVideo = document.querySelector('.desktop-video');
    const isMobile = window.innerWidth < 768;

    if (mobileVideo) {
      mobileVideo.style.display = isMobile ? 'block' : 'none';
    }
    if (desktopVideo) {
      desktopVideo.style.display = isMobile ? 'none' : 'block';
    }
  }

  // Initial call and setup resize event listener
  adjustVideoForDevice();
  window.addEventListener('resize', adjustVideoForDevice);
});
