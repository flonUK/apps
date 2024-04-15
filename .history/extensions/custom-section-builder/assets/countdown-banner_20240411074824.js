document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.adedayo-countdown-banner__timer');
  
    countdownElements.forEach(function(element) {
      const countdownDate = element.dataset.countdownDate;
      const expiredText = element.dataset.expiredText; // Retrieve the user-set expired text
      const daysElement = element.querySelector('.adedayo-countdown-banner__days');
      const hoursElement = element.querySelector('.adedayo-countdown-banner__hours');
      const minutesElement = element.querySelector('.adedayo-countdown-banner__minutes');
      const secondsElement = element.querySelector('.adedayo-countdown-banner__seconds');
  
      function updateCountdown() {
        const now = new Date().getTime();
        const distance = new Date(countdownDate).getTime() - now;
  
        if (distance < 0) {
          clearInterval(countdownInterval);
          // Ensure expired text is displayed as set by the user
          element.textContent = expiredText; 
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
  