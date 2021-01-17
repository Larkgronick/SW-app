const titles = {
    people: ['Gender: ', 'Height: ','Mass: ', 'Hair color: ', 'Skin: ', 'Eye: ', 'Birth: '],
    planets: ['Diameter: ', 'Gravity: ','Orbital period: ', 'Population: ', 'Rotation period: ', 'Terrain: ', 'Climate: '],
    films: ['Episode: ', 'Director: ','Opening crawl: ', 'Release date: '],
    species: ['Average height: ', 'Average lifespan: ','Classification: ', 'Eye colors: ', 'Hair colors: ', 'Skin colors: ', 'Language: '],
    vehicles: ['Length: ', 'Cargo capacity: ','Cost in credits: ', 'Crew: ', 'Max atmosphering speed: ', 'Model: ', 'Manufacturer: '],
    starships: ['Length: ', 'Cargo capacity: ','Cost in credits: ', 'Crew: ', 'Max atmosphering speed: ', 'Model: ', 'Manufacturer: ']
}

const keys = {
    people: ['gender', 'height','mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year'],
    planets: ['diameter', 'gravity','orbital_period', 'population', 'rotation_period', 'terrain', 'climate'],
    films: ['episode_id', 'director','opening_crawl', 'release_date'],
    species: ['average_height', 'average_lifespan','classification', 'eye_colors', 'hair_colors', 'skin_colors', 'language'],
    vehicles: ['length', 'cargo_capacity','cost_in_credits', 'crew', 'max_atmosphering_speed', 'model', 'manufacturer'], 
    starships: ['length', 'cargo_capacity','cost_in_credits', 'crew', 'max_atmosphering_speed', 'model', 'manufacturer'] 
}

function loadName(card, info, i){
    let name = document.createElement('h5');
    name.className = 'card-title';
    if ('title' in info[i]) {
        name.innerText = info[i].title;
    } else {
        name.innerText = info[i].name;
    }
    card.appendChild(name);
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

function generateData(info, card, i, category) {
    category = category.toLowerCase();
    loadName(card, info, i);
    titles[category].forEach((el, index) =>  loadProperties(card, titles[category][index], info, keys[category][index], i));

}

export {generateData};
