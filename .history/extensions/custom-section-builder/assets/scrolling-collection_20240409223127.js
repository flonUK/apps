document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to auto-scroll columns
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      let scrollDirection = index % 2 === 0 ? 1 : -1; // Alternate direction based on column index
      
      function scroll() {
        if (scrollAmount <= 0 || scrollAmount >= column.scrollHeight - column.clientHeight) {
          scrollDirection *= -1; // Change direction at the extremes
        }
        scrollAmount += scrollStep * scrollDirection;
        column.scrollTop = scrollAmount;
        requestAnimationFrame(scroll);
      }

      column.addEventListener('mouseenter', function() {
        scrollDirection = 0; // Stop scrolling on hover
      });

      column.addEventListener('mouseleave', function() {
        scrollDirection = index % 2 === 0 ? 1 : -1; // Resume scrolling on mouse leave
        requestAnimationFrame(scroll);
      });

      requestAnimationFrame(scroll); // Start scrolling
    });
  }

  // Function to duplicate row content for mobile
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML; // Duplicate the inner HTML to create an illusion of infinite scroll
  }

  // Function to auto-scroll rows for mobile
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      let scrollLeft = 0;
      let scrollDirection = index % 2 === 0 ? 1 : -1; // Alternate direction based on row index
      
      duplicateRowContent(row); // Duplicate the row content for a seamless transition

      function scroll() {
        if (scrollLeft <= 0 || scrollLeft >= row.scrollWidth - row.clientWidth) {
          scrollDirection *= -1; // Change direction at the extremes
        }
        scrollLeft += scrollStep * scrollDirection;
        row.scrollLeft = scrollLeft;
        requestAnimationFrame(scroll);
      }

      row.addEventListener('touchstart', function() {
        scrollDirection = 0; // Stop scrolling on touch
      });

      row.addEventListener('touchend', function() {
        scrollDirection = index % 2 === 0 ? 1 : -1; // Resume scrolling after touch
        requestAnimationFrame(scroll);
      });

      requestAnimationFrame(scroll); // Start scrolling
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
