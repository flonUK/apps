document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
    return window.innerWidth < 768;
  }

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

  function applyMobileDisplaySettings() {
    // Apply any specific mobile styling here.
    // Example: document.querySelector('.some-element').style.someCSSProperty = 'value';
  }

  function resetMobileDisplaySettings() {
    // Reset any specific mobile styling here to their defaults for desktop.
    // Example: document.querySelector('.some-element').style.someCSSProperty = '';
  }

  function playVideo(element) {
    const videoWrapper = element.closest('.video-wrapper');
    const video = videoWrapper.querySelector('.video-hero-background');
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video.tagName === 'VIDEO') {
      video.play();
    } else if (video.tagName === 'IFRAME') {
      const src = video.getAttribute('src');
      if (!src.includes('autoplay=1')) {
        video.setAttribute('src', `${src}&autoplay=1`);
      }
    }

    if (coverImageContainer) coverImageContainer.style.display = 'none';
    if (playButton) playButton.style.display = 'none';
  }

  // Event listener for play button and cover image to handle video playback
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
    element.addEventListener('click', function() {
      playVideo(this);
    });
  });

  handleVideoDisplayLogic();
  window.addEventListener('resize', handleVideoDisplayLogic);
});
