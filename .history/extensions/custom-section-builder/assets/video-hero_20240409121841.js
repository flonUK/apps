document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
      return window.innerWidth < 768;
  }

  function setupVideoHero() {
      const videoHero = document.querySelector('.video-hero');
      const enableMobileVideo = videoHero.dataset.enableMobileVideo === 'true';
      const overlay = document.querySelector('.video-hero-overlay');
      const coverImageContainer = document.querySelector('.cover-image-container');
      const playButton = document.querySelector('.video-play-button');
      const iframeElement = document.querySelector('iframe.youtube-video');
      const mobileVideoElement = document.querySelector('.video-hero-background.mobile');
      const desktopVideoElement = document.querySelector('.video-hero-background:not(.mobile)');
      
      // Initially, if a cover image is being used, we don't show the overlay.
      if (coverImageContainer) overlay.style.display = 'none';

      function toggleVideoVisibility() {
          const displayMobileVideo = isMobile() && enableMobileVideo && mobileVideoElement;
          if (mobileVideoElement) mobileVideoElement.style.display = displayMobileVideo ? 'block' : 'none';
          if (desktopVideoElement) desktopVideoElement.style.display = displayMobileVideo ? 'none' : 'block';
      }

      function playVideo() {
          // When playing the video, we want to ensure the overlay becomes visible
          overlay.style.display = 'flex';

          // Hide the cover image and play button as the video plays.
          if (coverImageContainer) coverImageContainer.style.display = 'none';
          
          if (isMobile() && enableMobileVideo && mobileVideoElement) {
              mobileVideoElement.play();
          } else if (iframeElement) {
              // For external videos, we change the src to ensure autoplay triggers.
              let src = iframeElement.src.split('?')[0]; // Clean the URL of parameters.
              // We ensure mute is enabled to adhere to autoplay policies of most browsers.
              iframeElement.src = `${src}?autoplay=1&mute=1`;
          } else if (desktopVideoElement) {
              desktopVideoElement.play();
          }
      }

      // Listen for clicks on the play button to start the video.
      if (playButton) {
          playButton.addEventListener('click', playVideo);
      }

      toggleVideoVisibility();
      window.addEventListener('resize', toggleVideoVisibility);
  }

  setupVideoHero();
});
