document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeedSetting = parseFloat(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed) || 1;
    const baseScrollStep = 1; // Base scroll step value
    const scrollStep = baseScrollStep * scrollSpeedSetting;
  
    // ... (rest of the code remains the same)
  });
  
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
  