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
        console.log(`Scrolling column ${index}: ${scrollingUp ? 'up' : 'down'}`); // Debug log
        const maxScroll = column.scrollHeight - column.offsetHeight;
        if (scrollAmount >= maxScroll) {
          scrollingUp = true;
          scrollAmount = maxScroll; // Ensure the scrollAmount does not exceed maxScroll
        } else if (scrollAmount <= 0) {
          scrollingUp = false;
          scrollAmount = 0; // Ensure the scrollAmount does not go below 0
        }
        column.scrollTop = scrollingUp ? scrollAmount -= scrollStep : scrollAmount += scrollStep;
        column.scrollRequestId = requestAnimationFrame(scrollColumn);
      }

      column.scrollRequestId = requestAnimationFrame(scrollColumn); // Start scrolling

      column.addEventListener('mouseenter', function() {
        cancelAnimationFrame(column.scrollRequestId); // Pause scrolling on hover
        console.log(`Mouse enter, paused scrolling column ${index}`); // Debug log
      });

      column.addEventListener('mouseleave', function() {
        console.log(`Mouse leave, resumed scrolling column ${index}`); // Debug log
        column.scrollRequestId = requestAnimationFrame(scrollColumn); // Resume scrolling
      });
    });
  }

  // Function to duplicate row content for a seamless loop on mobile
  function duplicateRowContent(row) {
    row.innerHTML += row.innerHTML;
  }

  // Function to auto-scroll rows on mobile
  function autoScrollRows(rows) {
    rows.forEach((row, index) => {
      let scrollDirection = index % 2 === 0 ? scrollStep : -scrollStep; // Alternate direction
      
      duplicateRowContent(row); // Duplicate the row content

      function scrollRow() {
        console.log(`Scrolling row ${index}: ${scrollDirection > 0 ? 'left' : 'right'}`); // Debug log
        row.scrollLeft += scrollDirection;
        row.scrollRequestId = requestAnimationFrame(scrollRow);
      }

      row.scrollRequestId = requestAnimationFrame(scrollRow); // Start scrolling

      row.addEventListener('touchstart', function() {
        cancelAnimationFrame(row.scrollRequestId); // Stop scrolling on touch
        console.log(`Touch start, paused scrolling row ${index}`); // Debug log
      });

      row.addEventListener('touchend', function() {
        console.log(`Touch end, resumed scrolling row ${index}`); // Debug log
        row.scrollRequestId = requestAnimationFrame(scrollRow); // Resume scrolling
      });
    });
  }

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScrollRows(rows);
  }
});
