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

function loadProperties(card, captionText, info, key, i){
    let caption = document.createElement('p');
    caption.innerText = captionText;
    card.appendChild(caption);
    let value = document.createElement('span');
    value.className = 'badge badge-secondary';
    value.innerText = info[i][key]
    caption.appendChild(value);

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

export {loadPeople, loadPlanets, loadFilms, loadSpecies, loadVehicles};
