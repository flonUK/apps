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
        let maxScroll = column.scrollHeight / 2;
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
  
        requestAnimationFrame(scroll);
  
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll);
        });
      });
    }
  
    // Mobile rows' scrolling logic
    function autoScrollRows(rows) {
      rows.forEach((row, index) => {
        duplicateContent(row);
        let direction = index % 2 === 0 ? -1 : 1;
        let maxScrollLeft = row.scrollWidth / 2;
  
        function scrollRow() {
          row.scrollLeft += direction * scrollStep;
          
          if (direction === 1 && row.scrollLeft >= maxScrollLeft) {
            row.scrollLeft = 0;
          } else if (direction === -1 && row.scrollLeft <= 0) {
            row.scrollLeft = maxScrollLeft;
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        requestAnimationFrame(scrollRow);
  
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => row.isPaused = false);
      });
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
  