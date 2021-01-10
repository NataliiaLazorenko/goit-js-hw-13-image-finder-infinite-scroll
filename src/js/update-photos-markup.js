import refs from './refs';
import photosCardsTpl from '../templates/photo-card.hbs';

function updatePhotosMarkup(photos) {
  const photosCards = photosCardsTpl(photos);
  refs.photosGallery.insertAdjacentHTML('beforeend', photosCards);
}

export default updatePhotosMarkup;
