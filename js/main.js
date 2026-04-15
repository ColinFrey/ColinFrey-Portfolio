const modal = document.getElementById('artModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
const masonryItems = document.querySelectorAll('.masonry-item');

const searchTrigger = document.getElementById('searchTrigger');
const closeSearch = document.getElementById('closeSearch');
const searchWrapper = document.getElementById('searchWrapper');
const searchInput = document.getElementById('searchInput');

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
  masonryItems.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

masonryItems.forEach(item => {
  item.addEventListener('click', () => {
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
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});