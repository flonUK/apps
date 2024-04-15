document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let direction = index % 2 === 0 ? -scrollStep : scrollStep; // Alternating initial directions

      function scroll() {
        let nextScrollPos = column.scrollTop + direction;
        let maxScroll = column.scrollHeight - column.clientHeight;

        // Invert direction at bounds and slightly adjust to avoid instant inversion
        if (nextScrollPos >= maxScroll || nextScrollPos <= 0) {
          direction *= -1;
          nextScrollPos += direction * 2; // Adjust to ensure smooth inversion
        }
        
        column.scrollTop = nextScrollPos;

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
      duplicateRowContent(row); // Duplicate for a seamless loop
      let direction = index % 2 === 0 ? -scrollStep : scrollStep; // Alternating initial directions

      function scrollRow() {
        // Consider the duplicated content for seamless looping
        if ((direction < 0 && row.scrollLeft <= 0) ||
            (direction > 0 && row.scrollLeft >= row.scrollWidth / 2)) {
          direction *= -1; // Invert direction
        }
        
        row.scrollLeft += direction;

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
    // Ensure enough content for a smooth loop
    row.innerHTML += row.innerHTML;
  }

  // Apply specific scrolling behavior based on device
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
