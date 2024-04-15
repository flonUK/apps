document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    // Fetching the scroll speed set in the theme's settings
    const scrollSpeedSetting = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10) || 2; // Default value of 2
  
    // Map the value from [1, 5] to a scrollStep range. Assume 5 maps to a step of 10 (fastest), and 1 maps to a step of 0.2 (slowest).
    let scrollStep;
    if(scrollSpeedSetting >= 1 && scrollSpeedSetting <= 5) {
        // Convert [1, 5] to [0.2, 10]
        const minStep = 0.2;
        const maxStep = 10;
        const normalizedSpeedSetting = (scrollSpeedSetting - 1) / (5 - 1); // Normalize [1, 5] to [0, 1]
        scrollStep = minStep + (maxStep - minStep) * normalizedSpeedSetting; // Scale up to [0.2, 10]
    } else {
        scrollStep = Math.max(1, scrollSpeedSetting); // Fallback case, should not be needed but included for safety
    }
 
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    // Enhanced seamless looping logic for desktop columns
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        duplicateContent(column);
        let maxScroll = column.scrollHeight / 2;
        let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;
  
        function scroll() {
          // Adjust scrolling based on direction and apply corrections to prevent glitches
          if (scrollDirection < 0) { // For left column scrolling upwards
            if (column.scrollTop <= 0) {
              column.scrollTop = maxScroll;
            } else {
              column.scrollTop += scrollDirection;
            }
          } else { // For right column scrolling downwards
            if (column.scrollTop >= maxScroll) {
              column.scrollTop = 0;
            } else {
              column.scrollTop += scrollDirection;
            }
          }
  
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        requestAnimationFrame(scroll);
  
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll);
        });
      });
    }
  
    // Mobile rows' scrolling logic
    function autoScrollRows(rows) {
      rows.forEach((row, index) => {
        duplicateContent(row);
        let direction = index % 2 === 0 ? -1 : 1;
        let maxScrollLeft = row.scrollWidth / 2;
  
        function scrollRow() {
          row.scrollLeft += direction * scrollStep;
          
          if (direction === 1 && row.scrollLeft >= maxScrollLeft) {
            row.scrollLeft = 0;
          } else if (direction === -1 && row.scrollLeft <= 0) {
            row.scrollLeft = maxScrollLeft;
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        requestAnimationFrame(scrollRow);
  
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => row.isPaused = false);
      });
    }
  
    // Apply scrolling based on device type
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      autoScrollColumns(columns);
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      autoScrollRows(rows);
    }
  });
  