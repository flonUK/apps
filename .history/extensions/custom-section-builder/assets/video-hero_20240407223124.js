document.addEventListener('DOMContentLoaded', function() {
  function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${match[2]}`;
    } else {
      return url;
    }
  }

  document.querySelectorAll('.video-hero-background').forEach(function(video) {
    if (video.tagName === 'IFRAME') {
      const videoSrc = video.getAttribute('src');
      const newSrc = convertToEmbedUrl(videoSrc);
      video.setAttribute('src', newSrc);
    }
  });

  function playVideo(videoWrapper) {
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (video) {
      video.muted = true;
      video.play().then(function() {
        if (poster) poster.style.display = 'none';
        if (playButton) playButton.style.display = 'none';
      }).catch(function(error) {
        console.error('Error attempting to play video:', error);
      });
    }
  }

  document.querySelectorAll('.video-play-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const videoWrapper = button.closest('.video-wrapper, .mobile-video');
      if (videoWrapper) {
        playVideo(videoWrapper);
      }
    });
  });

  document.querySelectorAll('.video-wrapper, .mobile-video').forEach(function(videoWrapper) {
    const videoBehavior = videoWrapper.dataset.videoBehavior; // Assuming data attribute for video behavior
    const video = videoWrapper.querySelector('video');
    const poster = videoWrapper.querySelector('.video-hero-poster');
    const playButton = videoWrapper.querySelector('.video-play-button');

    if (videoBehavior === 'cover') {
      if (poster) poster.style.display = 'block';
      if (playButton) playButton.style.display = 'block';
      if (video) video.muted = true; // Ensure video is muted initially
    }
  });
});
