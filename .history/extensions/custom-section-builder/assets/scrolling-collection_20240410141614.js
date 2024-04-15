document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 60));
  
    // Improved seamless looping for desktop
    function autoScrollColumns(columns) {
      columns.forEach((column) => {
        duplicateColumnContent(column); // Duplicate content for seamless looping
        let maxScroll = column.scrollHeight / 2; // Adjusted for duplicated content
  
        function scroll() {
          column.scrollTop += scrollStep;
  
          // Implement seamless looping by resetting scroll position before it's visually detectable
          if (column.scrollTop >= maxScroll) {
            column.scrollTop = 0;
          }
  
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        requestAnimationFrame(scroll);
  
        // Handling hover to pause and resume
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll); // Ensure scrolling resumes immediately
        });
      });
    }
  
    // Function to duplicate the content of a column for seamless looping
    function duplicateColumnContent(column) {
      column.innerHTML += column.innerHTML;
    }
  
    // Mobile rows' scrolling logic remains unchanged
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
  