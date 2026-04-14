window.addEventListener('load', () => {
    const items = document.querySelectorAll('.masonry-item');
    const navContainer = document.getElementById('navContainer');
    const searchTrigger = document.getElementById('searchTrigger');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    searchTrigger.addEventListener('click', () => {
        navContainer.classList.add('active-search');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        navContainer.classList.remove('active-search');
        searchInput.value = '';
        items.forEach(item => item.style.display = 'inline-block');
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        items.forEach(item => {
            const altText = item.querySelector('img').alt.toLowerCase();
            item.style.display = altText.includes(term) ? 'inline-block' : 'none';
        });
    });

    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});