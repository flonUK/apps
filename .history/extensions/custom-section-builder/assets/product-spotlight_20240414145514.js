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
        if (images.length > 1) {
          setInterval(showNextImage, duration);
        }
      } else if (transition === 'scroll') {
        if (images.length > 1) {
          setInterval(function() {
            images[currentImageIndex].style.transition = 'transform 0.5s ease';
            images[currentImageIndex].style.transform = `translateX(-100%)`;
            
            setTimeout(function() {
              images[currentImageIndex].style.transition = 'none';
              images[currentImageIndex].style.transform = `translateX(${100 * images.length}%)`;
              
              currentImageIndex = (currentImageIndex + 1) % images.length;
              
              setTimeout(function() {
                images[currentImageIndex].style.transition = 'transform 0.5s ease';
                images[currentImageIndex].style.transform = `translateX(-${100 * currentImageIndex}%)`;
              }, 50);
            }, 500);
          }, duration);
        }
      }
    });
  });
});
