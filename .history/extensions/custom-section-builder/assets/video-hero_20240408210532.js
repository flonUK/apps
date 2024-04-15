document.addEventListener('DOMContentLoaded', function() {
  // Determine if the display is mobile
  const isMobile = window.innerWidth <= 767;

  // Function to play a video
  function playVideo(videoElement) {
    if (videoElement.tagName === 'VIDEO') {
      videoElement.play().catch(error => console.error('Error attempting to play video:', error));
    }
    // If it's an iframe, video autoplay is managed through the embed URL parameters, so no action needed here
  }

  // Apply display settings based on schema
  const videoHeroContainer = document.querySelector('.video-hero');
  if (isMobile) {
    // Apply mobile video settings
    if (document.querySelector('#enable_mobile_video').checked) {
      videoHeroContainer.classList.add('mobile-video');
      videoHeroContainer.classList.remove('desktop-video');
    }
    // Apply mobile display settings
    if (document.querySelector('#show_heading_on_mobile').checked) {
      videoHeroContainer.classList.add('mobile-display');
    }
    if (document.querySelector('#show_button_on_mobile').checked) {
      videoHeroContainer.classList.add('mobile-display');
    }
  } else {
    // Ensure desktop settings are applied
    videoHeroContainer.classList.add('desktop-display');
    videoHeroContainer.classList.add('desktop-video');
  }

  // Rounded button feature
  if (document.querySelector('#enable_rounded_button').checked) {
    videoHeroContainer.classList.add('rounded-button');
  }

  // Find and play videos
  const videos = document.querySelectorAll('.video-hero-background');
  videos.forEach(playVideo);
});
