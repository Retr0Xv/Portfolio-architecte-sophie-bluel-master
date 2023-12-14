const form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
        body: JSON.stringify({ email,password })
    })
    .then(function(response) {
        switch(response.status) {
            case 500:
            case 503:
                alert("Erreur côté serveur!");
            break;
            case 401:
            case 404:
                alert("Email ou mot de passe incorrect!");
            break;
            case 200:
                console.log("Authentification réussie.");
                return response.json();
            break;
            default:
                alert("Erreur inconnue!");
            break;
        }
    })
    .then((user) => {
        window.localStorage.setItem("accessToken", user.token);
        document.location.href='index.html'
    })
    .catch((err) => {
        console.log(err);
    });
})


