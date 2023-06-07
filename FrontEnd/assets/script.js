let works = [];
let worksFiltered = [];
let categories = [];
const projects = document.querySelector('.projects');
const gallery = document.querySelector('.gallery');
const gallerymod = document.querySelector('.gallerymod');

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
        displayWorksmod(works);
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

function displayWorksmod(data) {
    gallerymod.innerHTML = data.map((work) => {
        return `<figure>
                <img src=${work.imageUrl} alt=${work.title}/>
            </figure>`
    }).join(' ');
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories();
    await fetchWorks();
    await filterWorks();
})

function handleLogout() {
    
    localStorage.removeItem('accessToken');
    window.location.reload();}

const token = localStorage.getItem('accessToken');
const loginButton = document.querySelector('.loginButton');
const loginproject = document.querySelector('.loginproject')
const modalbutton = document.querySelector('.modalbutton')

if (token) {
  
  loginButton.textContent ='Logout';
  loginButton.addEventListener('click', handleLogout);
  loginButton.removeAttribute ('href')
  loginproject.classList.add ('nofiltermg')
  projects.classList.add('nofilter')
  modalbutton.classList.remove ('nofilter')
} else {
  
  loginButton.textContent ='Login';
  loginButton.addEventListener('click',);
  ;
}


var openModalBtn = document.getElementById("openModalBtn");
var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
};


closeBtn.onclick = function() {
    modal.style.display = "none";
};


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};