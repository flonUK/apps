document.addEventListener('DOMContentLoaded', function() {
  // Function to check if the current device is mobile based on window width.
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Main function to handle video display logic, including mobile video and cover image interactions.
  function handleVideoDisplayLogic() {
    const videoHero = document.querySelector('.video-hero');
    const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
    const mobileVideo = document.querySelector('.video-hero-background.mobile');
    const desktopVideo = document.querySelector('.video-hero-background:not(.mobile)');
    const coverImageContainer = document.querySelector('.cover-image-container');
    const playButton = document.querySelector('.video-play-button');

    if (isMobile()) {
      if (enableMobileVideo && mobileVideo) {
        mobileVideo.style.display = 'block';
        if (desktopVideo) desktopVideo.style.display = 'none';
      } else {
        if (mobileVideo) mobileVideo.style.display = 'none';
        if (desktopVideo) desktopVideo.style.display = 'block';
      }
      applyMobileDisplaySettings();
    } else {
      if (mobileVideo) mobileVideo.style.display = 'none';
      if (desktopVideo) desktopVideo.style.display = 'block';
      resetMobileDisplaySettings();
    }
  }

  // Applies mobile-specific display settings, based on your theme's settings or design.
  function applyMobileDisplaySettings() {
    // Placeholder for custom logic to adjust mobile display based on settings.
  }

  // Resets display settings to their defaults for desktop views.
  function resetMobileDisplaySettings() {
    // Placeholder for resetting mobile-specific adjustments.
  }

  // Handles video play actions for both internal and external videos.
  function playVideo(element) {
    const videoWrapper = element.closest('.video-wrapper');
    const video = videoWrapper.querySelector('.video-hero-background');
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video.tagName === 'VIDEO') {
      video.play();
    } else if (video.tagName === 'IFRAME') {
      // For external videos, adjust the source to ensure autoplay works.
      const src = video.getAttribute('src');
      if (!src.includes('autoplay=1')) {
        video.setAttribute('src', `${src}&autoplay=1`);
      }
    }

    // Hide the cover image and play button after initiating play.
    if (coverImageContainer) coverImageContainer.style.display = 'none';
    if (playButton) playButton.style.display = 'none';
  }

  // Event listeners for the cover image and play button.
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
    element.addEventListener('click', function() {
      playVideo(this);
    });
  });

  // Initialize video logic and respond to window resizing.
  handleVideoDisplayLogic();
  window.addEventListener('resize', handleVideoDisplayLogic);
});
