document.addEventListener('DOMContentLoaded', function() {
  // Converts YouTube URL to an embed URL
  function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  // Update YouTube iframe src to use the embed URL
  document.querySelectorAll('.video-hero-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  // Handles video play and cover image visibility
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

  // Add event listeners to play buttons for custom video play functionality
  document.querySelectorAll('.video-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.video-wrapper, .mobile-video');
      if (videoWrapper) {
        playVideo(videoWrapper);
      }
    });
  });

  // Handles video behavior based on settings such as autoplay, looping, or showing the cover
  document.querySelectorAll('.video-wrapper, .mobile-video').forEach(function(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    // Initialize the cover image and play button visibility based on the video behavior setting
    if (video) {
      video.muted = true; // Mute the video to allow for autoplay
      video.loop = true; // Enable looping for user-uploaded videos
      
      // Check if the behavior is set to show the cover image
      if (block.settings.video_behavior === 'cover') {
        if (poster) {
          poster.style.display = 'block';
          poster.style.opacity = '1';
        }
        if (playButton) {
          playButton.style.display = 'block';
        }
      } else {
        // If autoplay is enabled, attempt to play the video
        video.play().then(function() {
          // Hide the poster and play button on successful autoplay
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
    }
  });
});
