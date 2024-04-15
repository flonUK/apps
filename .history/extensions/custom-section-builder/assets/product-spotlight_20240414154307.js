// product-spotlight.js
document.addEventListener('DOMContentLoaded', function() {
  const productSpotlights = document.querySelectorAll('.product-spotlight');
  productSpotlights.forEach(function(productSpotlight) {
    const imageContainers = productSpotlight.querySelectorAll('.product-spotlight-image-container');
    imageContainers.forEach(function(imageContainer) {
      const images = imageContainer.querySelectorAll('.product-spotlight-image');
      const transition = imageContainer.dataset.transition;
      const duration = parseInt(imageContainer.dataset.duration) * 1000; // Convert to milliseconds
      let currentImageIndex = 0;
      let interval;
      const imageContainerWidth = imageContainer.offsetWidth;

      function showNextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
      }

      if (transition === 'fade') {
        if (images.length > 1) {
          interval = setInterval(showNextImage, duration);
        }
      } else if (transition === 'scroll') {
        if (images.length > 1) {
          images.forEach(function(image, index) {
            image.style.left = `${index * imageContainerWidth}px`;
          });

          interval = setInterval(function() {
            const currentImage = images[currentImageIndex];
            const nextImageIndex = (currentImageIndex + 1) % images.length;
            const nextImage = images[nextImageIndex];

            currentImage.style.transition = `left ${duration / 1000}s ease-in-out`;
            currentImage.style.left = `-${imageContainerWidth}px`;

            nextImage.style.transition = `left ${duration / 1000}s ease-in-out`;
            nextImage.style.left = `0`;

            setTimeout(function() {
              showNextImage();
            }, duration);
          }, duration);
        }
      }

      imageContainer.addEventListener('mouseenter', function() {
        clearInterval(interval);
      });

      imageContainer.addEventListener('mouseleave', function() {
        if (transition === 'fade') {
          if (images.length > 1) {
            interval = setInterval(showNextImage, duration);
          }
        } else if (transition === 'scroll') {
          if (images.length > 1) {
            interval = setInterval(function() {
              const currentImage = images[currentImageIndex];
              const nextImageIndex = (currentImageIndex + 1) % images.length;
              const nextImage = images[nextImageIndex];

              currentImage.style.transition = `left ${duration / 1000}s ease-in-out`;
              currentImage.style.left = `-${imageContainerWidth}px`;

              nextImage.style.transition = `left ${duration / 1000}s ease-in-out`;
              nextImage.style.left = `0`;

              setTimeout(function() {
                showNextImage();
              }, duration);
            }, duration);
          }
        }
      });
    });
  });
});