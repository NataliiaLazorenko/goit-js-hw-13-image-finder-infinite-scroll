import './styles.css';
import refs from './js/refs';
import updatePhotosMarkup from './js/update-photos-markup';
import apiService from './js/apiService';
import showNotification from './js/notification';
import showLargePhoto from './js/show-large-photo';

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.photosGallery.addEventListener('click', showLargePhoto);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearGalleryContainer();
  apiService.resetPage();
  fetchPhotos();
  form.reset();
}

function fetchPhotos() {
  apiService.fetchPhotos().then(hits => {
    if (refs.photosGallery.innerHTML !== '' && hits.length === 0) {
      showNotification.showInfoMessage();
      return;
    } else if (hits.length === 0) {
      showNotification.showErrorMessage();
      return;
    }

    updatePhotosMarkup(hits);
    showNotification.showSuccessMessage();
    observer.observe(refs.photosGallery.lastElementChild);
  });
}

function clearGalleryContainer() {
  refs.photosGallery.innerHTML = '';
}

const options = {
  rootMargin: '-100px',
};

const observer = new IntersectionObserver(onEntry, options);

function onEntry(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      observer.unobserve(image);

      fetchPhotos();
    }
  });
}
