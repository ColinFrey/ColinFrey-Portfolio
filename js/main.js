window.addEventListener('load', () => {
    const items = document.querySelectorAll('.masonry-item');
    
    items.forEach((item, index) => {
        
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    console.log("Portfolio loaded and animated!");
});