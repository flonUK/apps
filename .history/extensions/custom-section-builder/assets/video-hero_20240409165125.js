document.addEventListener('DOMContentLoaded', function() {
  // Play video when cover image or play button is clicked
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('.video-hero-background');
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    const playButton = videoWrapper.querySelector('.video-play-button');

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
    }
  }

  // Add event listener to cover image container and play button
  document.querySelectorAll('.cover-image-container, .video-play-button').forEach(element => {
    element.addEventListener('click', function() {
      const videoWrapper = this.closest('.video-wrapper') || this.closest('.mobile-video');
      playVideo(videoWrapper);
    });
  });

  // Autoplay video if enabled
  document.querySelectorAll('.video-hero-background[autoplay]').forEach(video => {
    const videoWrapper = video.closest('.video-wrapper') || video.closest('.mobile-video');
    playVideo(videoWrapper);
  });

  // Display the appropriate video on mobile devices
  function handleMobileVideo() {
    const mobileVideo = document.querySelector('.mobile-video');
    const desktopVideo = document.querySelector('.desktop-video');

    if (window.innerWidth < 768) {
      if (mobileVideo) {
        mobileVideo.style.display = 'block';
        if (desktopVideo) {
          desktopVideo.style.display = 'none';
        }
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

  // Call the function on page load and window resize
  handleMobileVideo();
  window.addEventListener('resize', handleMobileVideo);

  // Show/hide video hero overlay elements based on mobile settings
  function handleMobileOverlay() {
    const heading = document.querySelector('.video-hero-text');
    const subtext = document.querySelector('.video-hero-subtext');
    const buttonContainer = document.querySelector('.video-hero-button-container');

    if (window.innerWidth < 768) {
      if (heading && heading.classList.contains('hide-on-mobile')) {
        heading.style.display = 'none';
      }
      if (subtext && subtext.classList.contains('hide-on-mobile')) {
        subtext.style.display = 'none';
      }
      if (buttonContainer && buttonContainer.classList.contains('hide-on-mobile')) {
        buttonContainer.style.display = 'none';
      }
    } else {
      if (heading) {
        heading.style.display = 'block';
      }
      if (subtext) {
        subtext.style.display = 'block';
      }
      if (buttonContainer) {
        buttonContainer.style.display = 'block';
      }
    }
  }

  // Call the function on page load and window resize
  handleMobileOverlay();
  window.addEventListener('resize', handleMobileOverlay);
});