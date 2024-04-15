document.addEventListener('DOMContentLoaded', function() {
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Columns: Set initial directions and manage inversion
  const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
  columns.forEach((column, index) => {
    // Set initial direction: left column upwards (-), right column downwards (+)
    let direction = index === 0 ? -scrollStep : scrollStep;

    function scrollColumn() {
      let newScrollPosition = column.scrollTop + direction;
      let maxScroll = column.scrollHeight - column.clientHeight;

      // Check bounds and invert direction
      if (newScrollPosition <= 0 || newScrollPosition >= maxScroll) {
        direction = -direction; // Invert direction
        newScrollPosition += direction; // Apply new direction immediately
      }

      column.scrollTop = newScrollPosition;

      if (!column.isPaused) requestAnimationFrame(scrollColumn);
    }

    column.addEventListener('mouseenter', () => column.isPaused = true);
    column.addEventListener('mouseleave', () => {
      column.isPaused = false;
      requestAnimationFrame(scrollColumn);
    });

    requestAnimationFrame(scrollColumn);
  });

  // Rows: Set initial directions and manage inversion
  const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
  rows.forEach((row, index) => {
    duplicateRowContent(row); // Prepare content for looping

    // Set initial direction: top row to the left (-), bottom row to the right (+)
    let direction = index === 0 ? -1 : 1;

    function scrollRow() {
      row.scrollLeft += direction * scrollStep;

      // Check if the end of the scrollable content is reached
      if ((direction === 1 && row.scrollLeft >= row.scrollWidth - row.offsetWidth) ||
          (direction === -1 && row.scrollLeft <= 0)) {
        direction = -direction; // Invert direction
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

  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML + row.innerHTML; // Triple the content to ensure smooth looping
  }
});
