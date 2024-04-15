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
  
      // Output the result
      countdownElement.innerHTML = `
        <span class="days">${days}</span> :
        <span class="hours">${hours.toString().padStart(2, '0')}</span> :
        <span class="minutes">${minutes.toString().padStart(2, '0')}</span> :
        <span class="seconds">${seconds.toString().padStart(2, '0')}</span>
      `;
  
      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = 'EXPIRED';
      }
    }
  
    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
  });
  