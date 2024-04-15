document.addEventListener('DOMContentLoaded', function() {
  // Function to adjust dynamic styles based on settings with Updated Variable Names
  function adjustDynamicStyles() {
    const sectionHeight = '{{ block.settings.adedayo_image_banner_section_height }}';
    const banner = document.querySelector('.adedayo-image-banner-image-banner');
    if (banner) {
      banner.style.setProperty('--adedayo-image-banner-section-height', `${sectionHeight}vh`);
    }

    adjustTextVerticalPosition('.adedayo-image-banner-image-card:first-child .adedayo-image-banner-text-overlay', '{{ block.settings.adedayo_image_banner_text_vertical_position_1 }}');
    adjustTextVerticalPosition('.adedayo-image-banner-image-card:last-child .adedayo-image-banner-text-overlay', '{{ block.settings.adedayo_image_banner_text_vertical_position_2 }}');

    const headingFontSize = '{{ block.settings.adedayo_image_banner_heading_font_size }}';
    const headingColor = '{{ block.settings.adedayo_image_banner_heading_color }}';
    document.querySelectorAll('.adedayo-image-banner-heading').forEach(heading => {
      heading.style.fontSize = `${headingFontSize}px`;
      heading.style.color = headingColor;
    });

    const subheadingFontSize = '{{ block.settings.adedayo_image_banner_subheading_font_size }}';
    const subheadingColor = '{{ block.settings.adedayo_image_banner_subheading_color }}';
    document.querySelectorAll('.adedayo-image-banner-subheading').forEach(subheading => {
      subheading.style.fontSize = `${subheadingFontSize}px`;
      subheading.style.color = subheadingColor;
    });
  }

  function adjustTextVerticalPosition(selector, position) {
    const textOverlay = document.querySelector(selector);
    if (textOverlay) {
      const alignment = getVerticalAlignment(position);
      textOverlay.style.justifyContent = alignment;
    }
  }

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

  adjustDynamicStyles();
  window.addEventListener('resize', adjustDynamicStyles);
});
