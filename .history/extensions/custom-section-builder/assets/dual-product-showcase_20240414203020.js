document.addEventListener('DOMContentLoaded', function() {
    const productImageContainers = document.querySelectorAll('.product-image-container');
    
    productImageContainers.forEach(function(container) {
    const images = container.querySelectorAll('.product-image');
    let currentImageIndex = 0;