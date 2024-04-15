document.addEventListener('DOMContentLoaded', function() {
    const scrollingCards = document.querySelector('.scrolling-cards');
    scrollingCards.innerHTML += scrollingCards.innerHTML; // Duplicate cards for a seamless loop
  });
  