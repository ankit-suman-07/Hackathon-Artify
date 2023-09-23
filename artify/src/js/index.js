import { createApi } from 'unsplash-js';
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";

const artGallery = document.querySelector('.art-gallery');
const unsplash = createApi({
  accessKey: 'NJnPX52l0KU_-gIWlM7F3Bf7XnnxFI-BvOquBZqMP0g',
});

unsplash.search.getPhotos({
  query: 'Modern Art',
  page: 1,
  perPage: 12,
  orientation: 'squarish',
  orderBy: 'latest'
}).then(result => {
  if (result.type === 'success') {
    const photos = result.response.results;
    console.log(photos);
    const getUrls = photos.map((i) => {
      return(
      `<div class="art" >
        <img src="${i.urls.regular}" />
        <div class="art-details" >
          <div class="art-heart" > <img src="${FilledHeart}" />  </div>
          <div class="art-name" > ${i.user.name} </div>
        </div>
      </div>`);
    })
    artGallery.innerHTML = getUrls.join('');
  }
})