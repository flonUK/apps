document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    const productVisuals = document.querySelectorAll('.product-visual');
  
    colorOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        const color = this.style.backgroundColor;
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