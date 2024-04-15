
document.addEventListener('DOMContentLoaded', function() {
  const colorOptions = document.querySelectorAll('.color-option');
  const productContainers = document.querySelectorAll('.product-container');

  colorOptions.forEach(function(option) {
    option.addEventListener('click', function() {
      const color = this.style.backgroundColor;
      const productContainer = this.closest('.product-container');
      const productVisuals = productContainer.querySelectorAll('.product-visual');

      productVisuals.forEach(function(visual) {
        const image = visual.querySelector('img');
        if (image.src.includes(color)) {
          visual.style.display = 'block';
        } else {
          visual.style.display = 'none';
        }
      });
    });
  });
});
