document.addEventListener('DOMContentLoaded', function() {
  // Check if the device is mobile based on viewport width.
  function isMobile() {
      return window.innerWidth < 768;
  }

  function setupVideoHero() {
      const videoHero = document.querySelector('.video-hero');
      const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
      const overlay = document.querySelector('.video-hero-overlay');
      const coverImageContainer = document.querySelector('.cover-image-container');
      const playButton = document.querySelector('.video-play-button');

      // Determine the correct video elements for desktop and mobile.
      const desktopVideoElement = document.querySelector('.video-hero-background:not(.mobile)');
      const mobileVideoElement = document.querySelector('.video-hero-background.mobile');
      const iframeElement = document.querySelector('iframe.youtube-video');

      // Function to manage the display of videos based on device type and settings.
      function toggleVideoDisplay() {
          if (isMobile() && enableMobileVideo && mobileVideoElement) {
              mobileVideoElement.style.display = 'block';
              desktopVideoElement.style.display = 'none';
          } else {
              mobileVideoElement.style.display = 'none';
              desktopVideoElement.style.display = 'block';
          }
      }

      // Function to initiate video play.
      function playVideo() {
          // Hide the cover image and display the overlay (text and button).
          if (coverImageContainer) coverImageContainer.style.display = 'none';
          overlay.style.display = 'flex';

          if (isMobile() && enableMobileVideo && mobileVideoElement) {
              // Play the mobile video if enabled and available.
              mobileVideoElement.play();
          } else if (desktopVideoElement && desktopVideoElement.tagName === 'VIDEO') {
              // Play the desktop video element if it's a video tag.
              desktopVideoElement.play();
          } else if (iframeElement) {
              // For external videos, change the src to trigger autoplay.
              const src = iframeElement.src.split('?')[0]; // Remove existing query params.
              iframeElement.src = `${src}?autoplay=1`; // Add autoplay param.
          }
      }

      // Add click event listener to the play button.
      if (playButton) {
          playButton.addEventListener('click', playVideo);
      }

      // Initially set the correct video display and adjust on window resize.
      toggleVideoDisplay();
      window.addEventListener('resize', toggleVideoDisplay);
  }

  setupVideoHero();
});
