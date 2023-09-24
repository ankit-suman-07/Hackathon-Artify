import { unsplash } from "/js/index.js";
import FavState from "/js/favState.js";
import EmptyHeart from "/assets/empty.png";
import FilledHeart from "/assets/filled.png";
import State from "/js/dispImageState.js";


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
      const favList = FavState.getFavourite;
      const isFavorite = favList.includes(i.response.id);
      const src = isFavorite ? FilledHeart : EmptyHeart;

      if (fav.includes(i.response.id)) {
        return (
          `<div class="art">
            <img src="${i.response.urls.regular}" />
            <div class="art-details">
              <div class="art-heart">
                <img 
                  src="${src}" 
                  data-id="${i.response.id}"
                />
              </div>
              <a href="/pages/imagePage.html" class="art-view-btn" data-id="${i.response.id}" > View Image </a>
            </div>
          </div>`
        );
      }
      return ''; // Return an empty string for non-favorite photos
    });
    const favCount = document.querySelector('.fav-count'); // Select the first element with the class 'fav-count'
    if (favCount) {
      favCount.textContent = photos.length.toString(); // Convert the number to a string and update the text content
    }


    artGallery.innerHTML = getUrls.join('');

    const a_tag = document.querySelectorAll('.art-view-btn');
    a_tag.forEach((btn) => {
      const imageId = btn.getAttribute('data-id');
      btn.addEventListener('click', () => {
        State.setImageID = imageId;
        console.log(State.getImageID);
      });
    });

    // Add event listeners to the heart images for this page
    const heartImages = document.querySelectorAll('.art-heart img');
    heartImages.forEach((heartImage) => {
      const imageId = heartImage.getAttribute('data-id');
      heartImage.addEventListener('click', () => {


        if (!heartImage.src.endsWith(EmptyHeart)) {
          // Change the image to empty and update the 'isFilled' flag
          heartImage.src = EmptyHeart;
          FavState.removeFav(imageId);
        }
        else {
          heartImage.src = FilledHeart;
          FavState.setFavourite = imageId;
        }
        const favCount = document.querySelector('.fav-count'); // Select the first element with the class 'fav-count'
        if (favCount) {
          favCount.textContent = photos.length.toString(); // Convert the number to a string and update the text content
        }

      });
    });


  } catch (error) {
    console.error('Error:', error);
  }
}

displayID();