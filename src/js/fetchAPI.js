import refs from './refs';
import { info, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

const myKey = '20320156-7ced8cd7704588c90dd479ccb';

function notice(type, header, message) {
  type({
    title: header,
    text: message,
  });
}

export default {
  searchTag: '',
  page: 1,
  itemsOnPage: 12,
  fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchTag}&page=${this.page}&per_page=${this.itemsOnPage}&key=${myKey}`;
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        if (response.hits.length == 0) {
          notice(
            alert,
            'No matches found',
            'There is No images with such tag please try again',
          );
          return;
        }
        if (response.total > 12) {
          refs.moreImagesBtnRef.classList.remove('is-hidden');
        }
        this.page += 1;
        return response.hits;
      });
  },
  resetPageToFirst() {
    this.page = 1;
  },
  get tag() {
    return this.searchTag;
  },
  set tag(value) {
    this.searchTag = value;
  },
};
