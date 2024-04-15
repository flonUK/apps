<script>
document.addEventListener('DOMContentLoaded', function() {
  const showcase = document.querySelector('.fullscreen-image-showcase');
  const textContainer = showcase.querySelector('.fullscreen-text-container');
  const imageText = showcase.querySelector('.image-text');

  // Set text visibility
  textContainer.style.display = showcase.dataset.showText === 'true' ? 'block' : 'none';

  // Set text position
  showcase.style.setProperty('--text-position', showcase.dataset.textPosition + '%');

  // Set text color
  imageText.style.color = showcase.dataset.textColor;

  // Set font family
  imageText.style.fontFamily = showcase.dataset.fontFamily;

  // Set font weight
  imageText.style.fontWeight = showcase.dataset.fontWeight;

  // Set font style
  imageText.style.fontStyle = showcase.dataset.fontStyle;

  // Set fixed text position
  if (showcase.dataset.fixedTextPosition === 'true') {
    textContainer.style.position = 'fixed';
  } else {
    textContainer.style.position = 'absolute';
  }

  // Adjust text size based on screen width
  const adjustTextSize = () => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const fontSize = mqMobile.matches ? showcase.dataset.fontSizeMobile : showcase.dataset.fontSizeDesktop;
    imageText.style.fontSize = fontSize + 'px';
  };

  adjustTextSize();
  window.addEventListener('resize', adjustTextSize);
});
