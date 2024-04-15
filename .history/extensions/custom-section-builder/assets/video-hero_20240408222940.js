document.addEventListener('DOMContentLoaded', function() {
  // Function to play video on clicking the cover image or play button
  window.playVideoOnClick = function() {
      // Find all video containers in the document
      document.querySelectorAll('.video-wrapper').forEach(wrapper => {
          const video = wrapper.querySelector('video');
          if (!video) return; // Skip if no video found

          const cover = wrapper.querySelector('.cover-image-container');
          const playButton = wrapper.querySelector('.video-play-button');

          // Play the video
          if (video.tagName === 'VIDEO') {
              video.play()
                  .then(() => {
                      // Hide cover image and play button upon successful play
                      if (cover) cover.style.display = 'none';
                      if (playButton) playButton.style.display = 'none';
                  })
                  .catch(error => console.error('Error attempting to play video:', error));
          }
      });
  };

  // Function to handle video autoplay functionality
  const autoplayVideos = function() {
      document.querySelectorAll('.video-hero-background[autoplay], .mobile-video[autoplay]').forEach(video => {
          // Attempt to play the video
          video.play().catch(error => console.error('Error attempting to autoplay video:', error));
      });
  };

  // Autoplay videos intended to autoplay on load
  autoplayVideos();

  // Adjustments for mobile videos if enabled
  const adjustForMobileVideos = function() {
      if (window.innerWidth <= 767) {
          // For mobile devices, hide the desktop video and show the mobile video if enabled
          document.querySelectorAll('.show-on-mobile').forEach(mobileVideo => {
              mobileVideo.style.display = 'block';
          });
          document.querySelectorAll('.show-on-desktop').forEach(desktopVideo => {
              desktopVideo.style.display = 'none';
          });
      } else {
          // Ensure desktop settings are respected on larger devices
          document.querySelectorAll('.show-on-desktop').forEach(desktopVideo => {
              desktopVideo.style.display = 'block';
          });
          document.querySelectorAll('.show-on-mobile').forEach(mobileVideo => {
              mobileVideo.style.display = 'none';
          });
      }
  };

  // Listen for resize events to adjust video visibility on mobile devices
  window.addEventListener('resize', adjustForMobileVideos);
  // Initial adjustment call in case of direct access to a URL with a hash
  adjustForMobileVideos();
});
