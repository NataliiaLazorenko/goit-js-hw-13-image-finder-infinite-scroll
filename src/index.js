import './styles.css';
import refs from './js/refs';
import updatePhotosMarkup from './js/update-photos-markup';
import apiService from './js/apiService';
import showNotification from './js/notification';
import showLargePhoto from './js/show-large-photo';

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', fetchPhotos);
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
  refs.loadMoreBtn.classList.add('is-hidden');

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
    refs.loadMoreBtn.classList.remove('is-hidden');
    scrollPage();
  });
}

function clearGalleryContainer() {
  refs.photosGallery.innerHTML = '';
}

function scrollPage() {
  scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}
