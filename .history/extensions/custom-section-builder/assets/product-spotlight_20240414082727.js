// product-spotlight.js

document.addEventListener('DOMContentLoaded', function() {
  const productSpotlight = document.querySelector('.product-spotlight');
  const productCards = productSpotlight.querySelectorAll('.product-spotlight-card');

  productCards.forEach((card, index) => {
    const productHandle = `{{ settings.product_${index + 1}.handle }}`;
    const imageContainer = card.querySelector('.product-spotlight-image-container');
    const titleElement = card.querySelector('.product-spotlight-title');
    const cardBgColor = `{{ settings.card_bg_color_${index + 1} }}`;

    // Set card background color
    card.style.setProperty('--card-bg-color', cardBgColor);

    // Fetch product data from Shopify API
    fetch(`/products/${productHandle}.js`)
      .then(response => response.json())
      .then(product => {
        // Display product images
        const images = product.images;
        let currentImageIndex = 0;

        images.forEach(image => {
          const img = document.createElement('img');
          img.src = image.src;
          img.alt = image.alt;
          imageContainer.appendChild(img);
        });

        // Set the first image as active
        imageContainer.querySelector('img').classList.add('active');

        // Start image scrolling
        setInterval(() => {
          const currentImage = imageContainer.querySelector('img.active');
          currentImage.classList.remove('active');

          currentImageIndex = (currentImageIndex + 1) % images.length;
          imageContainer.querySelectorAll('img')[currentImageIndex].classList.add('active');
        }, 5000);

        // Display product title
        titleElement.textContent = product.title;
      });
  });
});