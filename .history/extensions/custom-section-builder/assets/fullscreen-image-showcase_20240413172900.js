

document.addEventListener('DOMContentLoaded', function() {
  const showcase = document.querySelector('.fullscreen-image-showcase');
  const textContainer = showcase.querySelector('.fullscreen-text-container');
  const imageText = showcase.querySelector('.image-text');

  textContainer.style.display = showcase.dataset.showText === 'true' ? 'block' : 'none';
  textContainer.style.top = showcase.dataset.textPosition + '%';
  imageText.style.color = showcase.dataset.textColor;
  imageText.style.fontFamily = showcase.dataset.fontFamily;
  imageText.style.fontWeight = showcase.dataset.fontWeight;
  imageText.style.fontStyle = showcase.dataset.fontStyle;

  const adjustTextSize = () => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const fontSize = mqMobile.matches ? showcase.dataset.fontSizeMobile : showcase.dataset.fontSizeDesktop;
    imageText.style.fontSize = fontSize + 'px';
  };

  adjustTextSize();
  window.addEventListener('resize', adjustTextSize);
});
