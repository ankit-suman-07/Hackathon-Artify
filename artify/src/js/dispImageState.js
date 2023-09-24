class State {
    constructor() {
        this.imageID = localStorage.getItem('imageID') || ''; // Use a default value if not found
    }

    get getImageID() {
        return this.imageID;
    }

    set setImageID(ID) {
        this.imageID = ID;
        localStorage.setItem('imageID', this.imageID);
    }
}

export default new State();
