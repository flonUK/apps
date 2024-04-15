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
        requestAnimationFrame(() => scrollColumn(column, index));
      });
  
      const container = document.querySelector('.adedayo-scrolling-collection-grid-products-desktop');
      container.addEventListener('mouseenter', () => {
        isPaused = true;
      });
      container.addEventListener('mouseleave', () => {
        isPaused = false;
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
        requestAnimationFrame(() => scrollRow(row, index));
      });
  
      const container = document.querySelector('.adedayo-scrolling-collection-grid-products-mobile');
      container.addEventListener('touchstart', () => {
        isPaused = true;
      });
      container.addEventListener('touchend', () => {
        isPaused = false;
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