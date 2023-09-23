import { createApi } from 'unsplash-js';
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";
// import addToFav from "./favourites.js";
import FavState from "./favState.js";

const artGallery = document.querySelector('.art-gallery');

export const unsplash = createApi({
  accessKey: 'NJnPX52l0KU_-gIWlM7F3Bf7XnnxFI-BvOquBZqMP0g',
});

// export const favourite = ['jQ8ym7loGtw', 'YGmFy9qW7yY', 'W89x-x_vYiY'];


unsplash.search.getPhotos({
  query: 'Modern, Classic, Contemporary, Painting, Sculptures, Abstract',
  page: 1,
  perPage: 30,
  orientation: 'squarish',
  orderBy: 'latest',
}).then((result) => {
  if (result.type === 'success') {
    const photos = result.response.results;
    
    // console.log(photos);
    // favouriteId.push(unsplash.photos.get({photoId:'jQ8ym7loGtw' }));

    const getUrls = photos.map((i) => {
      const favList = FavState.getFavourite;
      const isFavorite = favList.includes(i.id);
      const src = isFavorite ? FilledHeart : EmptyHeart;
      return (
        `<div class="art">
          <img src="${i.urls.regular}" />
          <div class="art-details">
            <div class="art-heart">
              <img 
                src="${src}" 
               
                data-id="${i.id}"
                
              />
            </div>
            <div class="art-name">${i.user.name}</div>
          </div>
        </div>`
      );
    });

    
    artGallery.innerHTML = getUrls.join('');

    // Add event listeners to the heart images
    const heartImages = document.querySelectorAll('.art-heart img');
    heartImages.forEach((heartImage) => {
      const imageId = heartImage.getAttribute('data-id');
      heartImage.addEventListener('click', () => {
        console.log(imageId);
        
        if (!heartImage.src.endsWith(EmptyHeart)) {
          // Change the image to empty and update the 'isFilled' flag
          heartImage.src = EmptyHeart;
          FavState.removeFav(imageId);
        }
        else {
          heartImage.src = FilledHeart;

          FavState.setFavourite = imageId;
        }
      });
    });
    
  }
});


