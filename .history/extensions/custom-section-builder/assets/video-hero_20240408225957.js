document.addEventListener('DOMContentLoaded', function() {
  // Play video when cover image or play button is clicked
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('.video-hero-background');
    const coverImageContainer = videoWrapper.querySelector('.cover-image-container');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video && (coverImageContainer || playButton)) {
      video.play().catch(error => {
        console.error('Error attempting to play video:', error);
      });

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
});