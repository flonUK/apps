document.addEventListener('DOMContentLoaded', function() {
  // Converts YouTube URL to an embed URL if the video is from YouTube
  function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  // Updates YouTube iframe src to use the embed URL for autoplay functionality
  document.querySelectorAll('.video-hero-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  // Plays the video, hides the cover image and play button
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video) {
      video.muted = true;
      video.play().then(function() {
        if (poster) {
          poster.style.opacity = '0';
          setTimeout(function() {
            poster.style.display = 'none';
          }, 500);
        }
        if (playButton) {
          playButton.style.display = 'none';
        }
      }).catch(function(error) {
        console.error('Error attempting to play video:', error);
      });
    }
  }

  // Adds event listeners to play buttons to trigger custom video play functionality
  document.querySelectorAll('.video-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.video-wrapper, .mobile-video');
      playVideo(videoWrapper);
    });
  });

  // Handles the initial display based on the video behavior setting
  document.querySelectorAll('.video-wrapper, .mobile-video').forEach(function(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (block.settings.video_behavior === 'cover') {
      // Ensure cover image and play button are initially visible
      if (poster) {
        poster.style.display = 'block';
        poster.style.opacity = '1';
      }
      if (playButton) {
        playButton.style.display = 'block';
      }
    }

    if (video && block.settings.video_behavior === 'autoplay') {
      video.muted = true;
      video.loop = true; // Ensures the video loops if autoplay is on
      video.play().then(function() {
        // Hide the cover image and play button upon successful autoplay
        if (poster) {
          poster.style.opacity = '0';
          setTimeout(function() {
            poster.style.display = 'none';
          }, 500);
        }
        if (playButton) {
          playButton.style.display = 'none';
        }
      }).catch(function(error) {
        console.error('Error attempting to autoplay video:', error);
      });
    }
  });
});
