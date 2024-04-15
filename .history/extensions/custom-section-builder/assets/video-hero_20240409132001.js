document.addEventListener('DOMContentLoaded', function() {
  // Determines if the current device is mobile based on the viewport width.
  function isMobileDevice() {
      return window.innerWidth < 768;
  }

  // Sets up the video hero section, including event listeners for play buttons and logic for mobile video.
  function initializeVideoHero() {
      const videoHeroElement = document.querySelector('.video-hero');
      const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';
      const coverImageContainer = videoHeroElement.querySelector('.cover-image-container');
      const playButton = videoHeroElement.querySelector('.video-play-button');
      const overlay = videoHeroElement.querySelector('.video-hero-overlay');
      const iframeVideo = videoHeroElement.querySelector('iframe.youtube-video');
      const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
      const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile)');

      // Toggles between displaying the mobile video and the desktop video based on settings.
      function displayAppropriateVideo() {
          if (isMobileDevice()) {
              if (enableMobileVideo && mobileVideo) {
                  mobileVideo.style.display = 'block';
                  if (desktopVideo) desktopVideo.style.display = 'none';
              } else {
                  if (mobileVideo) mobileVideo.style.display = 'none';
                  if (desktopVideo) desktopVideo.style.display = 'block';
              }
          } else {
              if (mobileVideo) mobileVideo.style.display = 'none';
              if (desktopVideo) desktopVideo.style.display = 'block';
          }
      }

      // Handles the logic to play the video when the play button or cover image is clicked.
      function playVideo() {
          if (coverImageContainer) coverImageContainer.style.display = 'none'; // Hides the cover image.
          overlay.style.display = 'flex'; // Shows the overlay.

          if (isMobileDevice() && enableMobileVideo && mobileVideo) {
              mobileVideo.play();
          } else if (iframeVideo) {
              // For external videos, modifies the src to trigger autoplay.
              let src = iframeVideo.src;
              src = src.includes('?') ? `${src}&autoplay=1&mute=1` : `${src}?autoplay=1&mute=1`;
              iframeVideo.src = src;
          } else if (desktopVideo) {
              desktopVideo.play();
          }
      }

      // Setup event listeners.
      if (coverImageContainer) {
          coverImageContainer.addEventListener('click', playVideo);
      }
      if (playButton) {
          playButton.addEventListener('click', playVideo);
      }

      // Initial call to set up the correct video display and adjust on window resize.
      displayAppropriateVideo();
      window.addEventListener('resize', displayAppropriateVideo);
  }

  initializeVideoHero();
});
