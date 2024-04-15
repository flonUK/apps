document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.adedayo-countdown-banner__timer');
  
    countdownElements.forEach(function(element) {
      const countdownDate = element.dataset.countdownDate;
      const expiredText = element.dataset.expiredText; 

      function updateCountdown() {
        const now = new Date();
        const targetDate = new Date(countdownDate + "T23:59:59"); // Adjust to end of the day
        const distance = targetDate - now;
      
        if (distance < 0) {
          element.textContent = expiredText; // Immediately display expired text
          clearInterval(countdownInterval);
          return;
        }
  
        // Calculate and display the countdown
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
      }
  
      updateCountdown();
      const countdownInterval = setInterval(updateCountdown, 1000);
    });
  });
  