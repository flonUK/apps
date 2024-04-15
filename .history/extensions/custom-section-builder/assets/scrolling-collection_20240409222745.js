document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to auto-scroll columns on desktop
  function autoScrollDesktopColumns() {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      let autoScrollingUp = true;

      function autoScrollColumn() {
        const maxScrollTop = column.scrollHeight - column.clientHeight;

        if (scrollAmount >= maxScrollTop || scrollAmount <= 0) {
          autoScrollingUp = !autoScrollingUp; // Change the scroll direction when reaching the end or start
        }

        scrollAmount += autoScrollingUp ? scrollStep : -scrollStep;
        column.scrollTop = scrollAmount;

        // Request the next animation frame and continue scrolling
        requestAnimationFrame(autoScrollColumn);
      }

      // Initial call to start the scrolling
      autoScrollColumn();

      // Event listeners for pausing and resuming scrolling on hover
      column.addEventListener('mouseenter', function() {
        cancelAnimationFrame(autoScrollColumn);
      });

      column.addEventListener('mouseleave', function() {
        requestAnimationFrame(autoScrollColumn);
      });
    });
  }

  // Function to auto-scroll rows on mobile
  function autoScrollMobileRows() {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    rows.forEach((row, index) => {
      let autoScrollingRight = index % 2 === 0; // Alternate the direction for each row

      function autoScrollRow() {
        if ((autoScrollingRight && row.scrollLeft >= (row.scrollWidth / 2)) || 
            (!autoScrollingRight && row.scrollLeft <= 0)) {
          autoScrollingRight = !autoScrollingRight; // Change the scroll direction at the ends
        }

        row.scrollLeft += autoScrollingRight ? scrollStep : -scrollStep;

        // Request the next animation frame and continue scrolling
        requestAnimationFrame(autoScrollRow);
      }

      // Duplicate the content for a seamless loop
      row.innerHTML += row.innerHTML;

      // Initial call to start the scrolling
      autoScrollRow();

      // Event listeners for pausing and resuming scrolling on touch
      row.addEventListener('touchstart', function() {
        cancelAnimationFrame(autoScrollRow);
      });

      row.addEventListener('touchend', function() {
        requestAnimationFrame(autoScrollRow);
      });
    });
  }

  // Decide whether to run desktop or mobile functions based on screen width
  if (isDesktop) {
    autoScrollDesktopColumns();
  } else {
    autoScrollMobileRows();
  }
});
