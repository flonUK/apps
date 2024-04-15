document.addEventListener('DOMContentLoaded', function() {
  const productImageContainers = document.querySelectorAll('.product-image-container');
  
  productImageContainers.forEach(function(container, index) {
    const images = container.querySelectorAll('.product-image');
    let currentImageIndex = index;
    setInterval(function() {
      images[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].classList.add('active');
    }, {{ block.settings.image_transition_duration }});
  });
});

