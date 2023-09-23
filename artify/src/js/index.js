import { createApi } from 'unsplash-js';
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";

const artGallery = document.querySelector('.art-gallery');
const unsplash = createApi({
  accessKey: 'NJnPX52l0KU_-gIWlM7F3Bf7XnnxFI-BvOquBZqMP0g',
});

export const all = [];

unsplash.search.getPhotos({
  query: 'Art',
  page: 1,
  perPage: 100,
  orientation: 'squarish',
  orderBy: 'latest',
}).then((result) => {
  if (result.type === 'success') {
    const photos = result.response.results;

    const getUrls = photos.map((i) => {
      all.push(i);
      
    });

    // artGallery.innerHTML = getUrls.join('');
  }
});