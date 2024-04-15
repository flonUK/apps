document.addEventListener('DOMContentLoaded', function() {
  // Function to adjust dynamic styles based on settings
  function adjustDynamicStyles() {
    // Adjust the height of the banner section based on settings
    const sectionHeight = '{{ block.settings.section_height }}';
    const banner = document.querySelector('.image-banner');
    if (banner) {
      banner.style.setProperty('--section-height', `${sectionHeight}vh`);
    }

    // Adjust the text vertical positions for the first and second images
    adjustTextVerticalPosition('.image-card:first-child .text-overlay', '{{ block.settings.text_vertical_position_1 }}');
    adjustTextVerticalPosition('.image-card:last-child .text-overlay', '{{ block.settings.text_vertical_position_2 }}');

    // Adjust heading font size and color based on settings
    const headingFontSize = '{{ block.settings.heading_font_size }}';
    const headingColor = '{{ block.settings.heading_color }}';
    document.querySelectorAll('.heading').forEach(heading => {
      heading.style.fontSize = `${headingFontSize}px`;
      heading.style.color = headingColor;
    });

    // Adjust subheading font size and color based on settings
    const subheadingFontSize = '{{ block.settings.subheading_font_size }}';
    const subheadingColor = '{{ block.settings.subheading_color }}';
    document.querySelectorAll('.subheading').forEach(subheading => {
      subheading.style.fontSize = `${subheadingFontSize}px`;
      subheading.style.color = subheadingColor;
    });
  }

  // Function to adjust the text vertical position for a given selector and position value
  function adjustTextVerticalPosition(selector, position) {
    const textOverlay = document.querySelector(selector);
    if (textOverlay) {
      const alignment = getVerticalAlignment(position);
      textOverlay.style.justifyContent = alignment;
    }
  }

  // Function to determine vertical alignment based on a position percentage
  function getVerticalAlignment(position) {
    const percentage = parseInt(position, 10);
    if (percentage <= 25) {
      return 'flex-start';
    } else if (percentage >= 75) {
      return 'flex-end';
    } else {
      return 'center';
    }
  }

  // Initial adjustments
  adjustDynamicStyles();

  // Re-apply adjustments on window resize to maintain responsive design
  window.addEventListener('resize', adjustDynamicStyles);
});
