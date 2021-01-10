import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

function showLargePhoto(event) {
  const targetNode = event.target.nodeName;
  if (targetNode !== 'IMG' && targetNode !== 'BUTTON') {
    return;
  }

  const largeImgSrc = event.target.dataset.source;
  basicLightbox.create(`<img src="${largeImgSrc}">`).show();
}

export default showLargePhoto;
