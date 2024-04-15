document.addEventListener('DOMContentLoaded', function() {
    const showcase = document.querySelector('.product-showcase-app .product-showcase');
    const productItems = document.querySelectorAll('.product-showcase-app .product-item');
    let currentIndex = 0;
    let autoplayInterval;
  
    function updateActiveItem() {
      productItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
      });
    }
  
    function showNextItem() {
      currentIndex = (currentIndex + 1) % productItems.length;
      updateActiveItem();
    }
  
    function startAutoplay() {
      if (!autoplayInterval) {
        autoplayInterval = setInterval(showNextItem, 5000);
      }
    }
  
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }
  
    function toggleChevronDisplay() {
      const showChevron = showcase.dataset.showChevron === 'true';
      const chevronLinks = document.querySelectorAll('.product-showcase-app .chevron-link');
      const isMobileView = window.innerWidth <= 999;
      
      chevronLinks.forEach(link => {
        link.style.display = (showChevron && isMobileView) ? 'block' : 'none';
        // Add click event listener to chevron links for navigation
        link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default action
          window.location.href = this.getAttribute('href'); // Navigate to the link's href value
        });
      });
    }
  
    function adjustTextPositions() {
      const textContainers = document.querySelectorAll('.product-showcase-app .text-container');
      textContainers.forEach(container => {
        const positionDesktop = container.getAttribute('data-text-position-desktop');
        const positionMobile = container.getAttribute('data-text-position-mobile');
        const isMobileView = window.innerWidth <= 999;
  
        if (isMobileView && positionMobile) {
          container.style.bottom = `${positionMobile}%`;
        } else if (!isMobileView && positionDesktop) {
          container.style.top = `${positionDesktop}%`;
        }
      });
    }
  
    function adjustForMobile() {
      startAutoplay();
      updateActiveItem();
      toggleChevronDisplay();
    }
  
    function adjustForDesktop() {
      stopAutoplay();
      productItems.forEach(item => item.classList.add('active'));
      toggleChevronDisplay();
    }
  
    function handleResize() {
      currentIndex = 0;
      const isMobileView = window.innerWidth <= 999;
      if (isMobileView) {
        adjustForMobile();
      } else {
        adjustForDesktop();
      }
      adjustTextPositions();
    }
  
    // Initial setup based on current viewport size
    handleResize();
  
    // Add an event listener for window resizing to adjust the display dynamically
    window.addEventListener('resize', handleResize);
  });