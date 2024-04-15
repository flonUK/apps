document.addEventListener('DOMContentLoaded', function() {
    const scrollingContent = document.querySelector('.scrolling-content');
  
    // Function to duplicate content for seamless looping
    function duplicateContent() {
      if (scrollingContent) {
        scrollingContent.innerHTML += scrollingContent.innerHTML;
      }
    }
  
    // Example Usage:
    duplicateContent(); // Duplicate content for seamless looping
  });