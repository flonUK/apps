document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  // Retrieve the scroll speed from the data attribute
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  // Map scroll speed (1 to 10) to duration (2000ms to 200ms) for smoother scrolling
  const duration = Math.max(2000 - (scrollSpeed * 180), 200);

  // Function to duplicate content for seamless looping
  function duplicateContent(container) {
    const content = container.innerHTML;
    container.innerHTML += content;
  }

  // Function to auto-scroll desktop columns
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = 0;
      const maxScroll = column.scrollHeight - column.clientHeight;
      let requestId;

      function autoScroll() {
        if (index % 2 === 0) {
          scrollAmount += column.clientHeight;
          if (scrollAmount >= maxScroll) {
            scrollAmount = 0; // Reset scroll to the beginning
          }
        } else {
          scrollAmount -= column.clientHeight;
          if (scrollAmount <= 0) {
            scrollAmount = maxScroll; // Reset scroll to the end
          }
        }
        column.style.transform = `translateY(-${scrollAmount}px)`;
        requestId = setTimeout(autoScroll, duration);
      }

      function startAutoScroll() {
        requestId = setTimeout(autoScroll, duration);
      }

      function stopAutoScroll() {
        clearTimeout(requestId);
      }

      startAutoScroll(); // Start the auto-scroll

      // Pause auto-scroll on hover and allow for manual scrolling
      column.addEventListener('mouseenter', () => {
        stopAutoScroll();
      });
      column.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
    });
  }

  if (isDesktop) {
    // Select all desktop columns
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    // Duplicate content for each column
    columns.forEach(column => {
      duplicateContent(column);
    });
    // Start the auto-scroll for desktop columns
    autoScrollColumns(columns);
  } else {
    // Mobile scroll logic (remains the same as before)
    // ...
  }
});