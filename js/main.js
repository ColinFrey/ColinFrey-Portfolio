const modal = document.getElementById('artModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
const masonryItems = document.querySelectorAll('.masonry-item');
const modalImgContainer = document.getElementById('modalImgContainer');

const searchTrigger = document.getElementById('searchTrigger');
const closeSearch = document.getElementById('closeSearch');
const searchWrapper = document.getElementById('searchWrapper');
const searchInput = document.getElementById('searchInput');
const resultsSection = document.getElementById('searchResultsSection');

searchTrigger.addEventListener('click', () => {
  searchWrapper.classList.add('active');
  searchInput.focus();
});

closeSearch.addEventListener('click', () => {
  searchWrapper.classList.remove('active');
  searchInput.value = '';
  filterProjects('');
});

searchInput.addEventListener('input', (e) => {
  filterProjects(e.target.value.toLowerCase());
});

function filterProjects(query) {
  const existingMatches = resultsSection.querySelectorAll('.masonry-item');
  existingMatches.forEach(match => match.remove());
  
  if (query.trim() === '') {
    resultsSection.classList.remove('active');
    return;
  }

  let matchCount = 0;
  masonryItems.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    const medium = item.getAttribute('data-medium').toLowerCase();

    if (title.includes(query) || medium.includes(query)) {
      const clone = item.cloneNode(true);
      clone.classList.add('highlighted');
      
      clone.addEventListener('click', () => {
        openModal(clone);
      });

      resultsSection.appendChild(clone);
      matchCount++;
    }
  });

  if (matchCount > 0) {
    if (!resultsSection.classList.contains('active')) {
      resultsSection.classList.add('active');
      window.scrollTo({
        top: resultsSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  } else {
    resultsSection.classList.remove('active');
  }
}

function openModal(item) {
  const img = item.querySelector('img');
  const title = item.getAttribute('data-title');
  const year = item.getAttribute('data-year');
  const medium = item.getAttribute('data-medium');

  modalImg.src = img.src;
  modalImg.alt = title;
  modalTitle.textContent = title;
  modalDescription.textContent = year + " | " + medium;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

masonryItems.forEach(item => {
  item.addEventListener('click', () => openModal(item));
});

modalImgContainer.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 800) {
    const { left, top, width, height } = modalImgContainer.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    modalImg.style.transformOrigin = `${x}% ${y}%`;
    modalImg.style.transform = 'scale(2.5)';
  }
});

modalImgContainer.addEventListener('mouseleave', () => {
  modalImg.style.transform = 'scale(1)';
  modalImg.style.transformOrigin = 'center';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  modalImg.style.transform = 'scale(1)';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalImg.style.transform = 'scale(1)';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    searchWrapper.classList.remove('active');
  }
});