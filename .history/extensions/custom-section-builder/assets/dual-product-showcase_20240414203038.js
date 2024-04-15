document.addEventListener('DOMContentLoaded', function() {
    const productImageContainers = document.querySelectorAll('.product-image-container');
    
    productImageContainers.forEach(function(container) {
    const images = container.querySelectorAll('.product-image');
    let currentImageIndex = 0;setInterval(function() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
      }, {{ section.settings.image_transition_duration }});
      setInterval(function() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
      }, {{ section.settings.image_transition_duration }});
      