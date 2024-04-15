document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));
  
    function autoScrollColumns(columns) {
      columns.forEach((column, index) => {
        let direction = (index % 2 === 0) ? -scrollStep : scrollStep;
  
        function scrollColumn() {
          let currentScroll = column.scrollTop + direction;
          let maxScroll = column.scrollHeight - column.clientHeight;
  
          if (direction > 0 && currentScroll >= maxScroll) {
            direction = -scrollStep;
          } else if (direction < 0 && currentScroll <= 0) {
            direction = scrollStep;
          }
  
          column.scrollTop += direction;
          if (!column.isPaused) requestAnimationFrame(scrollColumn);
        }
  
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scrollColumn);
        });
  
        requestAnimationFrame(scrollColumn);
      });
    }
  
    function autoScrollRows(rows) {
      rows.forEach((row, index) => {
        duplicateRowContent(row);
        let direction = (index % 2 === 0) ? -scrollStep : scrollStep;
  
        function scrollRow() {
          row.scrollLeft += direction;
  
          if ((direction < 0 && row.scrollLeft <= 0) ||
              (direction > 0 && row.scrollLeft >= row.scrollWidth / 2)) {
            direction = -direction;
          }
  
          if (!row.isPaused) requestAnimationFrame(scrollRow);
        }
  
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => {
          row.isPaused = false;
          requestAnimationFrame(scrollRow);
        });
  
        requestAnimationFrame(scrollRow);
      });
    }
  
    function duplicateRowContent(row) {
      row.innerHTML += row.innerHTML;
    }
  
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      autoScrollColumns(columns);
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      autoScrollRows(rows);
    }
  });
  