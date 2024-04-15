document.addEventListener('DOMContentLoaded', function() {
  // Function to determine if the current device is mobile
  // This can be enhanced to include more sophisticated checks or use a library like Modernizr
  function isMobile() {
      return window.innerWidth < 768; // Example breakpoint, adjust as necessary
  }

  // Function to toggle video display based on device type
  function toggleVideoDisplay() {
      const videoWrappers = document.querySelectorAll('.video-wrapper');
      videoWrappers.forEach(wrapper => {
          const isExternalVideo = wrapper.classList.contains('external-video');
          // Hide cover image and play button for external videos on mobile if not in cover mode
          if (isMobile() && isExternalVideo) {
              const coverImageContainer = wrapper.querySelector('.cover-image-container');
              const playButton = wrapper.querySelector('.video-play-button');
              coverImageContainer.style.display = 'none';
              playButton.style.display = 'none';
          } else {
              // Reset display properties when conditions do not apply
              wrapper.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
                  element.style.display = '';
              });
          }
      });
  }

  // Function to play the video, handling both HTML video elements and iframe for external videos
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background');
      const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
      const playButton = videoWrapper.querySelector('.video-play-button');

      if (video.tagName === 'VIDEO') {
          video.play();
      } else if (video.tagName === 'IFRAME') {
          const src = video.getAttribute('src');
          video.setAttribute('src', src + '&autoplay=1'); // Force autoplay by modifying the src attribute
      }

      // Hide cover image and play button after play action
      if (coverImageContainer) {
          coverImageContainer.style.display = 'none';
      }
      if (playButton) {
          playButton.style.display = 'none';
      }
  }

  // Event listeners for play button and cover image
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
      element.addEventListener('click', function() {
          const videoWrapper = this.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // Function to adjust overlay and button display based on device
  function adjustOverlayDisplay() {
      const overlay = document.querySelector('.video-hero-overlay');
      const buttonContainer = document.querySelector('.video-hero-button-container');
      
      if (isMobile()) {
          // Adjustments for mobile display
          overlay.style.display = 'block'; // Ensure overlay is always visible on mobile
          buttonContainer.style.marginBottom = '20px'; // Add padding below the button on mobile
      } else {
          // Reset adjustments for desktop display
          overlay.style.display = '';
          buttonContainer.style.marginBottom = '';
      }
  }

  // Initial calls and event listeners
  toggleVideoDisplay();
  adjustOverlayDisplay();
  window.addEventListener('resize', function() {
      toggleVideoDisplay();
      adjustOverlayDisplay();
  });
});
