document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.querySelector('.adedayo-countdown-banner__timer');
    const countdownDate = countdownElement.getAttribute('data-countdown-date');
    
    function updateCountdown() {
      const now = new Date().getTime();
      const targetDate = new Date(countdownDate).getTime();
      const distance = targetDate - now;
  
      // Calculate time components
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Update the DOM elements
      countdownElement.querySelector('.adedayo-countdown-banner__days').textContent = days.toString().padStart(2, '0');
      countdownElement.querySelector('.adedayo-countdown-banner__hours').textContent = hours.toString().padStart(2, '0');
      countdownElement.querySelector('.adedayo-countdown-banner__minutes').textContent = minutes.toString().padStart(2, '0');
      countdownElement.querySelector('.adedayo-countdown-banner__seconds').textContent = seconds.toString().padStart(2, '0');
  
      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'EXPIRED';
      }
    }
  
    // Start the countdown timer
    updateCountdown(); // Update immediately on load
    const countdownInterval = setInterval(updateCountdown, 1000);
  });
  