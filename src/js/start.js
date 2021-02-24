import refs from './refs';
import fetchAPI from './fetchAPI';
import render from './renderGallery';
import * as basicLightbox from 'basiclightbox';
import '../styles/basicLightbox.min.css';
import { info, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
function notice(type, header, message) {
  type({
    title: header,
    text: message,
  });
}
function fetchImages() {
  fetchAPI.fetchImages().then(hits => {
    if (hits.length == 0) {
      notice(
        alert,
        'No matches found',
        'There is No images with such tag please try again',
      );
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
