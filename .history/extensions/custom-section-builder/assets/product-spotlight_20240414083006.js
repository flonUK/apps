// product-spotlight.js

document.addEventListener('DOMContentLoaded', function() {
  const productSpotlight = document.querySelector('.product-spotlight');
  const productCards = productSpotlight.querySelectorAll('.product-spotlight-card');

  productCards.forEach((card, index) => {
    const productHandle = card.querySelector('.product-spotlight-image-container').dataset.productHandle;
    const imageContainer = card.querySelector('.product-spotlight-image-container');
    const titleElement = card.querySelector('.product-spotlight-title');
    const cardBgColor = getComputedStyle(card).getPropertyValue(`--card-bg-color-${index + 1}`);

    // Set card background color
    card.style.setProperty('--card-bg-color', cardBgColor);

    // Fetch product data from Shopify API
    fetch(`/products/${productHandle}.js`)
      .then(response => response.json())
      .then(product => {
        // ... (JavaScript code for displaying product images and title remains the same as before) ...
      });
  });
});