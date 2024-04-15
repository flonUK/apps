document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  // Adjust scroll step for a smooth scrolling animation
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      // Determine the scrolling direction based on column index
      let scrollDirection = index % 2 === 0 ? scrollStep : -scrollStep;

      function scroll() {
        const maxScroll = column.scrollHeight - column.clientHeight;
        scrollAmount += scrollDirection;

        // Reverse direction at bounds
        if (scrollAmount >= maxScroll || scrollAmount <= 0) {
          scrollDirection = -scrollDirection;
          scrollAmount += scrollDirection; // Apply immediate direction change
        }

        column.scrollTop = scrollAmount;
        column._scrollAnimationId = requestAnimationFrame(scroll);
      }

      // Start scrolling
      scroll();

      // Event listeners for pausing and resuming scrolling on hover
      column.addEventListener('mouseenter', () => cancelAnimationFrame(column._scrollAnimationId));
      column.addEventListener('mouseleave', () => requestAnimationFrame(scroll));
    });
  }

  function autoScrollRows(rows) {
    rows.forEach(row => {
      duplicateRowContent(row); // Ensure there's enough content to scroll

      let direction = 1; // Initial scroll direction to the right
      function scrollRow() {
        if ((direction === 1 && row.scrollLeft >= (row.scrollWidth / 2 - row.clientWidth)) ||
            (direction === -1 && row.scrollLeft <= 0)) {
          // Reset scroll position for seamless looping
          row.scrollLeft += direction === 1 ? -row.scrollWidth / 4 : row.scrollWidth / 4;
        }

        row.scrollLeft += direction * scrollStep;
        row._scrollAnimationId = requestAnimationFrame(scrollRow);
      }

      // Start scrolling
      scrollRow();

      // Pause and resume on touch events to mimic hover behavior
      row.addEventListener('touchstart', () => cancelAnimationFrame(row._scrollAnimationId));
      row.addEventListener('touchend', () => requestAnimationFrame(scrollRow));
    });
  }

  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML;
  }
});
