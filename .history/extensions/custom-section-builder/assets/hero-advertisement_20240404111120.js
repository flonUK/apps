document.addEventListener('DOMContentLoaded', function() {
    var heroSection = document.querySelector('.hero-advertisement-section');
  
    function adjustBackgroundPosition() {
      var screenWidth = window.innerWidth;
      if (screenWidth > 1024) {
        // Example breakpoint
        heroSection.style.backgroundPosition = 'center top'; // Adjusts for wider screens
      } else {
        heroSection.style.backgroundPosition = 'center center'; // Default for smaller screens
      }
    }
  
    window.addEventListener('resize', adjustBackgroundPosition);
    adjustBackgroundPosition(); // Initial adjustment
  });