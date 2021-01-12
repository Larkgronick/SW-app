const cardsField = document.querySelector('.card-body');
const categories = document.querySelectorAll(`.nav-link`);
const paginator = document.createElement('ul');
const loader = document.querySelector('.starwars-demo')
let category;

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


function loadCategory(category, page) {
    cardsField.innerHTML = '';
    loader.style.display = 'flex';
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


function loadName(card, info, i){
    let name = document.createElement('h5');
    name.className = 'card-title'
    name.innerText = info[i].name;
    card.appendChild(name);
}

function loadTitle(card, info, i){
    let name = document.createElement('h5');
    name.className = 'card-title'
    name.innerText = info[i].title;
    card.appendChild(name);
}




function loadPeople(info, card, i) {
    loadName(card, info, i);
    loadProperties(card, "Gender: ", info, 'gender', i);
    loadProperties(card, "Height: ", info, 'height', i);
    loadProperties(card, "Mass: ", info, 'mass', i);
    loadProperties(card, "Hair: ", info, 'hair_color', i);
    loadProperties(card, "Skin: ", info, 'skin_color', i);
    loadProperties(card, "Eye: ", info, 'eye_color', i);
    loadProperties(card, "Birth: ", info, 'birth_year', i);

}


function loadPlanets(info, card, i) {
    loadName(card, info, i);
    loadProperties(card, "Diameter: ", info, 'diameter', i);
    loadProperties(card, "Gravity: ", info, 'gravity', i);
    loadProperties(card, "Orbital period: ", info, 'orbital_period', i);
    loadProperties(card, "Population: ", info, 'population', i);
    loadProperties(card, "Rotation period: ", info, 'rotation_period', i);
    loadProperties(card, "Terrain: ", info, 'terrain', i);
    loadProperties(card, "Climate: ", info, 'climate', i);
}

function loadFilms(info, card, i) {
    loadTitle(card, info, i);
    loadProperties(card, "Episode: ", info, 'episode_id', i);
    loadProperties(card, "Director: ", info, 'director', i);
    loadProperties(card, "Opening crawl: ", info, 'opening_crawl', i);
    loadProperties(card, "Release date: ", info, 'release_date', i);
}

function loadSpecies(info, card, i) {
    loadName(card, info, i);
    loadProperties(card, "Average height: ", info, 'average_height', i);
    loadProperties(card, "Average lifespan: ", info, 'average_lifespan', i);
    loadProperties(card, "Classification: ", info, 'classification', i);
    loadProperties(card, "Eye colors: ", info, 'eye_colors', i);
    loadProperties(card, "Hair colors: ", info, 'hair_colors', i);
    loadProperties(card, "Skin colors: ", info, 'skin_colors', i);
    loadProperties(card, "Language: ", info, 'language', i);
}

function loadVehicles(info, card, i) {
    loadName(card, info, i);
    loadProperties(card, "Length: ", info, 'length', i);
    loadProperties(card, "Cargo capacity: ", info, 'cargo_capacity', i);
    loadProperties(card, "Cost in credits: ", info, 'cost_in_credits', i);
    loadProperties(card, "Crew: ", info, '46', i);
    loadProperties(card, "Max atmosphering speed: ", info, 'max_atmosphering_speed', i);
    loadProperties(card, "Model: ", info, 'model', i);
    loadProperties(card, "Manufacturer: ", info, 'manufacturer', i);
}

function loadProperties(card, captionText, info, key, i){
    let caption = document.createElement('p');
    caption.innerText = captionText;
    card.appendChild(caption);
    let value = document.createElement('span');
    value.className = 'badge badge-secondary';
    value.innerText = info[i][key]
    caption.appendChild(value);

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
    if(err = 429){
        let cardsContainer = document.createElement('div');
        cardsContainer.className = 'card-columns';
        cardsField.appendChild(cardsContainer);

        let message = document.createElement('h5');
        message.className = 'display-4';
        message.innerText = 'Data is in a galaxy far, far away. Please, try later...';
        cardsContainer.appendChild(message);
    }
}
