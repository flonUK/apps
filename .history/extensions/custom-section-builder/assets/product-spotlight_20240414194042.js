// product-spotlight.js
document.addEventListener('DOMContentLoaded', function() {
  const productSpotlights = document.querySelectorAll('.product-spotlight');

  productSpotlights.forEach(function(productSpotlight) {
    const imageContainers = productSpotlight.querySelectorAll('.product-spotlight-image-container');
    const scrollStep = 330; // Adjust the scroll step to match the card width and margin
    let scrollInterval;

    function startScrolling() {
      scrollInterval = setInterval(function() {
        productSpotlight.scrollLeft += scrollStep;
        if (productSpotlight.scrollLeft >= productSpotlight.scrollWidth - productSpotlight.offsetWidth) {
          productSpotlight.scrollLeft = 0;
        }
      }, 3000); // Adjust the scroll interval as needed
    }

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    productSpotlight.addEventListener('mouseenter', stopScrolling);
    productSpotlight.addEventListener('mouseleave', startScrolling);

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
      }

      imageContainer.addEventListener('mouseenter', function() {
        clearInterval(interval);
      });

      imageContainer.addEventListener('mouseleave', function() {
        if (transition === 'fade') {
          if (images.length > 1) {
            interval = setInterval(showNextImage, duration);
          }
        }
      });
    });

    startScrolling();
  });
});