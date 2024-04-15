document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const userScrollSpeedSetting = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed) || 6;
    const minScrollSpeed = 0.5;
    const maxScrollSpeed = 2;
    const scrollSpeedRange = maxScrollSpeed - minScrollSpeed;
    const userSpeedRange = 9; // 10 - 1
    const scrollSpeedSetting = minScrollSpeed + (scrollSpeedRange * (userScrollSpeedSetting - 1) / userSpeedRange);
    const baseScrollStep = 1;
    const scrollStep = baseScrollStep * scrollSpeedSetting;
  
    // Function to duplicate content for seamless looping
    function duplicateContent(element) {
      element.innerHTML += element.innerHTML;
    }
  
    // Enhanced seamless looping logic for desktop columns
    function autoScrollColumns(columns) {
      let maxScroll = columns[0].scrollHeight / 2;
      let scrollPosition = 0;
  
      function scroll() {
        columns.forEach((column, index) => {
          let direction = index % 2 === 0 ? -1 : 1;
          scrollPosition += direction * scrollStep;
  
          if (scrollPosition >= maxScroll || scrollPosition <= -maxScroll) {
            scrollPosition = 0;
          }
  
          column.style.transform = `translateY(${scrollPosition}px)`;
        });
  
        if (!columns[0].isPaused) requestAnimationFrame(scroll);
      }
  
      requestAnimationFrame(scroll);
  
      columns.forEach((column) => {
        column.addEventListener('mouseenter', () => column.isPaused = true);
        column.addEventListener('mouseleave', () => {
          column.isPaused = false;
          requestAnimationFrame(scroll);
        });
      });
    }
  
    // Mobile rows' scrolling logic
    function autoScrollRows(rows) {
      let maxScrollLeft = rows[0].scrollWidth / 2;
      let scrollPosition = 0;
  
      function scroll() {
        rows.forEach((row, index) => {
          let direction = index % 2 === 0 ? -1 : 1;
          scrollPosition += direction * scrollStep;
  
          if (scrollPosition >= maxScrollLeft || scrollPosition <= -maxScrollLeft) {
            scrollPosition = 0;
          }
  
          row.scrollLeft = scrollPosition;
        });
  
        if (!rows[0].isPaused) requestAnimationFrame(scroll);
      }
  
      requestAnimationFrame(scroll);
  
      rows.forEach((row) => {
        row.addEventListener('touchstart', () => row.isPaused = true);
        row.addEventListener('touchend', () => row.isPaused = false);
      });
    }
  
    // Apply scrolling based on device type
    if (isDesktop) {
      const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
      columns.forEach(duplicateContent);
      autoScrollColumns(columns);
    } else {
      const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
      rows.forEach(duplicateContent);
      autoScrollRows(rows);
    }
  });