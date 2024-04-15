document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

  // Initiates automatic scrolling with inversion and opposite directions
  function initAutoScroll(elements, isColumn) {
    elements.forEach((element, index) => {
      // Ensuring seamless content for smooth looping
      duplicateContentIfNeeded(element);

      // Setting initial direction based on index for opposite starting directions
      let direction = (index % 2 === 0 ? 1 : -1) * scrollStep;

      // Adjust direction for rows to start with opposite horizontal directions
      if (!isColumn) direction *= -1;

      function scroll() {
        // Determine current and maximum scroll positions
        const currentScroll = isColumn ? element.scrollTop : element.scrollLeft;
        const maxScroll = isColumn ? element.scrollHeight - element.clientHeight : element.scrollWidth / 2;

        // Invert direction at content ends
        if (currentScroll >= maxScroll || currentScroll <= 0) {
          direction = -direction;
        }

        if (isColumn) {
          element.scrollTop += direction;
        } else {
          element.scrollLeft += direction;
        }

        if (!element.isPaused) requestAnimationFrame(scroll);
      }

      // Event listeners to pause/resume scrolling
      element.addEventListener(isColumn ? 'mouseenter' : 'touchstart', () => element.isPaused = true);
      element.addEventListener(isColumn ? 'mouseleave' : 'touchend', () => {
        element.isPaused = false;
        requestAnimationFrame(scroll);
      });

      requestAnimationFrame(scroll);
    });
  }

  function duplicateContentIfNeeded(element) {
    // Only duplicate for rows to ensure enough horizontal content
    if (element.classList.contains('adedayo-scrolling-collection-grid-products-row')) {
      element.innerHTML += element.innerHTML;
    }
  }

  // Apply behavior based on device
  const targetElements = isDesktop ? document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column') : document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
  initAutoScroll(targetElements, isDesktop);
});
