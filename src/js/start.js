import refs from './refs';
import fetchAPI from './fetchAPI';
import render from './renderGallery';
import * as basicLightbox from 'basiclightbox';
import '../styles/basicLightbox.min.css';

function fetchImages() {
  fetchAPI.fetchImages().then(hits => {
    render(hits, refs.galleryRef);
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}
function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const searchTag = form.elements.query.value;
  fetchAPI.tag = searchTag;
  refs.galleryRef.innerHTML = '';
  refs.moreImagesBtnRef.classList.add('is-hidden');
  fetchAPI.resetPageToFirst();
  fetchImages();
}
refs.searchFormRef.addEventListener('submit', onSubmit);
refs.moreImagesBtnRef.addEventListener('click', moreImagesOnClick);
function moreImagesOnClick() {
  fetchImages();
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
