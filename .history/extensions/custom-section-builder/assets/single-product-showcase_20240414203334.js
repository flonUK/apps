document.addEventListener('DOMContentLoaded', function() {
  const productImageContainer = document.querySelector('.product-image-container');
  const images = productImageContainer.querySelectorAll('.product-image');
  let currentImageIndex = 0;
  
  setInterval(function() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
  }, {{ section.settings.image_transition_duration }});
  });