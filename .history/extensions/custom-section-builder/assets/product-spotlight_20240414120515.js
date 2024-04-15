// product-spotlight.js
document.addEventListener('DOMContentLoaded', function() {
  const productSpotlights = document.querySelectorAll('.product-spotlight');

  productSpotlights.forEach(function(productSpotlight) {
    const imageContainers = productSpotlight.querySelectorAll('.product-spotlight-image-container');
    const interval = setInterval(showNextImage, 3000);
    let currentImageIndexes = Array.from({ length: imageContainers.length }, () => 0);

    function showNextImage() {
      imageContainers.forEach(function(imageContainer, index) {
        const images = imageContainer.querySelectorAll('.product-spotlight-image');
        images[currentImageIndexes[index]].classList.remove('active');
        currentImageIndexes[index] = (currentImageIndexes[index] + 1) % images.length;
        images[currentImageIndexes[index]].classList.add('active');
      });
    }
  });
});
