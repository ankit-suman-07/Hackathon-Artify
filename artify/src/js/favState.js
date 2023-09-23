class FavState {
  constructor() {
    // Initialize the favourite array by retrieving it from localStorage
    this.favourite = JSON.parse(localStorage.getItem('favourite')) || [];
  }

  get getFavourite() {
    return this.favourite;
  }

  set setFavourite(favID) {
    this.favourite.push(favID);

    // Update the favourite array in localStorage
    localStorage.setItem('favourite', JSON.stringify(this.favourite));
  }

  removeFav(favID) {
    this.favourite = this.favourite.filter(fav => fav !== favID); // Use "this" to access the class property
    // Update the favourite array in localStorage after removing the element
    localStorage.setItem('favourite', JSON.stringify(this.favourite));
  }
}

export default new FavState();
