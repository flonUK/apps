document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));
  
    // Seamless scrolling loop for columns
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        const content = column.innerHTML;
        column.innerHTML = content + content + content; // Triplicate column content
        let scrollDirection = index % 2 === 0 ? -scrollStep : scrollStep;
        let scrollPosition = 0;
  
        function scroll() {
          scrollPosition += scrollDirection;
          column.style.transform = `translateY(${scrollPosition}px)`;
  
          // Reset scroll position when reaching the end or beginning
          if (scrollDirection > 0 && scrollPosition >= column.clientHeight) {
            scrollPosition = 0;
          } else if (scrollDirection < 0 && -scrollPosition >= column.clientHeight) {
            scrollPosition = -column.clientHeight;
          }
  
          if (!column.isPaused) requestAnimationFrame(scroll);
        }
  
        requestAnimationFrame(scroll);
  
        // Handling hover to pause and resume
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
        duplicateRowContent(row);
        let direction = index % 2 === 0 ? -1 : 1;
  
        function scrollRow() {
          row.scrollLeft += direction * scrollStep;
  
          if (direction === 1 && row.scrollLeft >= (row.scrollWidth / 2)) {
            row.scrollLeft = 0;
          } else if (direction === -1 && row.scrollLeft <= 0) {
            row.scrollLeft = (row.scrollWidth / 2);
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        requestAnimationFrame(scrollRow);
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => row.isPaused = false);
      });
    }
  
    function duplicateRowContent(row) {
      row.innerHTML += row.innerHTML;
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