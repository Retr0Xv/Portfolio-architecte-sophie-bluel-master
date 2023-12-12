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
    .then((response) => response.json())
    .then((user) => {
        window.localStorage.setItem("accessToken", user.token);
        document.location.href='index.html'
    })
    .catch((err) => {
        console.log(err);
    });
})


