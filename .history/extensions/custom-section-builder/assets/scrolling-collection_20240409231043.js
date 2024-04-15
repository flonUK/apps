document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      // Alternate initial direction; left column goes up, right goes down.
      let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;
      
      function scroll() {
        let maxScroll = column.scrollHeight - column.clientHeight;
        column.scrollTop += scrollDirection;

        if (column.scrollTop >= maxScroll) {
          column.scrollTop = 0; // Reset to top for seamless loop
        } else if (column.scrollTop <= 0) {
          column.scrollTop = maxScroll; // Reset to bottom if it goes too high (only applicable for upwards movement)
        }

        if (!column.isPaused) requestAnimationFrame(scroll);
      }

      requestAnimationFrame(scroll);

      column.addEventListener('mouseenter', () => column.isPaused = true);
      column.addEventListener('mouseleave', () => column.isPaused = false);
    });
  }

  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      duplicateRowContent(row); // Ensure there's enough content for seamless looping
      // Direct top row to the left and bottom row to the right initially.
      let direction = index % 2 === 0 ? -1 : 1;
      
      function scrollRow() {
        row.scrollLeft += direction * scrollStep;
        
        // Implement seamless looping for each row.
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
    row.innerHTML += row.innerHTML; // Duplicate the content to enable seamless looping
  }

  // Initialize scrolling based on device type
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
