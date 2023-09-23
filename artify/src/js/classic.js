import { createApi } from 'unsplash-js';
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";
import FavState from "./favState.js";

const artGallery = document.querySelector('.art-gallery');
let page = 1; // Initialize page as 1

export const unsplash = createApi({
  accessKey: 'NJnPX52l0KU_-gIWlM7F3Bf7XnnxFI-BvOquBZqMP0g',
});

// Function to fetch images for a specific page
const fetchImagesForPage = async (page) => {
  try {
    const result = await unsplash.search.getPhotos({
      // 'Modern, Classic, Contemporary, Painting, Sculptures, Abstract'
      query: 'Classic',
      page: page,
      perPage: 12,
      orientation: 'squarish',
      orderBy: 'latest',
    });

    if (result.type === 'success') {
      const photos = result.response.results;

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

      artGallery.innerHTML += getUrls.join('');

      // Add event listeners to the heart images for this page
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
  } catch (error) {
    console.error('Error:', error);
  }
};

const nextPage = () => {
  if (page < 3) {
    page++; // Increment page before fetching the next page
    fetchImagesForPage(page);
  }
}

// Add an event listener to the "Next" button
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', nextPage);

// Initial fetch for the first page
fetchImagesForPage(page);
