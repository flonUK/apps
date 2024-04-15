document.addEventListener('DOMContentLoaded', function() {
  // Converts YouTube URL to an embed URL to enable autoplay and mute
  function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  // Update YouTube iframe src attributes to use embed URLs
  document.querySelectorAll('.video-hero-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  // Handles video play functionality for both video and iframe elements
  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video, iframe');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video.tagName === 'VIDEO') {
      video.muted = true;
      video.play().then(function() {
        poster.style.display = 'none';
        playButton.style.display = 'none';
      }).catch(function(error) {
        console.error('Error attempting to play video:', error);
      });
    } else if (video.tagName === 'IFRAME') {
      video.src += "&autoplay=1";
      poster.style.display = 'none';
      playButton.style.display = 'none';
    }
  }

  // Add event listeners to play buttons
  document.querySelectorAll('.video-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.video-wrapper');
      playVideo(videoWrapper);
    });
  });

  // Function to toggle between standard and mobile video
  function toggleMobileVideo(enable) {
    const standardVideoWrapper = document.querySelector('.video-wrapper');
    const mobileVideoWrapper = document.querySelector('.mobile-video');

    if (enable) {
      if (standardVideoWrapper) standardVideoWrapper.classList.add('hide-on-mobile');
      if (mobileVideoWrapper) mobileVideoWrapper.classList.remove('hide-on-mobile');
    } else {
      if (standardVideoWrapper) standardVideoWrapper.classList.remove('hide-on-mobile');
      if (mobileVideoWrapper) mobileVideoWrapper.classList.add('hide-on-mobile');
    }
  }

  // Initially check and set the correct video display based on the 'enable_mobile_video' setting
  const enableMobileVideoSetting = document.querySelector('[name="enable_mobile_video"]').checked;
  toggleMobileVideo(enableMobileVideoSetting);

  // Listen for changes in the 'Use Vertical Video on Mobile' setting
  document.querySelector('[name="enable_mobile_video"]').addEventListener('change', function(e) {
    toggleMobileVideo(e.target.checked);
  });

  // Additional functionality to handle video autoplay based on settings can be implemented as needed
});
