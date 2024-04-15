document.addEventListener('DOMContentLoaded', function() {
  // Checks if the device is considered mobile based on its width.
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Handles the logic for displaying the correct video version and managing cover image interactions.
  function handleVideoDisplayLogic() {
    const videoHero = document.querySelector('.video-hero');
    const enableMobileVideo = videoHero.getAttribute('data-enable-mobile-video') === 'true';
    const mobileVideo = document.querySelector('.video-hero-background.mobile');
    const desktopVideo = document.querySelector('.video-hero-background:not(.mobile)');
    // Adjusts visibility for desktop and mobile videos based on the settings.
    if (isMobile()) {
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

  // Applies or resets mobile-specific display settings.
  function toggleMobileDisplaySettings(applySettings) {
    // Example settings adjustments; adapt as necessary for your specific elements and settings.
    const textElements = document.querySelectorAll('.video-hero-text, .video-hero-subtext');
    const button = document.querySelector('.video-hero-button');
    if (applySettings) {
      // Apply mobile-specific settings.
      textElements.forEach(el => el.style.display = 'none'); // Example to hide on mobile.
      button.style.display = 'none'; // Example to hide the button on mobile.
    } else {
      // Reset to default settings for desktop.
      textElements.forEach(el => el.style.removeProperty('display'));
      button.style.removeProperty('display');
    }
  }

  // Handles video playback, specifically ensuring external videos play when expected.
  function playVideo(element) {
    const videoWrapper = element.closest('.video-wrapper');
    const iframe = videoWrapper.querySelector('iframe.youtube-video');

    // Handling for external videos (e.g., YouTube, Vimeo) embedded via iframe.
    if (iframe) {
      const src = iframe.getAttribute('src');
      if (!src.includes('autoplay=1')) {
        // Adding autoplay parameter to the iframe URL.
        iframe.setAttribute('src', `${src}&autoplay=1`);
      }
    }

    // Hide the cover image and play button after initiating play.
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    if (coverImageContainer) coverImageContainer.style.display = 'none';
  }

  // Event listener for the play button and cover image to initiate video play.
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
    element.addEventListener('click', function() {
      playVideo(this);
    });
  });

  // Execute video display logic on load and when window is resized.
  handleVideoDisplayLogic();
  window.addEventListener('resize', handleVideoDisplayLogic);

  // Listen for window resize to apply or reset mobile display settings as needed.
  window.addEventListener('resize', function() {
    toggleMobileDisplaySettings(isMobile());
  });

  // Initial call to set the correct display settings based on the current viewport.
  toggleMobileDisplaySettings(isMobile());
});
