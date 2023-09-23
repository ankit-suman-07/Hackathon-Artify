import { unsplash } from "./index.js";
import FavState from "./favState.js";


const artGallery = document.querySelector('.art-gallery');

const displayID = async () => {
  try {
      const fav = FavState.getFavourite;

    const photoPromises = fav.map(async (photoId) => {
      const photo = await unsplash.photos.get({ photoId });
      return photo;
    });

    const photos = await Promise.all(photoPromises);
    photos.forEach((photo) => {
        console.log(photo.response.alt_description);
        console.log(photo.response.id);
    });

      const getUrls = photos.map((i) => {
          console.log(photos.length);
          
      if (fav.includes(i.response.id)) {
        return (
          `<div class="art">
            <img src="${i.response.urls.regular}" />
            <div class="art-details">
              <div class="art-heart">
                <img 
                  data-id="${i.id}"
                />
              </div>
              <div class="art-name">${i.response.user.name}</div>
            </div>
          </div>`
        );
      }
      return ''; // Return an empty string for non-favorite photos
    });

      artGallery.innerHTML = getUrls.join('');
      

  } catch (error) {
    console.error('Error:', error);
  }
}

displayID();