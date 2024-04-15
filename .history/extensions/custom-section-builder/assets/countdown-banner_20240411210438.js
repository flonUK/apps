document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.adedayo-countdown-banner__timer');

    countdownElements.forEach(function(element) {
        const countdownDate = element.getAttribute('data-countdown-date') + "T23:59:59"; // Append time to ensure consistency across time zones

        function updateCountdown() {
            const now = new Date();
            const endDate = new Date(countdownDate);
            const distance = endDate - now;

            if (distance < 0) {
                element.textContent = element.getAttribute('data-expired-text'); // Show expired message
                return;
            }

            // Calculate time components
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update the countdown display
            element.innerHTML = `
                <span class="adedayo-countdown-banner__timer-item">${days.toString().padStart(2, '0')}</span>:
                <span class="adedayo-countdown-banner__timer-item">${hours.toString().padStart(2, '0')}</span>:
                <span class="adedayo-countdown-banner__timer-item">${minutes.toString().padStart(2, '0')}</span>:
                <span class="adedayo-countdown-banner__timer-item">${seconds.toString().padStart(2, '0')}</span>
            `;
        }
  
        updateCountdown(); // Initial update
        setInterval(updateCountdown, 1000); // Update every second
    });
});
