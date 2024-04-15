document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 60));
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    // Adjusted seamless looping for desktop with alternating scroll directions
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        duplicateContent(column);
  
        // Calculate looping boundary based on actual content height
        const originalHeight = column.scrollHeight;
        const maxScroll = originalHeight / 2;
  
        let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;
  
        function scroll() {
          column.scrollTop += scrollDirection;
  
          if (scrollDirection > 0 && column.scrollTop >= maxScroll) {
            column.scrollTop = 0;
          } else if (scrollDirection < 0 && column.scrollTop <= 0) {
            column.scrollTop = maxScroll - column.clientHeight;
          }
  
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        // Add comments explaining scroll logic
        // ... explain each step's purpose ...
  
        requestAnimationFrame(scroll);
  
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll);
        });
      });
    }
  
    // Mobile rows' scrolling logic (unchanged)
    function autoScrollRows(rows) {
      // ... existing code for mobile rows ...
    }
  
    // Apply scrolling based on device type
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      autoScrollColumns(columns);
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      autoScrollRows(rows);
    }
  });
  