// Sélection des éléments
const popup = document.getElementById('popup');
const openPopupButton = document.getElementById('openPopup');
const closeButton = document.querySelector('.close-button');

// Ouvrir le pop-up
openPopupButton.addEventListener('click', function() {
    popup.style.display = 'flex';
});

// Fermer le pop-up
closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Fermer le pop-up en cliquant en dehors du contenu
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});