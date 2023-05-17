// Récupérer les données de l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Parcourir les données et les afficher sur la page
    data.forEach(item => {
      // Créer un élément d'image
      const image = document.createElement('img');
      image.src = item.imageURL; // URL de l'image dans les données de l'API
      document.body.appendChild(image); // Ajouter l'image à la page
      
      // Créer un élément de texte
      const text = document.createElement('p');
      text.textContent = item.description; // Description du texte dans les données de l'API
      document.body.appendChild(text); // Ajouter le texte à la page
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données de l\'API:', error);
  });
