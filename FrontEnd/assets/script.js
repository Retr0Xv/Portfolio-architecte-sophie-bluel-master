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

        /*        categories.map(categorie => {
                    const option = document.createElement('option');
                    option.value = categorie.id;
                    option.text = categorie.name;
                    document.getElementById('categorie').appendChild(option);
                });*/

        document.querySelector("#categorie").innerHTML += categories.map(categorie => {
            return `<option value=${categorie.id}>${categorie.name}</option>`
        })

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
                <i id="delete-work" class="fa-solid fa-trash-can delete-icon" data-id=${work.id}></i>
                <img src=${work.imageUrl} alt=${work.title}/>
            </figure>`
    }).join(' ');
    const iconsDelete = document.querySelectorAll('#delete-work');
    iconsDelete.forEach((icon) => icon.addEventListener('click', async () => deleteWorkOnClick(icon)));
}

async function deleteWorkOnClick(icon) {
    const response = await fetch(`http://localhost:5678/api/works/${icon.dataset.id}`, {
        method: "DELETE",
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`}
    })
    if (response.status === 200 || 204) {
        fetchWorks()
    } else if (response.status === 401) {
        console.log('Unauthorized');
    } else {
        console.log("erreur");
    }
}

async function addWorkOnClick(e) {
    e.preventDefault();
    const image = document.querySelector("#image").files[0];
    const title = document.querySelector("#titres").value
    const category = document.querySelector("#categorie").value

    const formData = new FormData();
    formData.append("image", image)
    formData.append("title", title)
    formData.append("category", category)

    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`},
        body: formData
    })

    if (response.status === 201) {
        fetchWorks()
    } else if (response.status === 401) {

    }
}

document.querySelector('.add-work').addEventListener('submit', (e) => addWorkOnClick(e))

window.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories();
    await fetchWorks();
    await filterWorks();
    await deleteWorkOnClick();
})

function handleLogout() {

    localStorage.removeItem('accessToken');
    window.location.reload();
}

const token = localStorage.getItem('accessToken');
const loginButton = document.querySelector('.loginButton');
const loginproject = document.querySelector('.loginproject')
const modalbutton = document.querySelector('.modalbutton')
const editionmode = document.getElementById('edition')
const fakebutton = document.getElementById('fakebutton')

if (token) {

    loginButton.textContent = 'Logout';
    loginButton.addEventListener('click', handleLogout);
    loginButton.removeAttribute('href')
    loginproject.classList.add('nofiltermg')
    projects.classList.add('nofilter')
    modalbutton.classList.remove('nofilter')
    editionmode.classList.remove('noedition')
    fakebutton.classList.remove('fakebutton1')
} else {

    loginButton.textContent = 'Login';
    loginButton.addEventListener('click',);
    ;
}


const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];


openModalBtn.onclick = function () {
    modal.style.display = "block";
};


closeBtn.onclick = function () {
    modal.style.display = "none";
};


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


const modal2 = document.getElementById("myModal2");
const closeBtn2 = document.getElementsByClassName("close2")[0];


closeBtn2.onclick = function () {
    modal2.style.display = "none";
};


window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
};


document.querySelector('.buttonadd').addEventListener('click', () => {
    const modal2 = document.getElementById("myModal2");
    modal.style.display = "none";
    modal2.style.display = "block";

})

document.getElementsByClassName("return")[0].addEventListener('click', () => {
    const modal2 = document.getElementById("myModal2");
    modal.style.display = "block";
    modal2.style.display = "none";


})


document.querySelector('#image').addEventListener('change', (e) => previewImage(e))

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('imagePreview');
    const label = document.querySelector('.modalimageinput');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
            preview.style.display = 'block';
            label.style.display = 'none';
        }

        reader.readAsDataURL(input.files[0]);
    }
}