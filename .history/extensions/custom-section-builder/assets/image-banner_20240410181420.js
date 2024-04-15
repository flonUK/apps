document.addEventListener('DOMContentLoaded', function() {
  // Function to adjust dynamic styles based on settings
  function adjustDynamicStyles() {
    // Adjust the height of the banner section based on settings
    const sectionHeight = '{{ block.settings.section_height }}';
    const banner = document.querySelector('.adedayo-image-banner-section');
    if (banner) {
      banner.style.setProperty('--adedayo-image-banner-section-height', `${sectionHeight}vh`);
    }

    // Adjust the text vertical positions for the first and second images
    adjustTextVerticalPosition('.adedayo-image-banner-card:first-child .adedayo-image-banner-text-overlay', '{{ block.settings.text_vertical_position_1 }}');
    adjustTextVerticalPosition('.adedayo-image-banner-card:last-child .adedayo-image-banner-text-overlay', '{{ block.settings.text_vertical_position_2 }}');

    // Adjust heading and subheading styles based on settings
    adjustTextStyle('.adedayo-image-banner-heading', 'fontSize', '{{ block.settings.heading_font_size }}', 'px');
    adjustTextStyle('.adedayo-image-banner-heading', 'color', '{{ block.settings.heading_color }}');
    adjustTextStyle('.adedayo-image-banner-subheading', 'fontSize', '{{ block.settings.subheading_font_size }}', 'px');
    adjustTextStyle('.adedayo-image-banner-subheading', 'color', '{{ block.settings.subheading_color }}');
  }

  // Function to adjust the text vertical position for a given selector and position value
  function adjustTextVerticalPosition(selector, position) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.top = position + '%';
    });
  }

  // General function to adjust text style for a given selector
  function adjustTextStyle(selector, styleProp, value, unit = '') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style[styleProp] = value + unit;
    });
  }

  // Initial adjustments
  adjustDynamicStyles();

  // Re-apply adjustments on window resize to maintain responsive design
  window.addEventListener('resize', adjustDynamicStyles);
});
