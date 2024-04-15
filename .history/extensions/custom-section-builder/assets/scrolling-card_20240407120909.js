document.addEventListener('DOMContentLoaded', function() {
    const scrollingCard = document.querySelector('.scrolling-card');
    scrollingCard.innerHTML += scrollingCard.innerHTML; // Duplicate content for a seamless loop
  });
  , CSS: .scrolling-card {
    white-space: nowrap;
    display: flex;
    animation: scroll-left linear infinite;
  }
  
  .card-content {
    display: inline-flex;
    align-items: center;
    margin: 0 10px;
    text-align: center;
  }
  
  @keyframes scroll-left {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }
 