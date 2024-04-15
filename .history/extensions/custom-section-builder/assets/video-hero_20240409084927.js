document.addEventListener('DOMContentLoaded', function() {
  // Improved function to check if the device is mobile.
  // This could still use more sophisticated checks or a library like Modernizr for better accuracy.
  function isMobile() {
      return window.innerWidth < 768; // Adjust as necessary for your breakpoint
  }

  // Function to handle the display logic of videos based on settings and device type.
  function handleVideoDisplayLogic() {
      const videoWrappers = document.querySelectorAll('.video-wrapper');
      videoWrappers.forEach(wrapper => {
          // Logic for displaying or hiding the cover image and play button on mobile devices.
          const coverImageContainer = wrapper.querySelector('.cover-image-container');
          const playButton = wrapper.querySelector('.video-play-button');
          if (isMobile()) {
              // Conditions for when "Use Vertical Video on Mobile" is enabled.
              const enableMobileVideo = document.querySelector('.video-hero').getAttribute('data-enable-mobile-video') === 'true';
              if (enableMobileVideo) {
                  const mobileVideo = document.querySelector('.video-hero-background.mobile');
                  if (mobileVideo) {
                      mobileVideo.style.display = 'block';
                      // Hide the desktop video if there is a mobile video
                      const desktopVideo = wrapper.querySelector('.video-hero-background:not(.mobile)');
                      if (desktopVideo) {
                          desktopVideo.style.display = 'none';
                      }
                  }
              }
              // Apply mobile-specific display settings based on user selection.
              applyMobileDisplaySettings();
          } else {
              // Ensure that the desktop video is shown and the mobile video is hidden on non-mobile devices.
              const mobileVideo = wrapper.querySelector('.video-hero-background.mobile');
              if (mobileVideo) {
                  mobileVideo.style.display = 'none';
              }
              const desktopVideo = wrapper.querySelector('.video-hero-background:not(.mobile)');
              if (desktopVideo) {
                  desktopVideo.style.display = 'block';
              }
              // Reset any mobile-specific styling or settings.
              resetMobileDisplaySettings();
          }
      });
  }

  // Function to apply mobile display settings.
  function applyMobileDisplaySettings() {
      const overlay = document.querySelector('.video-hero-overlay');
      const buttonContainer = document.querySelector('.video-hero-button-container');
      // Custom logic to adjust display based on specific mobile settings.
      overlay.style.alignItems = 'center'; // Example adjustment
      buttonContainer.style.marginBottom = '20px'; // Ensure button is positioned correctly on mobile.
  }

  // Function to reset mobile display settings for desktop view.
  function resetMobileDisplaySettings() {
      const overlay = document.querySelector('.video-hero-overlay');
      const buttonContainer = document.querySelector('.video-hero-button-container');
      // Reset adjustments for desktop display.
      overlay.style.alignItems = 'flex-start'; // Reset to default alignment.
      buttonContainer.style.marginBottom = ''; // Remove mobile-specific styling.
  }

  // Central function to handle video playback.
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background');
      if (video.tagName === 'VIDEO') {
          video.play();
      } else if (video.tagName === 'IFRAME') {
          // Modify the iframe src to include autoplay parameter.
          const src = video.getAttribute('src');
          video.setAttribute('src', `${src}&autoplay=1`);
      }
      // After initiating play, hide the cover image and play button.
      const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
      const playButton = videoWrapper.querySelector('.video-play-button');
      if (coverImageContainer) {
          coverImageContainer.style.display = 'none';
      }
      if (playButton) {
          playButton.style.display = 'none';
      }
  }

  // Add event listeners to cover images and play buttons to handle video play.
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
      element.addEventListener('click', function() {
          const videoWrapper = this.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // Execute video display logic on initial load and window resize.
  handleVideoDisplayLogic();
  window.addEventListener('resize', handleVideoDisplayLogic);
});
