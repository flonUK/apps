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
      
      function showNextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
      }
      
      if (transition === 'fade') {
        setInterval(showNextImage, duration);
      } else if (transition === 'scroll') {
        let scrollPosition = 0;
        const scrollAmount = 250; // Adjust this value to control the scroll amount
        
        setInterval(function() {
          scrollPosition -= scrollAmount;
          imageContainer.style.transform = `translateX(${scrollPosition}px)`;
          
          if (scrollPosition <= -250 * (images.length - 1)) {
            scrollPosition = 0;
          }
        }, duration);
      }
    });
  });
});