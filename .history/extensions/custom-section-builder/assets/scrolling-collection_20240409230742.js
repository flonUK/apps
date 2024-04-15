document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Auto-scroll columns for desktop
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep; // Alternate initial scroll direction

      function scroll() {
        let maxScroll = column.scrollHeight - column.clientHeight;
        let scrollAmount = column.scrollTop + scrollDirection;

        if (scrollAmount >= maxScroll || scrollAmount <= 0) {
          scrollDirection = -scrollDirection; // Invert direction at bounds
        }

        column.scrollTop += scrollDirection;
        requestAnimationFrame(scroll);
      }

      requestAnimationFrame(scroll);

      column.addEventListener('mouseenter', () => column.isPaused = true);
      column.addEventListener('mouseleave', () => column.isPaused = false);
    });
  }

  // Auto-scroll rows for mobile
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      duplicateRowContent(row); // Duplicate for seamless looping
      let direction = index % 2 === 0 ? 1 : -1; // Invert initial direction for bottom row

      function scrollRow() {
        if (!row.isPaused) {
          row.scrollLeft += direction * scrollStep;

          // Adjust for seamless looping
          if (direction === 1 && row.scrollLeft >= row.scrollWidth / 2) {
            row.scrollLeft = 0;
          } else if (direction === -1 && row.scrollLeft <= 0) {
            row.scrollLeft = row.scrollWidth / 2;
          }
        }
        
        requestAnimationFrame(scrollRow);
      }

      requestAnimationFrame(scrollRow);

      row.addEventListener('touchstart', () => row.isPaused = true);
      row.addEventListener('touchend', () => row.isPaused = false);
    });
  }

  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML; // Double the content for a continuous scroll effect
  }

  // Apply the scrolling based on device type
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
