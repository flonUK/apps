document.addEventListener('DOMContentLoaded', function() {
  // Determines if the current device is mobile based on the viewport width.
  function isMobileDevice() {
    return window.innerWidth < 768;
  }

  // Sets up the video hero section, including event listeners for play buttons and logic for mobile video.
  function initializeVideoHero() {
    const videoHeroElement = document.querySelector('.video-hero');
    const enableMobileVideo = videoHeroElement.getAttribute('data-enable-mobile-video') === 'true';
    const coverImageContainer = videoHeroElement.querySelector('.cover-image-container');
    const playButton = videoHeroElement.querySelector('.video-play-button');
    const youtubeVideoContainer = videoHeroElement.querySelector('.youtube-video-container');
    const overlay = videoHeroElement.querySelector('.video-hero-overlay');
    const mobileVideo = videoHeroElement.querySelector('.video-hero-background.mobile');
    const desktopVideo = videoHeroElement.querySelector('.video-hero-background.desktop');

    // Handles the logic to play the video when the play button or cover image is clicked.
    function playVideo() {
      if (coverImageContainer) coverImageContainer.style.display = 'none'; // Hides the cover image.
      overlay.style.display = 'flex'; // Shows the overlay.

      if (youtubeVideoContainer) {
        const videoUrl = playButton.getAttribute('data-video-url');
        youtubeVideoContainer.innerHTML = `<iframe class="youtube-video" width="100%" height="100%" src="https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(videoUrl)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        if (isMobileDevice() && enableMobileVideo && mobileVideo) {
          mobileVideo.play();
        } else if (desktopVideo) {
          desktopVideo.play();
        }
      }
    }

    // Extracts the YouTube video ID from a URL.
    function getYouTubeVideoId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }

    // Setup event listeners.
    if (coverImageContainer) {
      coverImageContainer.addEventListener('click', playVideo);
    }
    if (playButton) {
      playButton.addEventListener('click', playVideo);
    }
  }

  initializeVideoHero();
});