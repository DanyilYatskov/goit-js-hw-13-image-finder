import refs from './refs';
import fetchAPI from './fetchAPI';
import render from './renderGallery';
import * as basicLightbox from 'basiclightbox';
import '../styles/basicLightbox.min.css';
function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
}
refs.searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const searchTag = form.elements.query.value;
  fetchAPI.tag = searchTag;
  refs.galleryRef.innerHTML = '';
  refs.moreImagesBtnRef.classList.add('is-hidden');
  fetchAPI.resetPageToFirst();
  // fetchAPI.fetchImages().then(hits => {
  //   if (hits.length == 0) {
  //     return;
  //   }
  //   refs.moreImagesBtnRef.classList.remove('is-hidden');
  //   return render(hits, refs.galleryRef);
  // });
  fetchImages();
});
refs.moreImagesBtnRef.addEventListener('click', moreImagesOnClick);
function moreImagesOnClick() {
  // fetchAPI.fetchImages().then(hits => render(hits, refs.galleryRef));
  // window.scrollTo({
  //   top: document.documentElement.offsetHeight,
  //   behavior: 'smooth',
  // });
  fetchImages();
}
function fetchImages() {
  fetchAPI.fetchImages().then(hits => {
    if (hits.length == 0) {
      return;
    }
    render(hits, refs.galleryRef);
    refs.moreImagesBtnRef.classList.remove('is-hidden');
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}
function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const lightBox = basicLightbox.create(`
        <img src="${event.target.dataset.source}" alt="" />
      `);
  lightBox.show();
}
refs.galleryRef.addEventListener('click', onImageClick);
