import axios from "axios";

// Document Elements
const elements = {
    menuButton: document.querySelector('.button-mobile'),
    menuIcon: document.querySelector('.fa-bars'),
    menuContent: document.querySelector('.navigation'),
    searchForm: document.querySelector('.shorten-form'),
    searchInput: document.querySelector(".shorten-form__input"),
    linkRes: document.querySelector(".shorten-link"),
    linkResList: document.querySelector(".shorten-link__item")
}

const state = {};

class Links {
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


// Shortening Form
function formHandler() {

}

function sendRequest() {
    axios.post('https://rel.ink/api/links/', { url: elements.searchInput.value }).then(response => {
        //console.log(response.data);
        state.searchData = response.data
        console.log(state.searchData);
        //const newLink = state.links.addLink(id, url);
    }).catch(() => {
        alert("Failed, but atleast this function works right?")
    })
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    sendRequest();
});

// Navigation Menu

function toggleMenu() {
    elements.menuContent.classList.toggle("navigation__is-visible");
    elements.menuIcon.classList.toggle("fa-bars");
    elements.menuIcon.classList.toggle("fa-times");
}

elements.menuButton.addEventListener("click", () => toggleMenu());
