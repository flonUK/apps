document.addEventListener('DOMContentLoaded', function() {
  function adjustDynamicStyles() {
    // Updated function to reflect new naming convention
    const sectionHeight = '{{ block.settings.adedayo_image_banner_section_height }}';
    const banner = document.querySelector('.adedayo-image-banner-section');
    banner.style.setProperty('--adedayo-image-banner-section-height', `${sectionHeight}vh`);

    adjustTextPosition('.adedayo-image-banner-card:first-child .adedayo-image-banner-text', '{{ block.settings.adedayo_image_banner_text_vertical_position_1 }}');
    adjustTextPosition('.adedayo-image-banner-card:last-child .adedayo-image-banner-text', '{{ block.settings.adedayo_image_banner_text_vertical_position_2 }}');

    // Update CSS custom properties for heading and subheading elements
    document.querySelectorAll('.adedayo-image-banner-heading').forEach(element => {
      element.style.setProperty('--adedayo-image-banner-heading-color', '{{ block.settings.adedayo_image_banner_heading_color }}');
      element.style.setProperty('--adedayo-image-banner-heading-size', '{{ block.settings.adedayo_image_banner_heading_font_size }}px');
    });

    document.querySelectorAll('.adedayo-image-banner-subheading').forEach(element => {
      element.style.setProperty('--adedayo-image-banner-subheading-color', '{{ block.settings.adedayo_image_banner_subheading_color }}');
      element.style.setProperty('--adedayo-image-banner-subheading-size', '{{ block.settings.adedayo_image_banner_subheading_font_size }}px');
    });
  }

  function adjustTextPosition(selector, position) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.setProperty('--adedayo-image-banner-text-position', `${position}%`);
    }
  }

  adjustDynamicStyles();
  window.addEventListener('resize', adjustDynamicStyles);
});
