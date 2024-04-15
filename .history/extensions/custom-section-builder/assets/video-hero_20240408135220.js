
document.addEventListener('DOMContentLoaded', function() {
  // Function to convert YouTube URL to an embed URL, incorporating autoplay and mute parameters for compliance with autoplay policies
  function adedayoVideoHeroC7KL9M_convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  // Update YouTube iframe src attributes to use embed URLs for enabling autoplay functionality
  document.querySelectorAll('.adedayo-video-hero-U6VY3H-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = adedayoVideoHeroC7KL9M_convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  // Function to handle video play functionality and manage visibility of cover image and play button
  function adedayoVideoHeroF2NR5T_playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video, iframe');
    const poster = videoWrapper.querySelector('.adedayo-video-hero-F8GJ3D-poster');
    const playButton = videoWrapper.querySelector('.adedayo-video-hero-R1HT6S-play-button');

    if (video.tagName === 'VIDEO') {
      video.muted = true; // Mute the video to comply with browser autoplay policies
      video.play().then(function() {
        // Upon successful video play, hide the cover image and play button
        if (poster) {
          poster.style.opacity = '0';
          setTimeout(function() {
            poster.style.display = 'none';
          }, 500); // Use a timeout to allow for a fade-out effect if desired
        }
        if (playButton) {
          playButton.style.display = 'none';
        }
      }).catch(function(error) {
        console.error('Error attempting to play video:', error);
      });
    } else if (video.tagName === 'IFRAME') {
      // Handling iframe play action
      video.src += "&autoplay=1"; // Trigger autoplay by appending autoplay parameter to src
      if (poster) {
        poster.style.display = 'none';
      }
      if (playButton) {
        playButton.style.display = 'none';
      }
    }
  }

  // Add click event listeners to play buttons to initiate video play and hide cover image and play button
  document.querySelectorAll('.adedayo-video-hero-R1HT6S-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.adedayo-video-hero-P4FK2S-wrapper');
      adedayoVideoHeroF2NR5T_playVideo(videoWrapper);
    });
  });

  // Initialize display based on video behavior settings (autoplay or show cover image)
  document.querySelectorAll('.adedayo-video-hero-P4FK2S-wrapper').forEach(function(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.adedayo-video-hero-F8GJ3D-poster');
    const playButton = videoWrapper.querySelector('.adedayo-video-hero-R1HT6S-play-button');

    // Display the cover image and play button initially if the video behavior is set to show cover image
    if (block.settings.video_behavior === 'cover') {
      if (poster) {
        poster.style.display = 'block';
        poster.style.opacity = '1';
      }
      if (playButton) {
        playButton.style.display = 'block';
      }
    }

    // Handle autoplay behavior, attempting to play the video automatically if the setting is enabled
    if (video && block.settings.video_behavior === 'autoplay') {
      video.muted = true;
      video.loop = true; // Loop the video if autoplay is enabled
      video.play().then(function() {
        // Hide the cover image and play button on successful autoplay
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
        // Log autoplay failure, potentially due to browser policies requiring user interaction
        console.error('Error attempting to autoplay video:', error);
      });
    }
  });
});