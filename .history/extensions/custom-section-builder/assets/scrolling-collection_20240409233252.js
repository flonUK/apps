document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;

      function scroll() {
        let maxScroll = column.scrollHeight - column.clientHeight;
        column.scrollTop += scrollDirection;

        // Invert direction when reaching the bounds
        if (column.scrollTop >= maxScroll) {
          scrollDirection = -scrollStep; // Change direction to upwards
        } else if (column.scrollTop <= 0) {
          scrollDirection = scrollStep; // Change direction to downwards
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

  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      duplicateRowContent(row); // Ensure there's enough content
      let direction = index % 2 === 0 ? -1 : 1; // Alternate direction based on row index

      function scrollRow() {
        row.scrollLeft += direction * scrollStep;

        // Implement seamless looping by resetting the scroll position
        if ((direction === 1 && row.scrollLeft >= row.scrollWidth / 2 - row.offsetWidth) || 
            (direction === -1 && row.scrollLeft <= 0)) {
          // Invert direction at the bounds
          direction *= -1;
        }

        if (!row.isPaused) requestAnimationFrame(scrollRow);
      }

      requestAnimationFrame(scrollRow);

      row.addEventListener('touchstart', () => row.isPaused = true);
      row.addEventListener('touchend', () => {
        row.isPaused = false;
        requestAnimationFrame(scrollRow);
      });
    });
  }

  function duplicateRowContent(row) {
    // Double the content for seamless looping
    row.innerHTML += row.innerHTML;
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
