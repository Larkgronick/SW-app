import {generateData, loadPlanets, loadFilms, loadSpecies, loadVehicles} from './loadData.js';



let category;
let categorySelected = false;
let currentPageInfo;


const firstPage = 1;
const apiURL = 'https://www.swapi.tech/api/';
const searchURL = 'https://swapi.dev/api/';

const cardsField = document.querySelector('.card-body');
const categories = document.querySelectorAll(`.nav-link`);
const paginator = document.createElement('ul');
const introImage = document.querySelector('.starwars-demo');
const loader = document.querySelector('.lds-facebook');
const search = document.getElementById('search');
const searchField = document.querySelector('.search-field');
const save = document.getElementById('save');
const load = document.getElementById('load');
const themeSwitcher = document.getElementById('customSwitch1');




window.onload = function loadSavedData() {
    let theme = localStorage.getItem('theme');

    if (theme === 'dark') {
        themeSwitcher.checked = true;
    } else {
        themeSwitcher.checked = false;
    }
    changeTheme();

}

categories.forEach(el => {
    el.addEventListener('click', (e) => {
    
        categories.forEach(el => {
            let linkStyle = el.classList[2];
            if(linkStyle) {
            el.classList.remove('selected') 
        }});

        e.target.classList.add('selected');
        category = el.innerHTML;

        loadCategory(el.innerHTML, firstPage);

    });
})

paginator.addEventListener('click', moveToPage);
search.addEventListener('click', searchValue);
save.addEventListener('click', saveData);
load.addEventListener('click', loadData);
themeSwitcher.addEventListener('click', changeTheme);

function loadCategory(category, page) {
    cardsField.innerHTML = '';
    introImage.style.display = 'none';
    loader.style.display = 'inline-block';
    categorySelected = true;

    fetch(`${apiURL}${category}?page=${page}&limit=10`)
        .then(res => res.json())
        .then(data => {
            loadDetails(data, category, page);
            loader.style.display = 'none';
        })
        .catch(notifyByError);

}

function loadDetails(data, category, page){
    if (category !== 'Films') {
        let pages = data.total_pages;
        let urls = data.results.map(el => el.url);
        let requests = urls.map(url => fetch(url));

        Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(items => {
            let info = items.map(item => item.result.properties);

            generateCards(info, category);
            generatePagination(pages, page);
        })
        .catch(notifyByError)

    } else {
        let info = data.results.map(item => item.properties);

        generateCards(info, category);
    }
}

function generateCards(info, category) {  
        currentPageInfo = info;
        let cardsContainer = document.createElement('div');
        cardsContainer.className = 'card-columns';
        cardsField.appendChild(cardsContainer);

    for (let i = 0; i < info.length; i++) {
        let card = document.createElement('div');
        card.className = 'card cover';
        if (themeSwitcher.checked) {
            card.classList.add('dark-side');
        }
        cardsContainer.appendChild(card);

        generateData(info, card, i, category);

        } 

}

function generatePagination(pages, page) { 
    paginator.innerHTML = '';
    paginator.className ='pagination';
    cardsField.appendChild(paginator);

    for (let i = 1;  i <= pages; i++) {
        let li = document.createElement('li');
        li.className ='page-item';
        let a = document.createElement('a');
        a.className = 'page-link';

        if (themeSwitcher.checked) {
            a.classList.add('dark-side');
        }

        a.innerText = i;

        paginator.appendChild(li);
        li.appendChild(a);

        if(i === page){
            li.classList.add('active');
        } 
    }
}

function getSearchData(category, value) {
    cardsField.innerHTML = '';
    fetch(`${searchURL}${category.toLowerCase()}/?search=${value}`)
    .then(res => res.json())
    .then(data => {
        if (!data.results.length) {
            showMessage(`Don’t blame me. I’m an interpreter. I’m not supposed to know every ${category.toLowerCase()} in the Galaxy .`)
        }
       
        generateCards(data.results, category);

    })
    .catch(console.log);

}

function moveToPage(e){
    let userChoice = e.target.innerText;
    window.scrollTo(0, 0);
    loadCategory(category, userChoice);
    
}

function notifyByError(err) {
    console.log(err);
    showMessage('Data is in a galaxy far, far away. Please, try later...');

}

function searchValue(e) {
    e.preventDefault();
    let input = searchField.value;

    if (!categorySelected) {
        showMessage('Please, select category first');
    } else {
        getSearchData(category, input);
    }

}

function showMessage(text) {
        cardsField.innerHTML = '';
        introImage.style.display = 'none';
        let message = document.createElement('h5');
        message.className = 'message display-4';
        message.innerText = text;
        cardsField.appendChild(message);

}

function saveData() {
  let toSave = JSON.stringify(currentPageInfo);
  let saved = localStorage.getItem('info');
    
    if (saved === toSave) {
        alert('Data is already saved!')
    } else {
        localStorage.setItem('info', toSave);
        localStorage.setItem('category', category);
        alert('Saved!')
    }
    
    if (themeSwitcher.checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'white');
    }

}

function loadData() {
    let saved = localStorage.getItem('info');

    if (saved !== "undefined") {
        cardsField.innerHTML = '';
        introImage.style.display = 'none';
        
        let info = JSON.parse(saved);
        let category = localStorage.getItem('category');

        generateCards(info, category);
    }
    
}

function changeTheme(){
    let navItems = Array.from(document.querySelectorAll('.nav-link'));    
    let cards = Array.from(document.querySelectorAll('.cover'));   
    let pages =  Array.from(document.querySelectorAll('.page-link'));    
    let elements = navItems.concat(cards).concat(pages);

    if(themeSwitcher.checked){
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('white-side');   
            elements[i].classList.add('dark-side');   
        }
        
        searchField.classList.add('dark-side');
        searchField.classList.remove('white-side');
        themeSwitcher.nextElementSibling.textContent = 'Dark Side';
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('dark-side');   
            elements[i].classList.add('white-side');   
        }
        searchField.classList.add('white-side');
        searchField.classList.remove('dark-side');
        themeSwitcher.nextElementSibling.textContent = 'White Side';

    }

}
