document.addEventListener('DOMContentLoaded', function() {
  // ... (previous code remains the same)

  // Handles video play and cover image visibility
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video, iframe');
    const poster = videoWrapper.querySelector('.adedayo-video-hero-poster');
    const playButton = videoWrapper.querySelector('.adedayo-video-hero-play-button');

    if (video) {
      if (video.tagName === 'VIDEO') {
        // Mute the video to satisfy the autoplay policies of most browsers
        video.muted = true;
        // Attempt to play the video
        video.play().then(function() {
          // Hide the poster and play button on successful play
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
          // Log an error if play was not possible, for example, due to user interaction policies
          console.error('Error attempting to play video:', error);
        });
      } else if (video.tagName === 'IFRAME') {
        // ... (previous code for handling YouTube videos remains the same)
      }
    }
  }

  // Add event listeners to play buttons for custom video play functionality
  document.querySelectorAll('.adedayo-video-hero-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.adedayo-video-hero-wrapper, .adedayo-video-hero-mobile-video');
      if (videoWrapper) {
        playVideo(videoWrapper);
      }
    });
  });

  // Handles video behavior based on settings such as autoplay, looping, or showing the cover
  function handleVideoBehavior(videoWrapper) {
    const video = videoWrapper.querySelector('video, iframe');
    const poster = videoWrapper.querySelector('.adedayo-video-hero-poster');
    const playButton = videoWrapper.querySelector('.adedayo-video-hero-play-button');

    if (video) {
      if (video.tagName === 'VIDEO') {
        video.muted = true; // Mute the video to allow for autoplay
        video.loop = true; // Enable looping for user-uploaded videos

        // If the video has the autoplay attribute, attempt to play it
        if (video.hasAttribute('autoplay')) {
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
            // Log an error if autoplay was not possible
            console.error('Error attempting to autoplay video:', error);
            // If autoplay fails, show the cover image and play button
            if (poster) {
              poster.style.display = 'block';
              poster.style.opacity = '1';
            }
            if (playButton) {
              playButton.style.display = 'block';
            }
          });
        } else {
          // If autoplay is not enabled, make sure the cover image and play button are visible
          if (poster) {
            poster.style.display = 'block';
            poster.style.opacity = '1';
          }
          if (playButton) {
            playButton.style.display = 'block';
          }
        }
      } else if (video.tagName === 'IFRAME') {
        // ... (previous code for handling YouTube videos remains the same)
      }
    }
  }

  // Apply video behavior for desktop and mobile video wrappers
  document.querySelectorAll('.adedayo-video-hero-wrapper, .adedayo-video-hero-mobile-video').forEach(function(videoWrapper) {
    handleVideoBehavior(videoWrapper);
  });
});