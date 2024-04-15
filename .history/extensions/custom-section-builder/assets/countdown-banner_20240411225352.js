document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.adedayo-countdown-banner__timer');
    countdownElements.forEach(function(element) {
        const countdownDate = element.dataset.countdownDate;
        const expiredText = element.dataset.expiredText; 
    
        function updateCountdown() {
            const now = new Date();
            const targetDate = new Date(countdownDate + "T23:59:59"); 
            const distance = targetDate - now;
          
            if (distance < 0) {
                // Display expired text and stop the countdown
                element.textContent = expiredText; 
                return;
            }
    
            // Calculate the time left
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
            // Update the countdown
            element.querySelector('.adedayo-countdown-banner__days').textContent = days.toString().padStart(2, '0');
            element.querySelector('.adedayo-countdown-banner__hours').textContent = hours.toString().padStart(2, '0');
            element.querySelector('.adedayo-countdown-banner__minutes').textContent = minutes.toString().padStart(2, '0');
            element.querySelector('.adedayo-countdown-banner__seconds').textContent = seconds.toString().padStart(2, '0');
        }
    
        // Initialize the countdown
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    
        // Clear interval when component is unloaded or for clean-up
        element.addEventListener('unmount', function() {
            clearInterval(countdownInterval);
        });
    });
    