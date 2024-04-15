document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function invertDirectionAtBounds(element, direction, maxScroll) {
    if (element.scrollTop >= maxScroll && direction > 0) {
      return -1; // Change direction to upwards
    } else if (element.scrollTop <= 0 && direction < 0) {
      return 1; // Change direction to downwards
    }
    return direction; // Keep the direction unchanged
  }

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      // Set initial direction: left column up, right column down
      let direction = index % 2 === 0 ? -1 : 1;

      function scroll() {
        let currentScroll = column.scrollTop + (scrollStep * direction);
        let maxScroll = column.scrollHeight - column.clientHeight;

        // Adjust direction based on current position
        direction = invertDirectionAtBounds(column, direction, maxScroll);
        column.scrollTop += scrollStep * direction;

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
      // Ensure duplicated content for a seamless loop
      duplicateRowContent(row);
      // Set initial direction: top row left, bottom row right
      let direction = index % 2 === 0 ? -1 : 1;

      function scrollRow() {
        // Apply scrolling based on the direction and speed
        row.scrollLeft += direction * scrollStep;

        // Check for inversion conditions
        if ((direction === 1 && row.scrollLeft >= (row.scrollWidth / 2)) || 
            (direction === -1 && row.scrollLeft <= 0)) {
          direction *= -1; // Invert the direction
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
    row.innerHTML += row.innerHTML; // Duplicate the content for seamless looping
  }

  // Initialize scrolling based on the device type
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
