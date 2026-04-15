window.addEventListener('load', () => {
    const items = document.querySelectorAll('.masonry-item');
    const modal = document.getElementById('artModal');
    const modalImg = document.getElementById('modalImg');
    const modalImgContainer = document.getElementById('modalImgContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    const navContainer = document.getElementById('navContainer');
    const searchTrigger = document.getElementById('searchTrigger');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    items.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const description = item.getAttribute('data-description');
            
            modalImg.src = img.src;
            modalTitle.innerText = img.alt;
            modalDescription.innerText = description || "";
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    modalImgContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = modalImgContainer.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        modalImg.style.transformOrigin = `${x}% ${y}%`;
        modalImg.style.transform = "scale(2.5)";
    });

    modalImgContainer.addEventListener('mouseleave', () => {
        modalImg.style.transform = "scale(1)";
        modalImg.style.transformOrigin = "center";
    });

    const closeAndReset = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalImg.style.transform = "scale(1)";
    };

    closeModal.addEventListener('click', closeAndReset);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAndReset();
        }
    });

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