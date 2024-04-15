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
    
            // Calculate time left
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Construct countdown text
            element.innerHTML = `
                <span class="adedayo-countdown-banner__timer-item">${days.toString().padStart(2, '0')}</span>
                <span class="adedayo-countdown-banner__timer-separator">:</span>
                <span class="adedayo-countdown-banner__timer-item">${hours.toString().padStart(2, '0')}</span>
                <span class="adedayo-countdown-banner__timer-separator">:</span>
                <span class="adedayo-countdown-banner__timer-item">${minutes.toString().padStart(2, '0')}</span>
                <span class="adedayo-countdown-banner__timer-separator">:</span>
                <span class="adedayo-countdown-banner__timer-item">${seconds.toString().padStart(2, '0')}</span>
            `;
        }
  
        // Initialize the countdown
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);

        // Clear interval when component is unloaded or for clean-up
        document.addEventListener('unload', function() {
            clearInterval(countdownInterval);
        });
    });
});
