document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to auto-scroll columns
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      let scrollingUp = index % 2 === 0; // Alternate direction based on even/odd index

      function scrollColumn() {
        if (scrollAmount <= 0 || scrollAmount >= column.scrollHeight - column.clientHeight) {
          scrollingUp = !scrollingUp; // Reverse direction at the extremes
        }
        scrollAmount += scrollingUp ? scrollStep : -scrollStep;
        column.scrollTop = scrollAmount;
      }

      // Initialize scrolling for each column
      function startScrolling() {
        scrollColumn();
        column.scrollRequestId = requestAnimationFrame(startScrolling);
      }

      // Start auto-scrolling immediately
      startScrolling();

      // Add event listeners for mouse interaction
      column.addEventListener('mouseenter', function() {
        cancelAnimationFrame(column.scrollRequestId); // Pause scrolling on hover
      });

      column.addEventListener('mouseleave', function() {
        startScrolling(); // Resume scrolling on mouse leave
      });
    });
  }

  // Select desktop columns and apply the auto-scroll
  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    // Mobile auto-scroll logic (unchanged)
    // ...
  }
});
