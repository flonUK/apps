document.addEventListener('DOMContentLoaded', function() {
  // Determine if the device is mobile based on screen width
  const isMobile = window.innerWidth <= 767; // Example breakpoint for mobile

  // Simplify and refine the video play functionality
  function playVideo(videoWrapper) {
      const video = isMobile
          ? videoWrapper.querySelector('.video-hero-background.mobile-video')
          : videoWrapper.querySelector('.video-hero-background:not(.mobile-video)');

      if (!video) return; // Exit if no video is found

      function hideCoverImageAndPlayButton() {
          const poster = videoWrapper.querySelector('.video-hero-poster');
          const playButton = videoWrapper.querySelector('.video-play-button');
          if (poster) poster.style.display = 'none';
          if (playButton) playButton.style.display = 'none';
      }

      if (video.tagName === 'VIDEO') {
          video.play()
              .then(hideCoverImageAndPlayButton)
              .catch(error => console.error('Error attempting to play video:', error));
      } else if (video.tagName === 'IFRAME') {
          hideCoverImageAndPlayButton(); // Assume autoplay via URL for iframe; simply hide controls
      }
  }

  document.querySelectorAll('.video-play-button').forEach(button => {
      button.addEventListener('click', function() {
          const videoWrapper = button.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  document.querySelectorAll('.video-hero-background[autoplay]').forEach(video => {
      const videoWrapper = video.closest('.video-wrapper');
      playVideo(videoWrapper);
  });

  // Adjust the video source based on the device type
  function adjustVideoForDevice() {
      document.querySelectorAll('.video-wrapper').forEach(wrapper => {
          const mobileVideo = wrapper.querySelector('.mobile-video');
          const desktopVideo = wrapper.querySelector('.desktop-video');
          if (isMobile && mobileVideo) {
              desktopVideo?.remove();
          } else {
              mobileVideo?.remove();
          }
      });
  }

  // Call adjustVideoForDevice on load to ensure the correct video is shown based on device
  adjustVideoForDevice();
});
