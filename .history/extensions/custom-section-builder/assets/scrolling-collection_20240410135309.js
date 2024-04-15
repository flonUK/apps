document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));
    let isPaused = false;
  
    function autoScrollColumns(columns) {
      let direction = [scrollStep, -scrollStep];
  
      function scrollColumn(column, index) {
        if (!isPaused) {
          let currentScroll = column.scrollTop;
          let maxScroll = column.scrollHeight - column.clientHeight;
  
          if (direction[index] > 0 && currentScroll >= maxScroll) {
            direction[index] = -scrollStep;
          } else if (direction[index] < 0 && currentScroll <= 0) {
            direction[index] = scrollStep;
          }
  
          column.scrollTop += direction[index];
          requestAnimationFrame(() => scrollColumn(column, index));
        }
      }
  
      columns.forEach((column, index) => {
        column.addEventListener('mouseenter', () => {
          isPaused = true;
        });
        column.addEventListener('mouseleave', () => {
          isPaused = false;
          requestAnimationFrame(() => scrollColumn(column, index));
        });
        requestAnimationFrame(() => scrollColumn(column, index));
      });
    }
  
    function autoScrollRows(rows) {
      let direction = [scrollStep, -scrollStep];
  
      function scrollRow(row, index) {
        if (!isPaused) {
          let maxScroll = row.scrollWidth - row.clientWidth;
  
          if (direction[index] > 0 && row.scrollLeft >= maxScroll) {
            direction[index] = -scrollStep;
          } else if (direction[index] < 0 && row.scrollLeft <= 0) {
            direction[index] = scrollStep;
          }
  
          row.scrollLeft += direction[index];
          requestAnimationFrame(() => scrollRow(row, index));
        }
      }
  
      rows.forEach((row, index) => {
        row.addEventListener('touchstart', () => {
          isPaused = true;
        });
        row.addEventListener('touchend', () => {
          isPaused = false;
          requestAnimationFrame(() => scrollRow(row, index));
        });
        requestAnimationFrame(() => scrollRow(row, index));
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