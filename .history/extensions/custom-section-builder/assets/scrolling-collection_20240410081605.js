document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      // Alternating initial directions: index 0 (left column) scrolls up, index 1 (right column) scrolls down
      let direction = index % 2 === 0 ? -scrollStep : scrollStep;

      function scroll() {
        let nextScrollPos = column.scrollTop + direction;
        let maxScroll = column.scrollHeight - column.clientHeight;

        // Invert direction at bounds
        if (nextScrollPos >= maxScroll || nextScrollPos <= 0) {
          direction = -direction; // Invert the scroll direction
          // Adjust next position after inversion to prevent sticking at bounds
          nextScrollPos = column.scrollTop + direction;
        }

        column.scrollTop = nextScrollPos;

        if (!column.isPaused) {
          requestAnimationFrame(scroll);
        }
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
      duplicateRowContent(row); // Duplicate content for seamless looping
      // Alternating initial directions: index 0 (top row) scrolls left, index 1 (bottom row) scrolls right
      let direction = index % 2 === 0 ? -scrollStep : scrollStep;

      function scrollRow() {
        // Inversion logic based on scroll position and duplicated content
        if ((direction > 0 && row.scrollLeft >= (row.scrollWidth / 2 - row.clientWidth)) ||
            (direction < 0 && row.scrollLeft <= 0)) {
          direction = -direction; // Invert direction
          row.scrollLeft += direction; // Adjust position slightly after direction change
        } else {
          row.scrollLeft += direction;
        }

        if (!row.isPaused) {
          requestAnimationFrame(scrollRow);
        }
      }

      requestAnimationFrame(scrollRow);

      row.addEventListener('touchstart', () => row.isPaused = true);
      row.addEventListener('touchend', () => {
        row.isPaused = false;
        requestAnimationFrame(scrollRow);
      });
    });
  }

  // Function to duplicate row content for a smooth looping effect
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML;
  }

  // Apply specific behavior based on device type
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
