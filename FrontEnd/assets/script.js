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
                <i id="delete-work" data-id=${work.id}>class="fa-solid fa-trash-can"</i>
                <img src=${work.imageUrl} alt=${work.title}/>
            </figure>`
    }).join(' ');
}

async function deleteWorkOnClick() {
    const iconsDelete = document.querySelectorAll('.delete-work');
    iconsDelete.forEach((icon) => icon.addEventListener('click', async () => {
        const response = await fetch(`http://localhost:5678/api/works/${icon.dataset.id}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`}
        })
        if (response.status === 200 || 204) {
            // Delete image (<figure>) dans homepage et modal
        } else if (response.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log("erreur");
        }
    }))
}

async function addWorkOnClick() {
/*    const image = document.querySelector()
    const title = document.querySelector()
    const category = document.querySelector()

    const formData = new FormData();
    formData.append("image", image)
    formData.append("title", title)
    formData.append("category", category)

    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`}
        body: formData
    })

    if (response.status === 201 ) {
        // Ajouter le work dans homepage et modal
    } else if (response.status === 401) {

    }*/
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories();
    await fetchWorks();
    await filterWorks();
    await deleteWorkOnClick();
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


const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

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

fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {
  data.forEach(categorie => {
    const option = document.createElement('option');
    option.value = data.id;
    option.text = data.id;
    document.getElementById('categorie').appendChild(option);
  });
})
.catch(error => console.error(error));