document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.adedayo-countdown-banner__timer');

    countdownElements.forEach(function(element) {
        const countdownDate = element.getAttribute('data-countdown-date') + "T23:59:59";

        function updateCountdown() {
            const now = new Date();
            const endDate = new Date(countdownDate);
            const distance = endDate - now;

            if (distance < 0) {
                element.textContent = element.getAttribute('data-expired-text');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
});
