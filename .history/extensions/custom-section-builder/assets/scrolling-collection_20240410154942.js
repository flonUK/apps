document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const userScrollSpeedSetting = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10) || 6;
    // Base scroll speed - adjust based on testing for best effect
    const baseScrollStep = userScrollSpeedSetting; 
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    // Generalized autoScroll function with direction
    function autoScroll(element, isVertical, direction) {
      duplicateContent(element);
      let maxScroll = isVertical ? element.scrollHeight / 2 : element.scrollWidth / 2;
      let scrollStep = baseScrollStep * direction; // Direction determines the sign
  
      function scroll() {
        if (isVertical) {
          element.scrollTop += scrollStep;
          if (scrollStep > 0 && element.scrollTop >= maxScroll) { // Scrolling down
            element.scrollTop = 0;
          } else if (scrollStep < 0 && element.scrollTop <= 0) { // Scrolling up
            element.scrollTop = maxScroll;
          }
        } else {
          element.scrollLeft += scrollStep;
          if (scrollStep > 0 && element.scrollLeft >= maxScroll) { // Scrolling right
            element.scrollLeft = 0;
          } else if (scrollStep < 0 && element.scrollLeft <= 0) { // Scrolling left
            element.scrollLeft = maxScroll;
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
  
    // Apply scrolling based on device type with opposite directions
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      columns.forEach((column, index) => {
        // Alternate directions for each column
        const direction = index % 2 === 0 ? -1 : 1; // Change direction for each column
        autoScroll(column, true, direction);
      });
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      rows.forEach((row, index) => {
        // Alternate directions for each row
        const direction = index % 2 === 0 ? 1 : -1; // Change direction for each row, assuming you want to start in different directions
        autoScroll(row, false, direction);
      });
    }
  });
  