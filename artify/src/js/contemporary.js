import { createApi } from 'unsplash-js';
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";

const artGallery = document.querySelector('.art-gallery');
const unsplash = createApi({
  accessKey: 'NJnPX52l0KU_-gIWlM7F3Bf7XnnxFI-BvOquBZqMP0g',
});



unsplash.search.getPhotos({
  query: 'Contemporary',
    page: 1,
  perPage: 30,
  orientation: 'squarish',
  orderBy: 'latest',
}).then((result) => {
  if (result.type === 'success') {
    const photos = result.response.results;

    const getUrls = photos.map((i) => {
      
      
      
      return (
        `<div class="art">
          <img src="${i.urls.regular}" />
          <div class="art-details">
            <div class="art-heart">
              <img 
                src="${EmptyHeart}" 
                data-empty="${EmptyHeart}" 
                data-filled="${FilledHeart}" 
                data-id="${i.id}"
              />
            </div>
            <div class="art-name">${i.user.name}</div>
          </div>
        </div>`
      );
    });

    artGallery.innerHTML = getUrls.join('');
  }
});