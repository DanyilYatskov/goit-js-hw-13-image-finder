const myKey = '20320156-7ced8cd7704588c90dd479ccb';

export default {
  searchTag: '',
  page: 1,
  itemsOnPage: 12,
  fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchTag}&page=${this.page}&per_page=${this.itemsOnPage}&key=${myKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
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
