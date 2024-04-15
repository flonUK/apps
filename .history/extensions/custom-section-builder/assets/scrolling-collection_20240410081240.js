document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to automatically scroll columns in opposite directions and invert at ends
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let direction = index % 2 === 0 ? -1 : 1; // Set initial direction based on index
      direction *= scrollStep; // Apply the scroll step magnitude

      function scroll() {
        let nextScrollPos = column.scrollTop + direction;
        let maxScroll = column.scrollHeight - column.clientHeight;

        // Invert direction at the bounds
        if (nextScrollPos >= maxScroll || nextScrollPos <= 0) {
          direction = -direction; // Invert direction
        }

        column.scrollTop += direction;
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

  // Function to automatically scroll rows in opposite directions and invert at ends
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      duplicateRowContent(row); // Make sure there's enough content for a seamless loop
      let direction = index % 2 === 0 ? -1 : 1; // Set initial direction based on index
      direction *= scrollStep; // Apply the scroll step magnitude

      function scrollRow() {
        // Adjust for seamless looping
        if ((direction > 0 && row.scrollLeft >= row.scrollWidth / 2 - row.clientWidth) ||
            (direction < 0 && row.scrollLeft <= 0)) {
          direction = -direction; // Invert direction
        }

        row.scrollLeft += direction;
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

  // Duplicate content for seamless looping in rows
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML;
  }

  // Apply auto-scroll to columns on desktop and rows on mobile
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
