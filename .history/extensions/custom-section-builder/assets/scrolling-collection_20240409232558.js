document.addEventListener('DOMContentLoaded', function() {
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Auto-scroll columns with initial opposite directions and inversion
  const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
  columns.forEach((column, index) => {
    let direction = index % 2 === 0 ? -scrollStep : scrollStep; // Left column up, right column down initially

    function scrollColumn() {
      let maxScroll = column.scrollHeight - column.clientHeight;
      column.scrollTop += direction;

      if (column.scrollTop >= maxScroll || column.scrollTop <= 0) {
        direction = -direction; // Invert direction at bounds
      }

      if (!column.isPaused) requestAnimationFrame(scrollColumn);
    }

    column.addEventListener('mouseenter', () => column.isPaused = true);
    column.addEventListener('mouseleave', () => {
      column.isPaused = false;
      requestAnimationFrame(scrollColumn);
    });

    requestAnimationFrame(scrollColumn);
  });

  // Auto-scroll rows with initial opposite directions and inversion
  const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
  rows.forEach((row, index) => {
    duplicateRowContent(row); // Ensure enough content for seamless looping
    let direction = index % 2 === 0 ? -1 : 1; // Top row left, bottom row right initially

    function scrollRow() {
      if (!row.isPaused) {
        row.scrollLeft += direction * scrollStep;

        // Implement seamless looping logic here for rows
        if (row.scrollLeft >= (row.scrollWidth / 2 - row.clientWidth) || row.scrollLeft <= 0) {
          direction = -direction; // Invert direction
        }
      }

      requestAnimationFrame(scrollRow);
    }

    row.addEventListener('touchstart', () => row.isPaused = true);
    row.addEventListener('touchend', () => {
      row.isPaused = false;
      requestAnimationFrame(scrollRow);
    });

    requestAnimationFrame(scrollRow);
  });

  function duplicateRowContent(row) {
    // This ensures there's always enough content to scroll smoothly
    row.innerHTML += row.innerHTML;
  }
});
