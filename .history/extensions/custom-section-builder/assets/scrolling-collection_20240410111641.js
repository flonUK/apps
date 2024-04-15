document.addEventListener('DOMContentLoaded', function() {
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));
  
    // Adjusted approach for seamless looping and direction inversion
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep; // Alternating directions
        let inversionPointReached = false;
  
        function scroll() {
          let currentScroll = column.scrollTop + scrollDirection;
          let maxScroll = column.scrollHeight - column.clientHeight;
  
          // Invert direction when reaching the end
          if (!inversionPointReached && (currentScroll >= maxScroll || currentScroll <= 0)) {
            scrollDirection = -scrollDirection;
            inversionPointReached = true; // Prevent continuous inversion
          } else if (inversionPointReached && (currentScroll <= maxScroll && currentScroll >= 0)) {
            inversionPointReached = false; // Reset inversion check when back in range
          }
  
          column.scrollTop += scrollDirection;
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll); // Resume scrolling
        });
  
        requestAnimationFrame(scroll);
      });
    }
  
    // Mobile rows scrolling logic, similar to columns but adjusted for horizontal scrolling
    function autoScrollRows(rows) {
      rows.forEach((row, index) => {
        duplicateRowContent(row);
        let direction = index % 2 === 0 ? -1 : 1; // Alternating directions
        let inversionPointReached = false;
  
        function scrollRow() {
          row.scrollLeft += direction * scrollStep;
  
          // Invert direction when reaching the end of duplicated content
          if (!inversionPointReached && ((direction === 1 && row.scrollLeft >= row.scrollWidth / 2) ||
              (direction === -1 && row.scrollLeft <= 0))) {
            direction *= -1;
            inversionPointReached = true;
          } else if (inversionPointReached && ((direction === -1 && row.scrollLeft < row.scrollWidth / 2) ||
                     (direction === 1 && row.scrollLeft > 0))) {
            inversionPointReached = false;
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => {
          row.isPaused = false;
          requestAnimationFrame(scrollRow); // Resume scrolling
        });
  
        requestAnimationFrame(scrollRow);
      });
    }
  
    function duplicateRowContent(row) {
      row.innerHTML += row.innerHTML; // Duplicate content for a seamless loop
    }
  
    if (window.innerWidth >= 768) { // Apply specific behavior based on device type
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      autoScrollColumns(columns);
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      autoScrollRows(rows);
    }
  });
  