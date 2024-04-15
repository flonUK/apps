document.addEventListener('DOMContentLoaded', function() {
  // Check if the device is considered mobile based on viewport width
  const isMobile = window.innerWidth <= 767;

  function adjustVideoDisplay() {
      // Find all video elements
      const videos = document.querySelectorAll('.video-hero-background');

      // Loop through videos to apply mobile-specific settings
      videos.forEach(video => {
          // If on mobile and the video is marked for mobile, show it; otherwise, hide it.
          if (isMobile && video.classList.contains('mobile-video')) {
              video.style.display = 'block';
          } else if (!isMobile && video.classList.contains('desktop-video')) {
              video.style.display = 'block';
          } else {
              video.style.display = 'none'; // Hide videos not relevant for the device
          }
      });
  }

  // Play video functionality remains similar to your previous script
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background:visible');
      if (!video) return; // Exit if no visible video is found

      function hideCoverImageAndPlayButton() {
          const poster = videoWrapper.querySelector('.video-hero-poster');
          const playButton = videoWrapper.querySelector('.video-play-button');
          if (poster) poster.style.display = 'none';
          if (playButton) playButton.style.display = 'none';
      }

      if (video.tagName === 'VIDEO') {
          video.play().then(hideCoverImageAndPlayButton).catch(error => console.error('Error attempting to play video:', error));
      } else if (video.tagName === 'IFRAME') {
          hideCoverImageAndPlayButton(); // Autoplay should be handled via URL for embedded videos
      }
  }

  // Adjust visibility for elements based on mobile display settings
  function adjustMobileDisplaySettings() {
      document.querySelectorAll('.show-on-mobile, .hide-on-mobile').forEach(elem => {
          const showOnMobile = elem.classList.contains('show-on-mobile');
          const hideOnMobile = elem.classList.contains('hide-on-mobile');

          if (isMobile && showOnMobile) {
              elem.style.display = ''; // Show on mobile
          } else if (isMobile && hideOnMobile) {
              elem.style.display = 'none'; // Hide on mobile
          } else {
              elem.style.display = ''; // Default to showing on desktop
          }
      });
  }

  // Initial adjustments on load
  adjustVideoDisplay();
  adjustMobileDisplaySettings();

  // Attach event listeners to play buttons
  document.querySelectorAll('.video-play-button').forEach(button => {
      button.addEventListener('click', function() {
          const videoWrapper = this.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // Handle autoplay videos
  document.querySelectorAll('.video-hero-background[autoplay]').forEach(video => {
      const videoWrapper = video.closest('.video-wrapper');
      if (video.style.display !== 'none') { // Only attempt to play if the video is set to be displayed
          playVideo(videoWrapper);
      }
  });
});
