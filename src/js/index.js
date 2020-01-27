import axios from "axios";
import validator from 'validator';
import ClipboardJS from 'clipboard';
import Links from './models/Links';
import { elements } from './views/base';

// Global state of app 
const state = {};

// Shortening Form
function renderLink(link) {
    const markup = `
    <div class="shorten-link__item">
        <p>${link.url}</p>
        <div class="shorten-link__copy-item">
            <a href="https://rel.ink/${link.id}"><span class="clipboard-copy" id="${link.id}">https://rel.ink/${link.id}</span></a>
            <button class="shorten-link__copy-button button button--rounded" data-clipboard-text="https://rel.ink/${link.id}">Copy</button>
        </div>
    </div>
    `
    elements.linkRes.insertAdjacentHTML('beforeend', markup);
}

function formHandler() {
    if (!state.links) {
        state.links = new Links();
    }

    if (elements.searchInput.value != "" & validator.isURL(elements.searchInput.value)) {
        sendRequest();
        
    } else {
        renderError();
    }
}

function sendRequest() {
    axios.post('https://rel.ink/api/links/', { url: elements.searchInput.value }).then(response => {
        
        let linkId = response.data.hashid;
        let linkUrl = response.data.url

        //console.log(state.searchData);
        const newLink = state.links.addLink(linkId, linkUrl);
        renderLink(newLink);
        elements.searchInput.value = "";
    }).catch(() => {
        alert("Failed, but atleast this function works right?")
    })
}

window.addEventListener('load', () => {
    state.links = new Links();

    state.links.readStorage();

    state.links.links.forEach(link => renderLink(link));
})

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    formHandler();
});

// Navigation Menu

function toggleMenu() {
    elements.menuContent.classList.toggle("navigation__is-visible");
    elements.menuIcon.classList.toggle("fa-bars");
    elements.menuIcon.classList.toggle("fa-times");
}

elements.menuButton.addEventListener("click", () => toggleMenu());

new ClipboardJS('.shorten-link__copy-button');