document.addEventListener('DOMContentLoaded', function() {
  function isMobileDevice() {
      return window.innerWidth < 768;
  }

  function initializeVideoHero() {
      document.querySelectorAll('.video-hero').forEach((videoHeroElement) => {
          const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';
          const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile video');
          const desktopVideo = videoHeroElement.querySelector('.video-hero-background:not(.mobile) video');

          function displayAppropriateVideo() {
              if (mobileVideo) mobileVideo.style.display = 'none';
              if (desktopVideo) desktopVideo.style.display = 'none';

              if (isMobileDevice()) {
                  if (enableMobileVideo && mobileVideo && mobileVideo.getAttribute('src')) {
                      mobileVideo.style.display = 'block';
                      mobileVideo.play().catch(e => console.error("Error playing mobile video: ", e));
                  } else if (desktopVideo && desktopVideo.getAttribute('src')) {
                      desktopVideo.style.display = 'block';
                      desktopVideo.play().catch(e => console.error("Error playing desktop video: ", e));
                  }
              } else {
                  if (desktopVideo && desktopVideo.getAttribute('src')) {
                      desktopVideo.style.display = 'block';
                      desktopVideo.play().catch(e => console.error("Error playing desktop video: ", e));
                  }
              }
          }

          displayAppropriateVideo();
          window.addEventListener('resize', displayAppropriateVideo);
      });
  }

  initializeVideoHero();
});
