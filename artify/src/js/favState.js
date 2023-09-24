class FavState {
  constructor() {
    this.favourite = JSON.parse(localStorage.getItem('favourite')) || [];
  }

  get getFavourite() {
    return this.favourite;
  }

  set setFavourite(favID) {
    this.favourite.push(favID);

    localStorage.setItem('favourite', JSON.stringify(this.favourite));
  }

  removeFav(favID) {
    this.favourite = this.favourite.filter(fav => fav !== favID);
    localStorage.setItem('favourite', JSON.stringify(this.favourite));
  }
}

export default new FavState();
