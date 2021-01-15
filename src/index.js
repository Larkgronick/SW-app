import {loadPeople, loadPlanets, loadFilms, loadSpecies, loadVehicles} from './loadData.js';

let category;
let categorySelected = false;
const cardsField = document.querySelector('.card-body');
const categories = document.querySelectorAll(`.nav-link`);
const paginator = document.createElement('ul');
const introImage = document.querySelector('.starwars-demo');
const loader = document.querySelector('.lds-facebook');
const search = document.getElementById('search');
const searchField = document.querySelector('.search-field');

categories.forEach(el => {
    el.addEventListener('click', (e) => {
        categories.forEach(el => {
            if(el.classList[2]){
            el.classList.remove('selected') 
        }});
        e.target.classList.add('selected');
        category = el.innerHTML;
        loadCategory(el.innerHTML, 1);
    });
})

function getSearchData(category, value) {
    cardsField.innerHTML = '';
    fetch(`https://swapi.dev/api/${category.toLowerCase()}/?search=${value}`)
    .then(res => res.json())
    .then(data => {
        if (data.results.length === 0) {
            showMessage(`Don’t blame me. I’m an interpreter. I’m not supposed to know every ${category.toLowerCase()} in the Galaxy .`)
        }
       
        generateCards(data.results, category)
    })
    .catch(err => console.log(err));
}


function loadCategory(category, page) {
    cardsField.innerHTML = '';
    introImage.style.display = 'none';
    loader.style.display = 'inline-block';
    categorySelected = true;
    fetch(`https://www.swapi.tech/api/${category}?page=${page}&limit=10`)
        .then(res => res.json())
        .then(data => loadDetails(data, category, page))
        .then(() => loader.style.display = 'none')
        .catch(err => notifyByError(err.status));
}

function loadDetails(data, category, page){
    if (category !== "Films") {
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
        .catch(err => notifyByError(err))
    } else {
        let info = data.results.map(item => item.properties);
        console.log(info);
        generateCards(info, category);
    }
}

function generateCards(info, category) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = 'card-columns';
        cardsField.appendChild(cardsContainer);

    for (let i = 0; i < info.length; i++) {
        let card = document.createElement('div');
        card.className = 'card cover';
        cardsContainer.appendChild(card);

        switch (category) {
            case 'People':
                loadPeople(info, card, i);
                break;
            case 'Planets':
                loadPlanets(info, card, i);
                break;  
            case 'Films':
                loadFilms(info, card, i);
                break;
            case 'Species':
                loadSpecies(info, card, i);
                break;    
            case 'Vehicles':
                loadVehicles(info, card, i);
                break;  
            case 'Starships':
                loadVehicles(info, card, i);
                break;     
            default:
                break;
            }
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
        a.innerText = i;
        paginator.appendChild(li);
        li.appendChild(a);
        if(i == page){
            li.classList.add('active');
        } 
    }
}

paginator.addEventListener('click', moveToPage)

function moveToPage(e){
    let userChoice = e.target.innerText;
    window.scrollTo(0, 0);
    loadCategory(category, userChoice)
    
}

function notifyByError(err) {
    console.log(err);
    showMessage('Data is in a galaxy far, far away. Please, try later...');

}

search.addEventListener('click', searchValue);

function searchValue(e) {
    e.preventDefault();
    let input = searchField.value;
    console.log(input)
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
