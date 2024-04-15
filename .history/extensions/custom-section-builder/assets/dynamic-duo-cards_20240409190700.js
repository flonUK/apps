document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.adedayo-ddc-cards');
    const mobileView = window.matchMedia('(max-width: 768px)');
  
    function adjustMobileVisibility() {
      const visibilitySetting = cardsContainer.dataset['adedayoDdcMobileVisibility'];
      const cardLeft = document.querySelector('.adedayo-ddc-card-left');
      const cardRight = document.querySelector('.adedayo-ddc-card-right');
  
      if (mobileView.matches) {
        cardLeft.style.display = (visibilitySetting === 'left' || visibilitySetting === 'both') ? '' : 'none';
        cardRight.style.display = (visibilitySetting === 'right' || visibilitySetting === 'both') ? '' : 'none';
      } else {
        cardLeft.style.display = '';
        cardRight.style.display = '';
      }
    }
  
    mobileView.addListener(adjustMobileVisibility);
    adjustMobileVisibility();
  });
  