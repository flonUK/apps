document.addEventListener('DOMContentLoaded', function() {
  var heroSection = document.querySelector('.adedayo-hero-advertisement-section');

  function adjustBackgroundPosition() {
    var screenWidth = window.innerWidth;
    if (screenWidth > 1024) {
      heroSection.style.backgroundPosition = 'center top';
    } else {
      heroSection.style.backgroundPosition = 'center center';
    }
  }

  window.addEventListener('resize', adjustBackgroundPosition);
  adjustBackgroundPosition();
});
