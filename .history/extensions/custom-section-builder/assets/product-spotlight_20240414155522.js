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
          const imageContainerWidth = imageContainer.offsetWidth;
          images.forEach(function(image, index) {
            image.style.left = `${index * imageContainerWidth}px`;
          });

          interval = setInterval(function() {
            images[currentImageIndex].style.transition = 'left 0.5s ease';
            images[currentImageIndex].style.left = `-${imageContainerWidth}px`;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].style.transition = 'left 0.5s ease';
            images[currentImageIndex].style.left = `0`;
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
              images[currentImageIndex].style.transition = 'left 0.5s ease';
              images[currentImageIndex].style.left = `-${imageContainerWidth}px`;
              currentImageIndex = (currentImageIndex + 1) % images.length;
              images[currentImageIndex].style.transition = 'left 0.5s ease';
              images[currentImageIndex].style.left = `0`;
            }, duration);
          }
        }
      });
    });
  });
});
