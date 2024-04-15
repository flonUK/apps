document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to auto-scroll columns
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      let scrollingUp = index % 2 === 0; // Alternate scroll direction based on even/odd index

      function scrollColumn() {
        if (scrollAmount <= 0 || scrollAmount >= column.scrollHeight - column.clientHeight) {
          scrollingUp = !scrollingUp; // Change direction at the extremes
        }
        scrollAmount += scrollingUp ? scrollStep : -scrollStep;
        column.scrollTop = scrollAmount;
        requestAnimationFrame(scrollColumn);
      }

      column.addEventListener('mouseenter', function() {
        scrollingUp = false; // Pause scrolling on hover
      });

      column.addEventListener('mouseleave', function() {
        scrollingUp = index % 2 === 0; // Resume the initial scrolling direction
        requestAnimationFrame(scrollColumn);
      });

      requestAnimationFrame(scrollColumn); // Start scrolling
    });
  }

  // Function to duplicate row content for mobile
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML; // Duplicate the inner HTML to create an illusion of infinite scroll
  }

  // Function to auto-scroll rows for mobile
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      let scrollDirection = index % 2 === 0 ? scrollStep : -scrollStep; // Alternate direction based on index
      
      duplicateRowContent(row); // Duplicate the row content for a seamless transition

      function scrollRow() {
        if (row.scrollLeft <= 0 || row.scrollLeft >= row.scrollWidth / 2) {
          scrollDirection = -scrollDirection; // Change direction at the extremes
        }
        row.scrollLeft += scrollDirection;
        requestAnimationFrame(scrollRow);
      }

      row.addEventListener('touchstart', function() {
        scrollDirection = 0; // Stop scrolling on touch
      });

      row.addEventListener('touchend', function() {
        scrollDirection = index % 2 === 0 ? scrollStep : -scrollStep; // Resume the initial scrolling direction
        requestAnimationFrame(scrollRow);
      });

      requestAnimationFrame(scrollRow); // Start scrolling
    });
  }

  // Execute the appropriate function based on the device
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
