document.addEventListener('DOMContentLoaded', function() {
    var cardsContainer = document.querySelector('.adedayo-ddc-cards');
    var pageWidthContainer = cardsContainer ? cardsContainer.closest('.page-width') : null;
  
    // Function to toggle full width class based on layout
    function toggleFullWidth() {
      const isFullWidth = cardsContainer.dataset['adedayoDdcLayout'] === 'fullwidth';
      if (pageWidthContainer) {
        if (isFullWidth || window.innerWidth <= 768) {
          pageWidthContainer.classList.add('adedayo-ddc-custom-full-width');
        } else {
          pageWidthContainer.classList.remove('adedayo-ddc-custom-full-width');
        }
      }
    }
  
    // Adjust layout based on viewport size
    window.addEventListener('resize', toggleFullWidth);
    toggleFullWidth(); // Initial check
  
    // Adjust visibility based on mobile visibility setting
    function adjustMobileVisibility() {
      const visibilitySetting = cardsContainer.dataset['adedayoDdcMobileVisibility'];
      const leftCard = document.querySelector('.adedayo-ddc-card-left');
      const rightCard = document.querySelector('.adedayo-ddc-card-right');
  
      if (window.innerWidth <= 768) {
        leftCard.style.display = (visibilitySetting === 'left' || visibilitySetting === 'both') ? '' : 'none';
        rightCard.style.display = (visibilitySetting === 'right' || visibilitySetting === 'both') ? '' : 'none';
      } else {
        leftCard.style.display = '';
        rightCard.style.display = '';
      }
    }
  
    adjustMobileVisibility();
    window.addEventListener('resize', adjustMobileVisibility);
  });
  