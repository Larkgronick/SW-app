const cardsField = document.querySelector('.card-body');
const categories = document.querySelectorAll(`.nav-link`);


categories.forEach(el => {
    el.addEventListener('click', () => loadCategory(el.innerHTML, 1));
})


function loadCategory(category, page) {
    cardsField.innerHTML = '';
    fetch(`https://www.swapi.tech/api/${category}?page=${page}&limit=10`)
        .then(res => res.json())
        .then(data => loadDetails(data))
        .catch(err => console.log(err)) // deal with errors
}

function loadDetails(data){
    let pages = data.total_pages;
    console.log(data)
    let urls = data.results.map(el => el.url);
    let requests = urls.map(url => fetch(url));
    Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(items => {
        let info = items.map(item => item.result.properties);
        generateCards(info);
        generatePagination(pages);
    })
    .catch(err => console.log(err))
}

function generateCards(info) {
    let cardsContainer = document.createElement('div');
    cardsContainer.className = 'card-columns';
    cardsField.appendChild(cardsContainer);

    let card = document.createElement('div');
    card.className = 'card';
    cardsContainer.appendChild(card);

    console.log(info)

    // cardsField.appendChild(card)
    let title = document.createElement('h5');
    card.appendChild(title);

    // info.forEach(el => {

      
    // })

    

}

function generatePagination(pages) {
    let elements = pages + 1;  
    let paginator = document.createElement('ul');
    paginator.className ='pagination';
    cardsField.appendChild(paginator);

    for (let i = 0;  i <= elements; i++) {
        let li = document.createElement('li');
        li.className ='page-item';
        let a = document.createElement('a');
        a.className = 'page-link';
        a.innerText = i;
        paginator.appendChild(li);
        li.appendChild(a);    
        if(i == 0){
            li.className ='page-item disabled';
            a.innerText = 'Previous';
        }
        if (i == elements) {
            a.innerText = 'Next';
        }
    }
}









