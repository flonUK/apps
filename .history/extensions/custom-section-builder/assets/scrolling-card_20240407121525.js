document.addEventListener('DOMContentLoaded', function() {
    // Get all the product cards
    const productCards = document.querySelectorAll('.product-card');
  
    // Function to handle any event, for example, a click event
    function onCardClick(event) {
      const card = event.currentTarget;
      // You can do something when the card is clicked
      // For instance, you could navigate to the card's link
      // This example will just log the card's ID to the console
      console.log('Card clicked:', card.id);
    }
  
    // Add click event listener to each card
    productCards.forEach(card => {
      card.addEventListener('click', onCardClick);
    });
  
    // If you have any animations or dynamic interactions, you can initialize them here
    // For instance, you could start a carousel or a slider if you had multiple cards in a row
  });
  