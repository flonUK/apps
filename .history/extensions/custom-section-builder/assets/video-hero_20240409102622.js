document.addEventListener('DOMContentLoaded', function() {
  // Improved check for mobile devices, considers device width.
  function isMobile() {
      return window.innerWidth < 768;
  }

  // Central function to manage video display and interaction logic.
  function setupVideoHero() {
      const videoHero = document.querySelector('.video-hero');
      const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
      const coverImageContainer = document.querySelector('.cover-image-container');
      const playButton = document.querySelector('.video-play-button');
      const overlay = document.querySelector('.video-hero-overlay');

      // Initially hide text and button if cover image is used.
      if (coverImageContainer) {
          overlay.style.display = 'none';
      }

      // Function to toggle video display between mobile and desktop.
      function toggleVideoDisplay() {
          const mobileVideo = document.querySelector('.video-hero-background.mobile');
          const desktopVideo = document.querySelector('.video-hero-background:not(.mobile)');
          if (isMobile()) {
              if (enableMobileVideo && mobileVideo) {
                  mobileVideo.style.display = 'block';
                  desktopVideo.style.display = 'none';
              } else {
                  if (mobileVideo) mobileVideo.style.display = 'none';
                  desktopVideo.style.display = 'block';
              }
              applyMobileDisplaySettings();
          } else {
              if (mobileVideo) mobileVideo.style.display = 'none';
              desktopVideo.style.display = 'block';
              resetMobileDisplaySettings();
          }
      }

      // Apply mobile-specific settings for text and button visibility.
      function applyMobileDisplaySettings() {
          const showHeadingOnMobile = videoHero.getAttribute('data-show-heading-on-mobile') === 'true';
          const showButtonOnMobile = videoHero.getAttribute('data-show-button-on-mobile') === 'true';

          if (!showHeadingOnMobile) {
              document.querySelector('.video-hero-text').style.display = 'none';
          }
          if (!showButtonOnMobile) {
              document.querySelector('.video-hero-button-container').style.display = 'none';
          }
      }

      // Reset settings for desktop view.
      function resetMobileDisplaySettings() {
          document.querySelector('.video-hero-text').style.removeProperty('display');
          document.querySelector('.video-hero-button-container').style.removeProperty('display');
      }

      // Function to handle video play action.
      function playVideo() {
          if (coverImageContainer) {
              coverImageContainer.style.display = 'none'; // Hide cover image on play.
              overlay.style.display = 'flex'; // Show text and button after play.
          }
      }

      // Event listeners for play action on cover image or button.
      if (coverImageContainer) {
          coverImageContainer.addEventListener('click', playVideo);
      }
      if (playButton) {
          playButton.addEventListener('click', playVideo);
      }

      // Call toggleVideoDisplay initially and on window resize.
      toggleVideoDisplay();
      window.addEventListener('resize', toggleVideoDisplay);
  }

  setupVideoHero();
});
