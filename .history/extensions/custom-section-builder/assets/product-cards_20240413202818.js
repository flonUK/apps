document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.adedayo-product-card');
  
    productCards.forEach(card => {
      const images = card.querySelectorAll('.adedayo-product-card__image');
      let currentImageIndex = 0;
  
      if (images.length > 1) {
        setInterval(() => {
          images[currentImageIndex].classList.remove('active');
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].classList.add('active');
        }, 5000);
      }
  
      images[currentImageIndex].classList.add('active');
    });
  });
  