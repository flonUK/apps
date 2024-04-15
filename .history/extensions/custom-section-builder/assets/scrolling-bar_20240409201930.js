document.addEventListener('DOMContentLoaded', function() {
  const scrollingContainer = document.querySelector('.adedayo-scrolling-bar-container');
  const scrollingContent = document.querySelector('.adedayo-scrolling-bar-content');

  function duplicateContent() {
    // Ensure initial content width is calculated correctly
    const contentWidth = scrollingContent.offsetWidth;
    const containerWidth = scrollingContainer.offsetWidth;

    // Determine the number of duplications needed to fill the screen
    const duplicationsNeeded = Math.ceil(containerWidth / contentWidth);

    for (let i = 0; i < duplicationsNeeded; i++) {
      scrollingContent.innerHTML += scrollingContent.innerHTML;
    }
  }

  if (scrollingContent) {
    duplicateContent();
  }
});
