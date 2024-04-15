document.addEventListener('DOMContentLoaded', function() {
  // Function to convert YouTube URL to an embed URL, incorporating autoplay and mute parameters for compliance with autoplay policies
  function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  // Update YouTube iframe src attributes to use embed URLs for enabling autoplay functionality
  document.querySelectorAll('.video-hero-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  // Function to handle video play functionality and manage visibility of cover image and play button
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video, iframe');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video.tagName === 'VIDEO') {
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
    } else if (video.tagName === 'IFRAME') {
      video.src += "&autoplay=1";
      if (poster) {
        poster.style.display = 'none';
      }
      if (playButton) {
        playButton.style.display = 'none';
      }
    }
  }

  // Add click event listeners to play buttons to initiate video play and hide cover image and play button
  document.querySelectorAll('.video-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.video-wrapper');
      playVideo(videoWrapper);
    });
  });

  // Initialize display based on video behavior settings (autoplay or show cover image)
  document.querySelectorAll('.video-wrapper').forEach(function(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (block.settings.video_behavior === 'cover') {
      if (poster) {
        poster.style.display = 'block';
        poster.style.opacity = '1';
      }
      if (playButton) {
        playButton.style.display = 'block';
      }
    } else if (video && block.settings.video_behavior === 'autoplay') {
      video.muted = true;
      video.loop = true;
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
        console.error('Error attempting to autoplay video:', error);
      });
    }
  });

  // Extension to handle toggling between standard and mobile videos based on the 'enable_mobile_video' setting
  function toggleMobileVideo(enable) {
    const standardVideoWrapper = document.querySelector('.video-wrapper');
    const mobileVideo = document.querySelector('.mobile-video'); // Ensure this selector targets your mobile video container

    // Hide or show the standard video wrapper based on the enable flag
    if (standardVideoWrapper) {
      standardVideoWrapper.style.display = enable ? 'none' : 'block';
    }

    // Hide or show the mobile video based on the enable flag
    if (mobileVideo) {
      mobileVideo.style.display = enable ? 'block' : 'none';
    }
  }

  // Assuming you have a mechanism to read the 'enable_mobile_video' setting from your settings object
  // This part may need adjustment based on how your theme's settings are structured
  const enableMobileVideo = block.settings.enable_mobile_video;

  toggleMobileVideo(enableMobileVideo);

  // Optionally, if your theme provides a way for users to change settings in real-time,
  // you might need to add an event listener to handle such changes
});
