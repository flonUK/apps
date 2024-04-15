document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const userScrollSpeedSetting = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10) || 6;
    const scrollStep = userScrollSpeedSetting; // Adjust based on testing for best effect
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    // Generalized autoScroll function for both directions
    function autoScroll(element, isVertical) {
      duplicateContent(element);
      let maxScroll = isVertical ? element.scrollHeight / 2 : element.scrollWidth / 2;
  
      function scroll() {
        if (isVertical) {
          element.scrollTop += scrollStep;
          if (element.scrollTop >= maxScroll) {
            element.scrollTop = 0;
          }
        } else {
          element.scrollLeft += scrollStep;
          if (element.scrollLeft >= maxScroll) {
            element.scrollLeft = 0;
          }
        }
  
        if (!element.isPaused) requestAnimationFrame(scroll);
      }
  
      requestAnimationFrame(scroll);
  
      element.addEventListener('mouseenter', () => element.isPaused = true);
      element.addEventListener('mouseleave', () => {
        element.isPaused = false;
        requestAnimationFrame(scroll);
      });
    }
  
    // Apply scrolling based on device type
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      columns.forEach(column => {
        autoScroll(column, true); // True for vertical scrolling
      });
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      rows.forEach(row => {
        autoScroll(row, false); // False for horizontal scrolling
      });
    }
  });
  