// product-card.js

document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const productId = this.dataset.productId;

      if (productId) {
        const formData = {
          'items': [
            {
              'id': productId,
              'quantity': 1
            }
          ]
        };

        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (response.ok) {
            console.log('Product added to cart successfully!');
            // You can optionally add a success notification or redirect to the cart page here
          } else {
            console.error('Error adding product to cart:', response.status);
          }
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
      } else {
        console.error('No product variant selected.');
      }
    });
  });
});
