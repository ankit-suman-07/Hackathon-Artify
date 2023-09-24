// imagePage.js
import State from "./dispImageState.js";
import { unsplash } from "./index.js";
import FavState from "./favState.js";
import EmptyHeart from "../assets/empty.png";
import FilledHeart from "../assets/filled.png";

const artGallery = document.querySelector('.art-gallery');

const displayImage = async () => {
    try {
        const imageId = State.getImageID;
        console.log(imageId);

        const photo = await unsplash.photos.get({ photoId: imageId });
        if (photo.type === 'success') {
            const photoData = photo.response;

            const favList = FavState.getFavourite;
            const isFavorite = favList.includes(photoData.id);
            const src = isFavorite ? FilledHeart : EmptyHeart;

            const imageHtml = `
                <div class="art-opened">
                    <div  >
                    
                    </div>
                    <img src="${photoData.urls.regular}" />
                    <div class="art-details">
                        <div class="art-heart">
                            <img 
                                src="${src}" 
                                data-id="${photoData.id}"
                            />
                        </div>
                        <div class="art-name">${photoData.user.name}</div>
                    </div>
                </div>`;

            artGallery.innerHTML = imageHtml;

            // Add event listener to the heart image
            const heartImage = document.querySelector('.art-heart img');
            heartImage.addEventListener('click', () => {
                if (!heartImage.src.endsWith(EmptyHeart)) {
                    // Change the image to empty and update the 'isFilled' flag
                    heartImage.src = EmptyHeart;
                    FavState.removeFav(imageId);
                } else {
                    heartImage.src = FilledHeart;
                    FavState.setFavourite = imageId;
                }
            });
        } else {
            console.error('Error fetching photo details:', photo.errors);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

displayImage();
