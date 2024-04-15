document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column) => {
      let direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose an initial direction to add variety

      function scroll() {
        if (!column.isPaused) {
          let maxScroll = column.scrollHeight - column.clientHeight;
          column.scrollTop += direction * scrollStep;

          // Invert direction when reaching the end
          if (column.scrollTop >= maxScroll || column.scrollTop <= 0) {
            direction *= -1;
          }
        }
        requestAnimationFrame(scroll);
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
    rows.forEach((row) => {
      duplicateRowContent(row); // Ensure there's enough content for seamless looping

      let direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose an initial direction

      function scrollRow() {
        if (!row.isPaused) {
          row.scrollLeft += direction * scrollStep;

          // Detect when scrolling has reached approximately half of the scrollable content
          if (row.scrollLeft >= (row.scrollWidth / 2 - row.clientWidth) || row.scrollLeft <= 0) {
            duplicateRowContent(row); // Duplicate again to ensure continuous content
            row.scrollLeft = row.scrollWidth / 4; // Reset to middle
            direction *= -1; // Change direction
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
    // To ensure seamless content flow, content duplication is adjusted to accommodate direction inversion
    let originalContent = row.innerHTML;
    row.innerHTML = originalContent + originalContent; // Double the content
  }

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
