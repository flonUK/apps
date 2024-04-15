document.addEventListener('DOMContentLoaded', function() {
  // Simplify and refine the video play functionality
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background');
      if (!video) return; // Exit if no video is found

      // Function to hide cover image and play button
      function hideCoverImageAndPlayButton() {
          const poster = videoWrapper.querySelector('.video-hero-poster');
          const playButton = videoWrapper.querySelector('.video-play-button');
          if (poster) poster.style.display = 'none';
          if (playButton) playButton.style.display = 'none';
      }

      // Play video if it's a <video> tag or ensure playback controls for <iframe>
      if (video.tagName === 'VIDEO') {
          video.play()
              .then(hideCoverImageAndPlayButton)
              .catch(error => console.error('Error attempting to play video:', error));
      } else if (video.tagName === 'IFRAME') {
          hideCoverImageAndPlayButton(); // Assume autoplay via URL for iframe; simply hide controls
      }
  }

  // Add event listener to play buttons
  document.querySelectorAll('.video-play-button').forEach(button => {
      button.addEventListener('click', function() {
          const videoWrapper = button.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // For videos intended to autoplay on load
  document.querySelectorAll('.video-hero-background[autoplay]').forEach(video => {
      const videoWrapper = video.closest('.video-wrapper');
      playVideo(videoWrapper);
  });
});