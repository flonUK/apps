document.addEventListener('DOMContentLoaded', function() {
  const isDesktop = window.innerWidth >= 768;
  // Retrieve the scroll speed from the data attribute
  const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
  // Map scroll speed (1 to 20) to interval delay (100 to 5 ms) for more noticeable speed differences
  const mappedDelay = Math.max(100 - (scrollSpeed * 5), 5);
  // Adjust scroll step based on scroll speed for smoothness
  const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));