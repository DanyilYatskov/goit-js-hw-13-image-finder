const myKey = '20320156-7ced8cd7704588c90dd479ccb';

export default {
  searchTag: '',
  page: 1,
  fetchImages(searchTag, page = 1) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchTag}&page=${page}&per_page=12&key=${myKey}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
    });
  },
};
