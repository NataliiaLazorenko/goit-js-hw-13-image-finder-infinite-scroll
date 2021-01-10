const apiKey = '19732926-c388afddba2de31b45aabc7bd';
const photosPerPage = 12;

export default {
  page: 1,
  searchQuery: '',

  fetchPhotos() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${photosPerPage}&key=${apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
