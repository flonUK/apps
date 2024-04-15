document.addEventListener('DOMContentLoaded', function() {
  // Play video when cover image or play button is clicked
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('.video-hero-background');
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    const playButton = videoWrapper.querySelector('.video-play-button');
    const videoHeroOverlay = videoWrapper.closest('.video-hero').querySelector('.video-hero-overlay');

    if (video && (coverImageContainer || playButton)) {
      if (video.tagName === 'VIDEO') {
        video.play().catch(error => {
          console.error('Error attempting to play video:', error);
        });
      } else if (video.tagName === 'IFRAME') {
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }

      if (coverImageContainer) {
        coverImageContainer.style.display = 'none';
      }
      if (playButton) {
        playButton.style.display = 'none';
      }
      if (videoHeroOverlay) {
        videoHeroOverlay.classList.remove('hidden');
      }
    }
  }

  // Add event listener to cover image container and play button
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
    element.addEventListener('click', function() {
      const videoWrapper = this.closest('.video-wrapper');
      playVideo(videoWrapper);
    });
  });

  // Autoplay video if enabled
  document.querySelectorAll('.video-hero-background[autoplay]').forEach(video => {
    const videoWrapper = video.closest('.video-wrapper');
    playVideo(videoWrapper);
  });

  // Handle mobile video display
  function handleMobileVideo() {
    const mobileVideo = document.querySelector('.mobile-video');
    const desktopVideo = document.querySelector('.video-hero-background:not(.mobile-video)');

    if (window.innerWidth < 768) {
      if (mobileVideo) {
        mobileVideo.style.display = 'block';
      }
      if (desktopVideo) {
        desktopVideo.style.display = 'none';
      }
    } else {
      if (mobileVideo) {
        mobileVideo.style.display = 'none';
      }
      if (desktopVideo) {
        desktopVideo.style.display = 'block';
      }
    }
  }

  // Call handleMobileVideo on page load and window resize
  handleMobileVideo();
  window.addEventListener('resize', handleMobileVideo);

  // Handle mobile overlay display
  function handleMobileOverlay() {
    const videoHeroOverlay = document.querySelector('.video-hero-overlay');

    if (window.innerWidth < 768) {
      if (videoHeroOverlay && !videoHeroOverlay.classList.contains('hidden')) {
        videoHeroOverlay.style.display = 'block';
      }
    } else {
      if (videoHeroOverlay && videoHeroOverlay.classList.contains('hidden')) {
        videoHeroOverlay.style.display = 'none';
      }
    }
  }

  // Call handleMobileOverlay on page load and window resize
  handleMobileOverlay();
  window.addEventListener('resize', handleMobileOverlay);
});