document.addEventListener('DOMContentLoaded', function() {
  // Convert YouTube URLs to embed URLs to enable autoplay and mute
  function convertToEmbedUrl(url) {
      const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length == 11) {
          return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
      }
      return url; // Return original URL if not a YouTube URL
  }

  // Update all video URLs to embed URLs
  document.querySelectorAll('iframe.video-hero-background').forEach(function(video) {
      const videoSrc = video.getAttribute('src');
      video.setAttribute('src', convertToEmbedUrl(videoSrc));
  });

  // Function to play the video and manage cover image and play button visibility
  function playVideo(videoWrapper) {
      const video = videoWrapper.querySelector('.video-hero-background');
      const poster = videoWrapper.querySelector('.video-hero-poster');
      const playButton = videoWrapper.querySelector('.video-play-button');

      if (video.tagName == 'VIDEO') {
          video.play().then(() => hideCoverImageAndPlayButton(poster, playButton))
                      .catch(error => console.error('Error attempting to play video:', error));
      } else if (video.tagName == 'IFRAME') {
          // Autoplay for iframe is handled via URL parameters
          hideCoverImageAndPlayButton(poster, playButton);
      }
  }

  // Hide the cover image and play button
  function hideCoverImageAndPlayButton(poster, playButton) {
      if (poster) poster.style.display = 'none';
      if (playButton) playButton.style.display = 'none';
  }

  // Attach event listeners to play buttons
  document.querySelectorAll('.video-play-button').forEach(button => {
      button.addEventListener('click', function() {
          const videoWrapper = button.closest('.video-wrapper');
          playVideo(videoWrapper);
      });
  });

  // Initialize display based on video behavior settings
  document.querySelectorAll('.video-wrapper').forEach(videoWrapper => {
      const video = videoWrapper.querySelector('.video-hero-background');
      const poster = videoWrapper.querySelector('.video-hero-poster');
      const playButton = videoWrapper.querySelector('.video-play-button');
      const behavior = videoWrapper.getAttribute('data-video-behavior'); // Assuming data attribute for behavior

      // Apply initial display settings based on video behavior
      if (behavior == 'cover') {
          poster?.style.display = 'block';
          playButton?.style.display = 'block';
      } else if (behavior == 'autoplay' && video.tagName == 'VIDEO') {
          video.play().catch(error => console.error('Error attempting to autoplay video:', error));
      }
  });
});
