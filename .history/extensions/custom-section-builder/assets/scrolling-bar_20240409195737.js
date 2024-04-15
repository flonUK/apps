document.addEventListener('DOMContentLoaded', function() {
  const adedayoScrollingBarContent = document.querySelector('.adedayo-scrolling-bar-content');
  adedayoScrollingBarDuplicateContent();

  function adedayoScrollingBarDuplicateContent() {
    if (adedayoScrollingBarContent) {
      adedayoScrollingBarContent.innerHTML += adedayoScrollingBarContent.innerHTML;
    }
  }
});
