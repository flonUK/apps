document.addEventListener('DOMContentLoaded', function() {
    const scrollingCardsContainer = document.querySelector('.scrolling-cards-container');
    const scrollingCards = document.querySelector('.scrolling-cards');
  
    // Clone the scrolling cards to create a seamless loop
    scrollingCards.innerHTML += scrollingCards.innerHTML;
  
    // Set the width of the container to twice the original width to accommodate the duplicate cards
    scrollingCardsContainer.style.width = `${scrollingCards.scrollWidth}px`;
  });
  