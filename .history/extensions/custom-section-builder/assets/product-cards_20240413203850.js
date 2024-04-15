document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
  
    productCards.forEach(function(card) {
      const images = card.querySelectorAll('.product-card__image');
      let currentImageIndex = 0;
  
      if (images.length > 1) {
        setInterval(function() {
          images[currentImageIndex].classList.remove('active');
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].classList.add('active');
        }, 5000);
      }
  
      images[currentImageIndex].classList.add('active');
    });
  });