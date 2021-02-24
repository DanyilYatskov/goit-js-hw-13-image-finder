import refs from './refs';
import fetchAPI from './fetchAPI';
import render from './renderGallery';
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
  fetchAPI.fetchImages().then(hits => {
    if (hits.length == 0) {
      return;
    }
    refs.moreImagesBtnRef.classList.remove('is-hidden');
    return render(hits, refs.galleryRef);
  });
});
refs.moreImagesBtnRef.addEventListener('click', moreImagesOnClick);
function moreImagesOnClick() {
  fetchAPI.fetchImages().then(hits => render(hits, refs.galleryRef));
}
