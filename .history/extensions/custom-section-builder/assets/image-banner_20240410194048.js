document.addEventListener('DOMContentLoaded', function() {
  // Function to adjust dynamic styles based on settings
  function adjustDynamicStyles() {
    // Adjust the height of the banner section based on settings
    const sectionHeight = '{{ block.settings.section_height }}';
    const banner = document.querySelector('.image-banner');
    if (banner) {
      banner.style.setProperty('--adedayo-image-banner-section-height', `${sectionHeight}vh`);
    }

    // Adjust the text vertical positions for the first and second images
    adjustTextVerticalPosition('.adedayo-image-banner-image-card:first-child .adedayo-image-banner-text-overlay', '{{ block.settings.text_vertical_position_1 }}');
    adjustTextVerticalPosition('.adedayo-image-banner-image-card:last-child .adedayo-image-banner-text-overlay', '{{ block.settings.text_vertical_position_2 }}');

    // Adjust heading font size and color for the first image
    const headingFontSize1 = '{{ block.settings.heading_font_size_1 }}';
    const headingColor1 = '{{ block.settings.heading_color_1 }}';
    document.querySelectorAll('.adedayo-image-banner-image-card:first-child .adedayo-image-banner-heading').forEach(heading => {
      heading.style.fontSize = `${headingFontSize1}px`;
      heading.style.color = headingColor1;
    });

    // Adjust subheading font size and color for the first image
    const subheadingFontSize1 = '{{ block.settings.subheading_font_size_1 }}';
    const subheadingColor1 = '{{ block.settings.subheading_color_1 }}';
    document.querySelectorAll('.adedayo-image-banner-image-card:first-child .adedayo-image-banner-subheading').forEach(subheading => {
      subheading.style.fontSize = `${subheadingFontSize1}px`;
      subheading.style.color = subheadingColor1;
    });

    // Adjust heading font size and color for the second image
    const headingFontSize2 = '{{ block.settings.heading_font_size_2 }}';
    const headingColor2 = '{{ block.settings.heading_color_2 }}';
    document.querySelectorAll('.adedayo-image-banner-image-card:last-child .adedayo-image-banner-heading').forEach(heading => {
      heading.style.fontSize = `${headingFontSize2}px`;
      heading.style.color = headingColor2;
    });

    // Adjust subheading font size and color for the second image
    const subheadingFontSize2 = '{{ block.settings.subheading_font_size_2 }}';
    const subheadingColor2 = '{{ block.settings.subheading_color_2 }}';
    document.querySelectorAll('.adedayo-image-banner-image-card:last-child .adedayo-image-banner-subheading').forEach(subheading => {
      subheading.style.fontSize = `${subheadingFontSize2}px`;
      subheading.style.color = subheadingColor2;
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