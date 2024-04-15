document.addEventListener('DOMContentLoaded', function() {
  const scrollingContent = document.querySelector('.adedayo-scrolling-bar-content');

  // Duplicate content until it sufficiently fills the scrollable area
  function duplicateForContinuousScroll() {
    let contentWidth = scrollingContent.offsetWidth;
    const containerWidth = scrollingContent.parentElement.offsetWidth;

    // Estimate the number of duplications needed based on container and content width
    const duplicationsNeeded = Math.ceil(containerWidth / contentWidth);

    for (let i = 0; i < duplicationsNeeded * 2; i++) { // Increase multiplier as needed
      scrollingContent.innerHTML += scrollingContent.innerHTML;
      // Update content width after each duplication to avoid infinite loop
      contentWidth = scrollingContent.offsetWidth;
    }
  }

  if (scrollingContent) {
    duplicateForContinuousScroll();
  }
});
