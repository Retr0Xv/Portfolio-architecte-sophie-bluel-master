let works = [];
let worksFiltered = [];
let categories = [];
const projects = document.querySelector('.projects');
const gallery = document.querySelector('.gallery');

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        categories = await response.json();

/*        categories.map((category) => {
            const li = document.createElement('li');
            li.textContent = category.name;
            li.className = 'liButton';
            li.dataset.id = ''
            projects.appendChild(li);
        })*/

        projects.innerHTML = '<li class="all">Tous</li>';
        projects.innerHTML += categories.map((category) => {
            return `<li data-id=${category.id}>${category.name}</li>`
        }).join(' ');

    } catch (error) {
        console.log(error);
    }
}

async function fetchWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        works = await response.json();
        displayWorks(works);
    } catch (error) {
        console.log(error);
    }
}

async function filterWorks() {
    const buttonsFilter = document.querySelectorAll('.projects li');
    worksFiltered = works;

    buttonsFilter.forEach((button) => button.addEventListener('click', () => {

        // gérer la css ici pour quand on clique sur un des filtres, qu'il reste en vert et que ça supprime le vert sur les autres.
        buttonsFilter.forEach((buttonFilter) => buttonFilter.classList.remove('active'));
        button.classList.add('active');

/*        if (button.classList.contains('all')) {
            worksFiltered = works;
        } else {
            worksFiltered = works.filter(work => work.categoryId == button.dataset.id);
        }*/

        worksFiltered = button.classList.contains('all')
            ? works
            : works.filter(work => work.categoryId == button.dataset.id);

        displayWorks(worksFiltered);
    }))
}

function displayWorks(data) {
    gallery.innerHTML = data.map((work) => {
        return `<figure>
                <img src=${work.imageUrl} alt=${work.title}/>
                <figcaption>${work.title}</figcaption>
            </figure>`
    }).join(' ');
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories();
    await fetchWorks();
    await filterWorks();
})