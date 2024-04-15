document.addEventListener('DOMContentLoaded', function() {
  const productSpotlights = document.querySelectorAll('.product-spotlight');
  
  productSpotlights.forEach(function(productSpotlight) {
    const imageContainers = productSpotlight.querySelectorAll('.product-spotlight-image-container');
    
    imageContainers.forEach(function(imageContainer) {
      const images = imageContainer.querySelectorAll('.product-spotlight-image');
      const transition = imageContainer.dataset.transition;
      const duration = parseInt(imageContainer.dataset.duration) * 1000; // Convert to milliseconds
      let currentImageIndex = 0;
      
      function scrollImages() {
        // Move current image to the left
        images[currentImageIndex].style.transition = 'transform 0.5s ease';
        images[currentImageIndex].style.transform = `translateX(-100%)`;
        
        // Set next image to the right and make it visible
        setTimeout(function() {
          images[currentImageIndex].style.transition = 'none';
          images[currentImageIndex].style.transform = `translateX(${100 * images.length}%)`;
          
          currentImageIndex = (currentImageIndex + 1) % images.length;
          
          images[currentImageIndex].style.transition = 'transform 0.5s ease';
          images[currentImageIndex].style.transform = `translateX(0)`;
        }, 500);
      }
      
      if (transition === 'scroll') {
        if (images.length > 1) {
          setInterval(scrollImages, duration);
        }
      }
    });
  });
});
