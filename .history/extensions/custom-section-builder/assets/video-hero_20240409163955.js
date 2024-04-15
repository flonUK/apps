document.addEventListener('DOMContentLoaded', function() {
  // Determines if the current device is mobile based on the viewport width.
  function isMobileDevice() {
      return window.innerWidth < 768;
  }

  // Handles the logic to play the video or external video link.
  function playVideo(videoType, videoSource = '') {
      const videoHeroElement = document.querySelector('.video-hero');
      const overlay = videoHeroElement.querySelector('.video-hero-overlay');
      const coverImageContainer = videoHeroElement.querySelector('.cover-image-container');
      const iframeVideo = videoHeroElement.querySelector('.video-hero-background.iframe-video');
      const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
      const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile, .iframe-video)');

      // Hide the cover image and show the overlay
      if (coverImageContainer) coverImageContainer.style.display = 'none';
      overlay.style.display = 'flex';

      if (videoType === 'mobile') {
          mobileVideo && mobileVideo.play();
      } else if (videoType === 'desktop') {
          desktopVideo && desktopVideo.play();
      } else if (videoType === 'external' && iframeVideo) {
          iframeVideo.style.display = 'block';
          iframeVideo.src = videoSource.includes('youtube') ? `https://www.youtube.com/embed/${videoSource.split('v=')[1]}?autoplay=1` : `https://player.vimeo.com/video/${videoSource.split('.com/')[1]}?autoplay=1`;
      }
  }

  function initializeVideoHero() {
      const videoHeroElement = document.querySelector('.video-hero');
      const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';
      const videoSource = videoHeroElement.getAttribute('data-video-source');
      const externalVideoUrl = videoHeroElement.getAttribute('data-video-url');
      const playButton = videoHeroElement.querySelector('.video-play-button');

      // Toggles the display of the mobile video or desktop video based on settings and device type.
      function displayAppropriateVideo() {
          const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
          const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile, .iframe-video)');
          const iframeVideo = videoHeroElement.querySelector('.video-hero-background.iframe-video');

          if (isMobileDevice()) {
              if (enableMobileVideo && mobileVideo) {
                  mobileVideo.style.display = 'block';
                  desktopVideo && (desktopVideo.style.display = 'none');
                  iframeVideo && (iframeVideo.style.display = 'none');
              } else {
                  mobileVideo && (mobileVideo.style.display = 'none');
                  if (videoSource === 'url') {
                      iframeVideo && (iframeVideo.style.display = 'block');
                      desktopVideo && (desktopVideo.style.display = 'none');
                  } else {
                      desktopVideo && (desktopVideo.style.display = 'block');
                      iframeVideo && (iframeVideo.style.display = 'none');
                  }
              }
          } else {
              mobileVideo && (mobileVideo.style.display = 'none');
              if (videoSource === 'url') {
                  iframeVideo && (iframeVideo.style.display = 'block');
                  desktopVideo && (desktopVideo.style.display = 'none');
              } else {
                  desktopVideo && (desktopVideo.style.display = 'block');
                  iframeVideo && (iframeVideo.style.display = 'none');
              }
          }
      }

      // Event listener for play button
      if (playButton) {
          playButton.addEventListener('click', function() {
              playVideo(isMobileDevice() && enableMobileVideo ? 'mobile' : (videoSource === 'url' ? 'external' : 'desktop'), externalVideoUrl);
          });
      }

      displayAppropriateVideo();
      window.addEventListener('resize', displayAppropriateVideo);
  }

  initializeVideoHero();
});
