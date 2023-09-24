// imagePage.js
import State from "/js/dispImageState.js";
import { unsplash } from "/js/index.js";
import FavState from "/js/favState.js";
import EmptyHeart from "/assets/empty.png";
import FilledHeart from "/assets/filled.png";

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
            const tagsHtml = photoData.tags.map(tag => `<span class="tag">${tag.title}</span>`).join('');

            const capitalizeFirstLetter = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1) + ".";
            }

            const imageHtml = `
                <div class="art-img" >
                    <img src="${photoData.urls.regular}" />
                </div>
                <div clas="art-details" >
                    <div class="art-top" >
                        <div class="art-heart">
                            
                            <img
                                src="${src}" 
                                data-id="${photoData.id}"
                            />
                        </div>
                        <a href="${photoData.user.portfolio_url}" >
                        <div class="art-profile">
                            <img
                                src="${photoData.user.profile_image.medium}" 
                                data-id="${photoData.id}"
                            />
                        </div>
                        </a>
                    </div>
                    <div class="art-main" >
                        <div class="art-name"> <span class="detail-label" > Description: </span> ${capitalizeFirstLetter(photoData.alt_description) || "Description not available."}</div>
                        <div class="art-name"> <span class="detail-label" > Created By: </span> ${photoData.user.name || "Name not available."}</div>
                        <div class="art-name"> <span class="detail-label" > Username: </span> ${photoData.user.username || "Username not available."}</div>
                        <div class="art-name large"> <span class="detail-label" > Bio: </span> ${capitalizeFirstLetter(photoData.user.bio) || "Bio not available."}</div>
                        <div class="art-name"> <span class="detail-label" > Created On: </span> ${photoData.created_at || "Date not available."}</div>
                        <div class="art-name"> <span class="detail-label" > Portfolio: </span> <a href="${photoData.user.portfolio_url}" class="portfolio-link" > Click Here </a> </div>
                        <div class="art-name"> <span class="detail-label" > Tags: </span> <span class="large-tag" >${tagsHtml}</span></div>
                        
                    </div>                        
                </div>`;

            artGallery.innerHTML = imageHtml;

            // Add event listener to the heart image
            const heartImage = document.querySelector('.art-heart img');
            heartImage.addEventListener('click', () => {
                if (!heartImage.src.endsWith(EmptyHeart)) {
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
