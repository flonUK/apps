document.addEventListener('DOMContentLoaded', function() {
  // Handles the visibility of cover image and play button
  function hideCoverImageAndPlayButton(videoWrapper) {
      const poster = videoWrapper.querySelector('.video-hero-poster');
      const playButton = videoWrapper.querySelector('.video-play-button');
      if (poster) {
          poster.style.display = 'none';
      }
      if (playButton) {
          playButton.style.display = 'none';
      }
  }

  // Plays the video and hides the cover image and play button
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background');
      
      if (video.tagName === 'VIDEO') {
          video.play()
              .then(() => hideCoverImageAndPlayButton(videoWrapper))
              .catch(error => console.error('Error attempting to play video:', error));
      } else if (video.tagName === 'IFRAME') {
          hideCoverImageAndPlayButton(videoWrapper);
      }
  }

  // Attaches event listeners to play buttons
  document.querySelectorAll('.video-play-button').forEach(button => {
      button.addEventListener('click', function() {
          const videoWrapper = button.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // Checks if a video should autoplay when the page loads
  document.querySelectorAll('.video-wrapper').forEach(videoWrapper => {
      const video = videoWrapper.querySelector('.video-hero-background');
      if (video.hasAttribute('autoplay')) {
          playVideo(videoWrapper);
      }
  });
});
