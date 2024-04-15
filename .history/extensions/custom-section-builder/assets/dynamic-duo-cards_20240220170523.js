document.addEventListener('DOMContentLoaded', function() {
    var blocksContainer = document.querySelector('.dynamic-duo-cards');
    var pageWidthContainer = blocksContainer ? blocksContainer.closest('.page-width') : null;

    // Function to toggle full width class based on layout
    function toggleFullWidth() {
        const isFullWidth = blocksContainer.classList.contains('fullwidth');
        if (pageWidthContainer) {
            if (isFullWidth || window.innerWidth <= 768) { // Full width on mobile by default
                pageWidthContainer.classList.add('custom-full-width');
            } else {
                pageWidthContainer.classList.remove('custom-full-width');
            }
        }
    }

    // Adjust layout based on viewport size
    window.addEventListener('resize', toggleFullWidth);
    toggleFullWidth(); // Initial check

    // Adjust visibility based on mobile visibility setting
    const adjustMobileVisibility = () => {
        const leftBlock = document.querySelector('.dynamic-duo-card-left');
        const rightBlock = document.querySelector('.dynamic-duo-card-right');
        const visibilitySetting = blocksContainer.getAttribute('data-mobile-visibility');
        
        // Mobile visibility adjustments
        const mobileView = window.matchMedia('(max-width: 768px)');
        const toggleVisibility = () => {
            if (mobileView.matches) {
                leftBlock.style.display = (visibilitySetting === 'left' || visibilitySetting === 'both') ? 'block' : 'none';
                rightBlock.style.display = (visibilitySetting === 'right' || visibilitySetting === 'both') ? 'block' : 'none';
            } else {
                leftBlock.style.display = 'block';
                rightBlock.style.display = 'block';
            }
        };
        
        mobileView.addListener(toggleVisibility);
        toggleVisibility(); // Initialize on load
    };

    adjustMobileVisibility(); // Call visibility adjustment function
});