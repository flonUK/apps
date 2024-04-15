document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollDirection = index % 2 === 0 ? scrollSpeed : -scrollSpeed; // Alternate directions for columns

      function scroll() {
        const maxScroll = column.scrollHeight - column.clientHeight;
        let nextScrollPos = column.scrollTop + scrollDirection;

        // Invert direction at bounds and adjust for smooth inversion
        if (nextScrollPos >= maxScroll || nextScrollPos <= 0) {
          scrollDirection *= -1;
          nextScrollPos += scrollDirection * 2;
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
      duplicateRowContent(row); // Ensure enough content for scrolling

      let scrollDirection = index % 2 === 0 ? -scrollSpeed : scrollSpeed; // Opposite direction for rows

      function scrollRow() {
        // Consider the duplicated content for seamless looping
        if ((scrollDirection < 0 && row.scrollLeft <= 0) ||
            (scrollDirection > 0 && row.scrollLeft >= row.scrollWidth / 2)) {
          // Invert direction for rows at visible edge (considering row width)
          scrollDirection *= -1;
        }

        row.scrollLeft += scrollDirection;
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
