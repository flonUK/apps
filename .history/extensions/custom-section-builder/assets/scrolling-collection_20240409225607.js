document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to auto-scroll columns on desktop
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      let scrollingUp = index % 2 === 0; // Alternate direction based on even/odd index

      function scrollColumn() {
        const maxScroll = column.scrollHeight - column.clientHeight;
        if (scrollAmount >= maxScroll || scrollAmount <= 0) {
          scrollingUp = !scrollingUp; // Change direction at the extremes
        }
        scrollAmount += scrollingUp ? -scrollStep : scrollStep; // Note the inversion of the ternary operation
        column.scrollTop = scrollAmount;
        column.scrollRequestId = requestAnimationFrame(scrollColumn);
      }

      column.scrollRequestId = requestAnimationFrame(scrollColumn); // Start scrolling
    });
  }

  // Function to duplicate row content for a seamless loop on mobile
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML; // Duplicate the inner HTML to create an illusion of infinite scroll
  }

  // Function to auto-scroll rows on mobile
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep; // Alternate direction based on even/odd index
      duplicateRowContent(row); // Duplicate the row content for a seamless transition

      function scrollRow() {
        if (row.scrollLeft <= 0 || row.scrollLeft >= row.scrollWidth / 2) {
          scrollDirection = -scrollDirection; // Change direction at the extremes
        }
        row.scrollLeft += scrollDirection;
        row.scrollRequestId = requestAnimationFrame(scrollRow);
      }

      row.scrollRequestId = requestAnimationFrame(scrollRow); // Start scrolling
    });
  }

  // Select and apply the appropriate auto-scroll based on device type
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
