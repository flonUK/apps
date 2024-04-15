document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
      return window.innerWidth < 768;
  }

  function setupVideoHero() {
      const videoHero = document.querySelector('.video-hero');
      const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
      const overlay = document.querySelector('.video-hero-overlay');
      const playButton = document.querySelector('.video-play-button');
      const mobileVideo = document.querySelector('.video-hero-background.mobile');
      const desktopVideo = document.querySelector('.video-hero-background:not(.mobile)');
      const coverImageContainer = document.querySelector('.cover-image-container');

      // Hide overlay initially if cover image is present.
      if (coverImageContainer) overlay.style.display = 'none';

      function playVideo(e) {
          e.preventDefault();
          // Show the overlay when video starts playing.
          overlay.style.display = 'flex';
          // Hide the cover image container.
          coverImageContainer.style.display = 'none';

          const iframe = document.querySelector('iframe.youtube-video');
          const video = isMobile() && enableMobileVideo ? mobileVideo : desktopVideo;

          // Play the video based on the source type.
          if (iframe) {
              const src = iframe.getAttribute('src').split('?')[0]; // Remove any existing query parameters.
              iframe.src = `${src}?autoplay=1`; // Force autoplay by resetting the src attribute.
          } else if (video) {
              video.play();
          }
      }

      function toggleVideoDisplay() {
          // Adjust display settings for mobile and desktop videos.
          if (isMobile()) {
              if (enableMobileVideo && mobileVideo) {
                  mobileVideo.style.display = 'block';
                  desktopVideo.style.display = 'none';
              } else {
                  mobileVideo.style.display = 'none';
                  desktopVideo.style.display = 'block';
              }
          } else {
              mobileVideo.style.display = 'none';
              desktopVideo.style.display = 'block';
          }
      }

      // Event listener for the play button.
      playButton.addEventListener('click', playVideo);

      // Hide or display videos based on viewport and settings.
      toggleVideoDisplay();
      window.addEventListener('resize', toggleVideoDisplay);
  }

  setupVideoHero();
});
