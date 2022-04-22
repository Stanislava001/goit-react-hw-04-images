import axios from 'axios';
const API_KEY = '24835779-0f65b5f1ebc58d529319d0b23';
const BASE_URL = 'https://pixabay.com/api/';

const getImages = ({ searchQuery = ' ', page = 1, perPage = 12 }) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then(res => res.data.hits);
};

//res => res.data.images
export default { getImages };
