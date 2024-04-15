document.addEventListener('DOMContentLoaded', function() {
  // This function checks if the viewport width corresponds to a mobile device.
  function isMobileDevice() {
      return window.innerWidth < 768;
  }

  // Initializes the video hero functionality.
  function initializeVideoHero() {
      // Select all video hero elements on the page.
      const videoHeroElements = document.querySelectorAll('.video-hero');

      // Iterate through each video hero element to set up its functionality.
      videoHeroElements.forEach((videoHeroElement) => {
          // Retrieve the setting for enabling mobile video from the data attribute.
          const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';

          // Select the mobile video and desktop video elements within the current video hero element.
          const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
          const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile)');

          // Defines the logic to display the appropriate video based on the device type and settings.
          function displayAppropriateVideo() {
              // Initially hide both video elements to prevent showing an unintended video.
              if (mobileVideo) mobileVideo.style.display = 'none';
              if (desktopVideo) desktopVideo.style.display = 'none';

              // Determine which video to display and play based on the device and settings.
              if (isMobileDevice()) {
                  if (enableMobileVideo && mobileVideo) {
                      // If on a mobile device and mobile video is enabled, display and play the mobile video.
                      mobileVideo.style.display = 'block';
                      mobileVideo.play();
                  } else if (desktopVideo) {
                      // Fallback to displaying and playing the desktop video if mobile video is not enabled or available.
                      desktopVideo.style.display = 'block';
                      desktopVideo.play();
                  }
              } else if (desktopVideo) {
                  // For non-mobile devices, always display and play the desktop video.
                  desktopVideo.style.display = 'block';
                  desktopVideo.play();
              }
          }

          // Execute the function to display the appropriate video upon initial load.
          displayAppropriateVideo();

          // Add an event listener to adjust the displayed video upon resizing the window.
          window.addEventListener('resize', displayAppropriateVideo);
      });
  }

  // Call the function to initialize the video hero functionality.
  initializeVideoHero();
});
