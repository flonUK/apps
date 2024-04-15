document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  // Retrieve the scroll speed from the data attribute
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  // Map scroll speed (1 to 20) to interval delay (100 to 5 ms) for more noticeable speed differences
  const mappedDelay = Math.max(100 - (scrollSpeed * 5), 5);
  // Adjust scroll step based on scroll speed for smoothness
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Function to duplicate content for seamless looping
  function duplicateContent(container) {
    const content = container.innerHTML;
    container.innerHTML += content;
  }

  // Function to auto-scroll desktop columns
  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = column.scrollTop;
      const maxScroll = column.scrollHeight - column.clientHeight;
      let requestId;

      function autoScroll() {
        if (index % 2 === 0) {
          scrollAmount += scrollStep;
          if (scrollAmount >= maxScroll) {
            scrollAmount = 0; // Reset scroll to the beginning
          }
        } else {
          scrollAmount -= scrollStep;
          if (scrollAmount <= 0) {
            scrollAmount = maxScroll; // Reset scroll to the end
          }
        }
        column.scrollTop = scrollAmount;
        requestId = requestAnimationFrame(autoScroll);
      }

      function startAutoScroll() {
        requestId = requestAnimationFrame(autoScroll);
      }

      function stopAutoScroll() {
        cancelAnimationFrame(requestId);
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
    // Mobile scroll logic
    const topRow = document.querySelector('.adedayo-scrolling-collection-grid-products-row:nth-child(1)');
    const bottomRow = document.querySelector('.adedayo-scrolling-collection-grid-products-row:nth-child(2)');

    // Duplicate content for each row
    duplicateContent(topRow);
    duplicateContent(bottomRow);

    let topRowRequestId, bottomRowRequestId;

    function autoScrollLeft(row) {
      row.scrollLeft += scrollStep;
      if (row.scrollLeft >= row.scrollWidth / 2) {
        row.scrollLeft = 0; // Reset to start for seamless loop
      }
      topRowRequestId = requestAnimationFrame(() => autoScrollLeft(row));
    }

    function autoScrollRight(row) {
      row.scrollLeft -= scrollStep;
      if (row.scrollLeft <= 0) {
        row.scrollLeft = row.scrollWidth / 2; // Adjust to align right for seamless loop
      }
      bottomRowRequestId = requestAnimationFrame(() => autoScrollRight(row));
    }

    function startScrolling() {
      topRowRequestId = requestAnimationFrame(() => autoScrollLeft(topRow));
      bottomRowRequestId = requestAnimationFrame(() => autoScrollRight(bottomRow));
    }

    function stopScrolling() {
      cancelAnimationFrame(topRowRequestId);
      cancelAnimationFrame(bottomRowRequestId);
    }

    // Pause auto-scroll on hover and allow for manual scrolling
    [topRow, bottomRow].forEach(row => {
      row.addEventListener('mouseenter', () => {
        stopScrolling(); // Stop auto-scroll
      });
      row.addEventListener('mouseleave', () => {
        startScrolling(); // Resume auto-scroll
      });
    });

    startScrolling();
  }
});
