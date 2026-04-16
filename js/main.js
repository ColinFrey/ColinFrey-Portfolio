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

let isZoomed = false;

function createHoverBanner(item) {
  const title = item.getAttribute('data-title');
  const medium = item.getAttribute('data-medium');
  const banner = document.createElement('div');
  banner.className = 'hover-banner';
  banner.innerHTML = `<strong>${title}</strong> | ${medium}`;
  item.appendChild(banner);
}

masonryItems.forEach(item => {
  createHoverBanner(item);
  item.addEventListener('click', () => openModal(item));
});

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
  
  isZoomed = false;
  modalImg.style.transform = 'scale(1)';
  modalImgContainer.style.cursor = 'zoom-in';
  
  closeModal.focus();
}

modalImgContainer.addEventListener('click', (e) => {
  if (window.innerWidth > 800) {
    const containerRect = modalImgContainer.getBoundingClientRect();
    const naturalWidth = modalImg.naturalWidth;
    const naturalHeight = modalImg.naturalHeight;
    const containerRatio = containerRect.width / containerRect.height;
    const imageRatio = naturalWidth / naturalHeight;
    
    let renderedWidth, renderedHeight, imgLeft, imgTop;
    
    if (imageRatio > containerRatio) {
      renderedWidth = containerRect.width;
      renderedHeight = containerRect.width / imageRatio;
      imgLeft = 0;
      imgTop = (containerRect.height - renderedHeight) / 2;
    } else {
      renderedWidth = containerRect.height * imageRatio;
      renderedHeight = containerRect.height;
      imgLeft = (containerRect.width - renderedWidth) / 2;
      imgTop = 0;
    }
    
    const buffer = 15; 
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    const isOverImage = (
      mouseX >= (imgLeft - buffer) &&
      mouseX <= (imgLeft + renderedWidth + buffer) &&
      mouseY >= (imgTop - buffer) &&
      mouseY <= (imgTop + renderedHeight + buffer)
    );

    if (isOverImage) {
      isZoomed = !isZoomed;
      
      if (isZoomed) {
        const xPercent = (mouseX / containerRect.width) * 100;
        const yPercent = (mouseY / containerRect.height) * 100;
        modalImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        modalImg.style.transform = 'scale(2.5)';
        modalImgContainer.style.cursor = 'zoom-out';
      } else {
        modalImg.style.transform = 'scale(1)';
        modalImgContainer.style.cursor = 'zoom-in';
      }
    }
  }
});

modalImgContainer.addEventListener('mousemove', (e) => {
  if (isZoomed && window.innerWidth > 800) {
    const rect = modalImgContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    modalImg.style.transformOrigin = `${x}% ${y}%`;
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  isZoomed = false;
  modalImg.style.transform = 'scale(1)';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    isZoomed = false;
    modalImg.style.transform = 'scale(1)';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    searchWrapper.classList.remove('active');
    isZoomed = false;
    modalImg.style.transform = 'scale(1)';
  }
});