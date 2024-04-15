document.addEventListener('DOMContentLoaded', function() {
  // Utility function to play a video within a given wrapper
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('.video-hero-background');
    if (!video) return; // Exit if no video is found

    // Hide cover image and play button upon playing the video
    function hideCoverImageAndPlayButton() {
      const poster = videoWrapper.querySelector('.video-hero-poster');
      const playButton = videoWrapper.querySelector('.video-play-button');
      if (poster) poster.style.display = 'none';
      if (playButton) playButton.style.display = 'none';
    }

    // Play video if it's a <video> tag
    if (video.tagName === 'VIDEO') {
      video.play().then(hideCoverImageAndPlayButton).catch(error => console.error('Error attempting to play video:', error));
    } else if (video.tagName === 'IFRAME') {
      // For <iframe>, just hide controls as autoplay should be handled via URL for embedded videos
      hideCoverImageAndPlayButton();
    }
  }

  // Attach event listeners to play buttons
  document.querySelectorAll('.video-play-button').forEach(button => {
    button.addEventListener('click', function() {
      const videoWrapper = this.closest('.video-wrapper');
      playVideo(videoWrapper);
    });
  });

  // Responsive video loading
  const isMobile = window.innerWidth <= 767;
  const videosToPlay = document.querySelectorAll('.video-hero-background[autoplay]');

  videosToPlay.forEach(video => {
    const videoWrapper = video.closest('.video-wrapper');
    const enableMobileVideo = videoWrapper.dataset.enableMobileVideo === 'true';
    const mobileVideoUrl = videoWrapper.dataset.mobileVideoUrl;
    
    // If on mobile, and mobile video is enabled, and a mobile video URL is provided
    if (isMobile && enableMobileVideo && mobileVideoUrl) {
      video.src = mobileVideoUrl; // Change the video source to the mobile video
    }

    playVideo(videoWrapper);
  });
});
