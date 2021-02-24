import template from '../templates/imagesTmp.hbs';
export default function renderGallery(images, ref) {
  const markup = template(images);
  ref.insertAdjacentHTML('beforeend', markup);
}
