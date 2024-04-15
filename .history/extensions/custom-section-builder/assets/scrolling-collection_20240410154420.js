document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const userScrollSpeedSetting = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10) || 6;
    // Adjust the calculation for scrollStep based on feedback
    const scrollStep = isDesktop ? userScrollSpeedSetting * 0.2 : userScrollSpeedSetting * 0.1;
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    function autoScroll(element, isVertical, isReverse) {
      duplicateContent(element);
      let maxScroll = isVertical ? element.scrollHeight / 2 : element.scrollWidth / 2;
      let scrollDirection = isReverse ? -scrollStep : scrollStep;
  
      function scroll() {
        let currentScroll = isVertical ? element.scrollTop : element.scrollLeft;
        if (isReverse) {
          if (currentScroll <= 0) {
            isVertical ? element.scrollTop = maxScroll : element.scrollLeft = maxScroll;
          } else {
            isVertical ? element.scrollTop += scrollDirection : element.scrollLeft += scrollDirection;
          }
        } else {
          if (currentScroll >= maxScroll) {
            isVertical ? element.scrollTop = 0 : element.scrollLeft = 0;
          } else {
            isVertical ? element.scrollTop += scrollDirection : element.scrollLeft += scrollDirection;
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
      document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column').forEach((column, index) => {
        autoScroll(column, true, index % 2 === 0);
      });
    } else {
      document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row').forEach((row, index) => {
        autoScroll(row, false, index % 2 !== 0);
      });
    }
  });
  