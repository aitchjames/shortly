export default class Links {
    constructor() {
        this.links = [];
    }

    addLink(id, url) {
        const link = {id, url};
        this.links.push(link);

        // Persist data in localStorage
        this.persistData();
        return link;
    }

    persistData() {
        localStorage.setItem('links', JSON.stringify(this.links));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('links'));

        // Restore links from localStorage
        if (storage) this.links = storage;
    }
}