document.addEventListener('DOMContentLoaded', function() {
    const scrollingCard = document.querySelector('.scrolling-card');
    scrollingCard.innerHTML += scrollingCard.innerHTML; // Duplicate content for a seamless loop
  });
  