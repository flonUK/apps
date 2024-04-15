document.addEventListener('DOMContentLoaded', function() {
  const coverImages = document.querySelectorAll('.cover-image-container');

  coverImages.forEach(container => {
    container.addEventListener('click', function() {
      const video = this.nextElementSibling;
      if (video && video.tagName === 'VIDEO') {
        video.play();
        this.style.display = 'none'; // Hide cover image after playing video
      }
    });
  });

  // Function for additional behaviors like autoplay adjustment based on viewport size can be added here
});
