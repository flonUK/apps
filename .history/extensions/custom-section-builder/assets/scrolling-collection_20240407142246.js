document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const mappedDelay = Math.max(100 - (scrollSpeed * 5), 5);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  function autoScrollColumns(columns) {
    columns.forEach((column, index) => {
      let scrollAmount = column.scrollTop;
      const maxScroll = column.scrollHeight - column.clientHeight;
      let autoScrollInterval;
      let requestId;

      function autoScroll() {
        if (index % 2 === 0) {
          scrollAmount += scrollStep;
        } else {
          scrollAmount -= scrollStep;
        }
        if (scrollAmount >= maxScroll || scrollAmount <= 0) {
          scrollAmount = index % 2 === 0 ? 0 : maxScroll;
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

      startAutoScroll();
      column.addEventListener('mouseenter', () => {
        stopAutoScroll();
      });
      column.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
    });
  }

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScrollColumns(columns);
  } else {
    const topRow = document.querySelector('.adedayo-scrolling-collection-grid-products-row:nth-child(1)');
    const bottomRow = document.querySelector('.adedayo-scrolling-collection-grid-products-row:nth-child(2)');

    function duplicateRowContent(row) {
      const content = row.innerHTML;
      row.innerHTML += content;
    }
    duplicateRowContent(topRow);
    duplicateRowContent(bottomRow);

    let topRowRequestId, bottomRowRequestId;

    function autoScrollLeft(row) {
      row.scrollLeft += scrollStep;
      if (row.scrollLeft >= row.scrollWidth / 2) {
        row.scrollLeft = 0;
      }
      topRowRequestId = requestAnimationFrame(() => autoScrollLeft(row));
    }

    function autoScrollRight(row) {
      row.scrollLeft -= scrollStep;
      if (row.scrollLeft <= 0) {
        row.scrollLeft = row.scrollWidth / 2;
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

    [topRow, bottomRow].forEach(row => {
      row.addEventListener('mouseenter', () => {
        stopScrolling();
      });
      row.addEventListener('mouseleave', () => {
        startScrolling();
      });
    });

    startScrolling();
  }
});
