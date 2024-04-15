document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));
  
    // Adjusted approach for column scrolling to ensure seamless looping
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        duplicateColumnContent(column); // Duplicate column content
        let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;
  
        function scroll() {
          let currentScroll = column.scrollTop + scrollDirection;
          let maxScroll = column.scrollHeight - column.clientHeight;
  
          // Check for scrolling direction and apply seamless looping logic
          if (scrollDirection > 0 && currentScroll >= maxScroll / 2) {
            // Downwards: When reaching the middle, reset to the top.
            column.scrollTop = 0;
          } else if (scrollDirection < 0 && currentScroll <= 0) {
            // Upwards: If attempting to scroll above the top, reset to the middle.
            column.scrollTop = maxScroll / 2;
          } else {
            column.scrollTop = currentScroll;
          }
  
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        requestAnimationFrame(scroll);
  
        // Handling hover to pause and resume
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
        duplicateRowContent(row);
        let direction = index % 2 === 0 ? -1 : 1;
  
        function scrollRow() {
          row.scrollLeft += direction * scrollStep;
  
          if (direction === 1 && row.scrollLeft >= (row.scrollWidth / 2)) {
            row.scrollLeft = 0;
          } else if (direction === -1 && row.scrollLeft <= 0) {
            row.scrollLeft = (row.scrollWidth / 2);
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        requestAnimationFrame(scrollRow);
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => row.isPaused = false);
      });
    }
  
    function duplicateColumnContent(column) {
      column.innerHTML += column.innerHTML; // Duplicate column content
    }
  
    function duplicateRowContent(row) {
      row.innerHTML += row.innerHTML;
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