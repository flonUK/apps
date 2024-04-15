document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    const productContainers = document.querySelectorAll('.product-container');
  
    colorOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        const computedStyle = getComputedStyle(this);
        const color = computedStyle.backgroundColor;
        const productContainer = this.closest('.product-container');
        const productVisuals = productContainer.querySelectorAll('.product-visual');
  
        productVisuals.forEach(function(visual) {
          const productColor = visual.dataset.color;
          if (productColor === color) {
            visual.style.display = 'block';
          } else {
            visual.style.display = 'none';
          }
        });
      });
    });
  });
  