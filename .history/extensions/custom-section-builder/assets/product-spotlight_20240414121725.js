// product-spotlight.js

document.addEventListener('DOMContentLoaded', function() {
  const productSpotlights = document.querySelectorAll('.product-spotlight');

  productSpotlights.forEach(function(productSpotlight) {
    const imageContainer = productSpotlight.querySelector('.product-spotlight-image-container');
    const images = imageContainer.querySelectorAll('.product-spotlight-image');
    let currentImageIndex = 0;

    function showNextImage() {
      images[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].classList.add('active');
    }

    setInterval(showNextImage, 3000);
  });
});