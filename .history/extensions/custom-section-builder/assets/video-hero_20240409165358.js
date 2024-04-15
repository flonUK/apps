document.addEventListener('DOMContentLoaded', function() {
  // Function to determine if the current device is mobile based on the viewport width.
  function isMobileDevice() {
      return window.innerWidth < 768;
  }

  // Main function to set up the video hero section.
  function initializeVideoHero() {
      // Selecting elements from the DOM.
      const videoHeroElement = document.querySelector('.video-hero');
      // Reading the "enable mobile video" setting attribute value.
      const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';
      // Selecting mobile and desktop video elements.
      const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
      const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile)');

      // Function to toggle the display and playback of videos based on device type and settings.
      function displayAppropriateVideo() {
          // Initially hide both video elements to avoid showing the incorrect video.
          if (mobileVideo) mobileVideo.style.display = 'none';
          if (desktopVideo) desktopVideo.style.display = 'none';

          // Check if the device is mobile and the mobile video setting is enabled.
          if (isMobileDevice()) {
              if (enableMobileVideo && mobileVideo) {
                  // Show and play the mobile video if available.
                  mobileVideo.style.display = 'block';
                  mobileVideo.play();
              } else if (desktopVideo) {
                  // Fallback to the desktop video if the mobile video isn't set or available.
                  desktopVideo.style.display = 'block';
                  desktopVideo.play();
              }
          } else if (desktopVideo) {
              // For non-mobile devices, display and play the desktop video.
              desktopVideo.style.display = 'block';
              desktopVideo.play();
          }
      }

      // Set up the initial display of the appropriate video.
      displayAppropriateVideo();

      // Add an event listener to adjust the video display dynamically on window resize.
      window.addEventListener('resize', displayAppropriateVideo);
  }

  // Initialize the video hero section setup.
  initializeVideoHero();
});
