document.addEventListener('DOMContentLoaded', function() {
  // Checks if the device is considered mobile based on its width.
  function isMobile() {
      return window.innerWidth < 768;
  }

  // Function to manage the display logic of the video, cover image, and overlay elements.
  function setupVideoHero() {
      const videoHero = document.querySelector('.video-hero');
      const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
      const overlay = document.querySelector('.video-hero-overlay');
      const coverImageContainer = document.querySelector('.cover-image-container');

      // Initially, if there's a cover image, we hide the overlay (text and button).
      if (coverImageContainer) overlay.style.display = 'none';

      // Function to toggle between mobile and desktop video display based on settings.
      function toggleVideoDisplay() {
          const mobileVideo = document.querySelector('.video-hero-background.mobile');
          const desktopVideo = document.querySelector('.video-hero-background:not(.mobile)');

          // Handle display based on mobile settings and video preferences.
          if (isMobile()) {
              mobileVideo?.style.display = enableMobileVideo ? 'block' : 'none';
              desktopVideo.style.display = enableMobileVideo && mobileVideo ? 'none' : 'block';
              applyMobileDisplaySettings();
          } else {
              mobileVideo?.style.display = 'none';
              desktopVideo.style.display = 'block';
              resetMobileDisplaySettings();
          }
      }

      // Apply mobile display settings for the overlay.
      function applyMobileDisplaySettings() {
          // Example settings adjustments for mobile.
          // This might involve showing/hiding or adjusting overlay elements.
      }

      // Reset mobile display settings for desktop views.
      function resetMobileDisplaySettings() {
          // Reset any previously applied mobile-specific styles.
      }

      // Function to play the video when the cover image or play button is clicked.
      function playVideo() {
          const iframe = document.querySelector('.video-hero-background.youtube-video');

          // If an iframe exists, modify its source to include autoplay parameters.
          if (iframe) {
              const src = iframe.getAttribute('src');
              const newSrc = src.includes('?') ? `${src}&autoplay=1` : `${src}?autoplay=1`;
              iframe.setAttribute('src', newSrc);
          }

          // Show the overlay (text and button) once video starts playing.
          overlay.style.display = 'flex';
          // Hide the cover image and play button.
          coverImageContainer.style.display = 'none';
      }

      // Event listeners for the cover image and play button to start video playback.
      coverImageContainer?.addEventListener('click', playVideo);

      // Call to manage video display initially and on window resize.
      toggleVideoDisplay();
      window.addEventListener('resize', toggleVideoDisplay);
  }

  setupVideoHero();
});
