document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      // Initial direction based on column index: left column up (-1), right column down (+1)
      let direction = index % 2 === 0 ? -1 : 1;

      function scroll() {
        let currentScroll = column.scrollTop + (direction * scrollStep);
        let maxScroll = column.scrollHeight - column.clientHeight;

        // Invert direction at the bounds
        if (currentScroll >= maxScroll) {
          direction = -1; // Invert to upwards
          column.scrollTop = maxScroll - 1; // Move a step back to ensure the inversion triggers correctly
        } else if (currentScroll <= 0) {
          direction = 1; // Invert to downwards
          column.scrollTop = 1; // Move a step forward to ensure the inversion triggers correctly
        } else {
          column.scrollTop = currentScroll;
        }

        if (!column.isPaused) requestAnimationFrame(scroll);
      }

      column.addEventListener('mouseenter', () => column.isPaused = true);
      column.addEventListener('mouseleave', () => {
        column.isPaused = false;
        requestAnimationFrame(scroll);
      });

      requestAnimationFrame(scroll);
    });
  }

  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      duplicateRowContent(row); // Duplicate the content for seamless looping
      // Initial direction based on row index: top row left (-1), bottom row right (+1)
      let direction = index % 2 === 0 ? -1 : 1;

      function scrollRow() {
        row.scrollLeft += direction * scrollStep;

        // Inversion logic for rows based on visible content
        if ((direction === 1 && row.scrollLeft >= (row.scrollWidth / 2 - row.clientWidth)) || 
            (direction === -1 && row.scrollLeft <= 0)) {
          direction *= -1; // Invert direction
        }

        if (!row.isPaused) requestAnimationFrame(scrollRow);
      }

      row.addEventListener('touchstart', () => row.isPaused = true);
      row.addEventListener('touchend', () => {
        row.isPaused = false;
        requestAnimationFrame(scrollRow);
      });

      requestAnimationFrame(scrollRow);
    });
  }

  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML;
  }

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
