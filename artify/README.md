## Artify

This repository contains an art gallery built using HTML, CSS and JavaScript. It was built using Vite. Please follow the instructions to set it up.


### Local

1. Clone the repo and run ``npm install``
2. From the artify folder run ``npm run dev``

### Deployment

1. Install Surge.sh using ``npm install --global surge``
2. Build the dist file using ``npm run dev``
3. From the dist folder run ``surge``


***


**About the Project**

Made as a part of Hackathon conducted by upGrad dated 22nd September 2023 to 25th September 2023. The task was to create a fully responsive website using only HTML, CSS and JavaScript that would fetch artworks from unsplash API and display on the website like an art gallery.

**Features**

1. Artworks are fetched from unsplash API.
2. Several categories of artworks (Modern, Classic, Abstract, etc).
3. Artworks can be viewed in bigger size.
4. Can be favourited and removed from favourites.
5. Fully responsive for 3 sizes (Desktop, tablet and mobile phones)

[App Demo](https//www.myapp.com)



---

***Example Code to fetch photos from unsplash API***

```js
    const unsplash = createApi({
        accessKey: 'API-KEY',
    });

    // Function to fetch images for a specific page
    const fetchImagesForPage = async (page) => {
        try {
            const result = await unsplash.search.getPhotos({
            query: 'Art',
            page: 1,
            perPage: 8,
            orientation: 'squarish',
            orderBy: 'latest',
        });

        if (result.type === 'success') {
            const photos = result.response.results;

            const getUrls = photos.map((i) => {
                console.log(i);
                // Loop through the objects
            });
        };
    }
        
```

### Explanation

1. query: Photos having this query as a tag or search option option are fetched.
2. page: It indicates the search page number we want to fetch.
3. perPage: Number of objects per page (Max: 30).
4. orientation: portrait, landscape or squarish
5. orderBy: It decides how the images will be sorted.


***

***Created By:***

    Ankit Suman
    ankitsuman07@gmail.com
[Portfolio Link](https://ankitsuman.netlify.app/)