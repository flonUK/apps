document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);

  function autoScroll(elements) {
    elements.forEach((element, index) => {
      let scrollDirection = index % 2 === 0 ? 1 : -1; // Consistent direction for all elements (invert later)

      function scroll() {
        const maxScroll = element[isDesktop ? 'scrollHeight' : 'scrollWidth'] - element[isDesktop ? 'clientHeight' : 'clientWidth'];
        let nextScrollPos = element[isDesktop ? 'scrollTop' : 'scrollLeft'] + scrollSpeed * scrollDirection;

        // Invert direction at bounds and adjust for smooth inversion
        if (nextScrollPos >= maxScroll || nextScrollPos <= 0) {
          scrollDirection *= -1;
          nextScrollPos += scrollDirection * scrollSpeed; // Apply immediate direction change
        }

        element[isDesktop ? 'scrollTop' : 'scrollLeft'] = nextScrollPos;
        if (!element.isPaused) requestAnimationFrame(scroll);
      }

      requestAnimationFrame(scroll);

      element.addEventListener('mouseenter', () => element.isPaused = true);
      element.addEventListener('mouseleave', () => {
        element.isPaused = false;
        requestAnimationFrame(scroll);
      });
    });
  }

  if (isDesktop) {
    const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
    autoScroll(columns);
  } else {
    const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
    autoScroll(rows);
  }
});
