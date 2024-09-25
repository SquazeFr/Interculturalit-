        let character = document.getElementById('character');
        let targetZones = Array.from(document.getElementsByClassName('target-zone'));
        let characterPosition = { top: 0, left: 0 }; // Position initiale du personnage
        let moveSpeed = 5; // Vitesse de déplacement du personnage
        let keysPressed = {}; // Object to track multiple keys
        const HoverTarget = Array.from(document.getElementsByClassName('HoverTarget'));

        // Fonction pour gérer le déplacement
        function updatePosition() {
            let moveX = 0;
            let moveY = 0;

            // Vérification des touches pressées pour le déplacement vertical
            if (keysPressed['arrowup'] || keysPressed['w'] || keysPressed['z']) {
                moveY = -moveSpeed;
            }
            if (keysPressed['arrowdown'] || keysPressed['s']) {
                moveY = moveSpeed;
            }

            // Vérification des touches pressées pour le déplacement horizontal
            if (keysPressed['arrowleft'] || keysPressed['a'] || keysPressed['q']) {
                moveX = -moveSpeed;
            }
            if (keysPressed['arrowright'] || keysPressed['d']) {
                moveX = moveSpeed;
            }

            // Calcul des nouvelles positions tout en s'assurant de rester dans la zone
            characterPosition.top = Math.max(0, Math.min(970, characterPosition.top + moveY));
            characterPosition.left = Math.max(0, Math.min(1920, characterPosition.left + moveX));

            // Appliquer la nouvelle position du personnage
            character.style.top = characterPosition.top + 'px';
            character.style.left = characterPosition.left + 'px';

            // Vérifier si le personnage est dans une des zones cibles
            checkTargetZones();

            // Demander à mettre à jour la position au prochain frame
            requestAnimationFrame(updatePosition);
        }

        // Fonction pour vérifier si le personnage est dans une des zones cibles
        function checkTargetZones() {
            let charTop = characterPosition.top;
            let charLeft = characterPosition.left;
            let charWidth = character.offsetWidth;
            let charHeight = character.offsetHeight;
            

            let inAnyZone = false;

            targetZones.forEach(zone => {
                let targetTop = parseInt(zone.style.top);
                let targetLeft = parseInt(zone.style.left);
                let targetWidth = zone.offsetWidth;
                let targetHeight = zone.offsetHeight;
                

                if (charTop < targetTop + targetHeight &&
                    charTop + charHeight > targetTop &&
                    charLeft < targetLeft + targetWidth &&
                    charLeft + charWidth > targetLeft) {
                    zone.classList.add('active');
                    zone.classList.add('hover-target-zone');
                    inAnyZone = true;
                } else {
                    zone.classList.remove('active');
                    zone.classList.remove('hover-target-zone');
                }
            });

            // Si le personnage est dans une zone active et qu'Enter est pressé, ouvrir le lien
            if (inAnyZone && keysPressed['enter']) {
                let activeZone = targetZones.find(zone => zone.classList.contains('active'));
                if (activeZone) {
                    window.location.href = activeZone.getAttribute('data-link');
                }
            }
        }

        // Écouteur pour détecter les touches du clavier
        window.addEventListener('keydown', (event) => {
            keysPressed[event.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (event) => {
            delete keysPressed[event.key.toLowerCase()];
        });

        // Démarrer l'animation
        updatePosition();

        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A
    let userInput = [];

    // Fonction pour mettre l'image en plein écran
    function openFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Pour Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Pour Chrome, Safari et Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // Pour IE/Edge
            element.msRequestFullscreen();
        }
    }



    // Écouteur d'événements pour la détection du Konami Code
    window.addEventListener('keydown', function(event) {
        userInput.push(event.keyCode);

        // Limite la longueur de la saisie pour ne garder que les dernières entrées
        if (userInput.length > konamiCode.length) {
            userInput.shift(); // Supprime la saisie la plus ancienne
        }

        // Vérifie si le Konami Code a été correctement saisi
        if (userInput.toString() === konamiCode.toString()) {
            const img = document.getElementById('hiddenImage');
            img.style.display = 'block'; // Affiche 

    // Écouteur pour cacher l'image et quitter le plein écran lorsque "Échap" est pressé
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const img = document.getElementById('hiddenImage');
            img.style.display = 'none'; // Cache l'image
        }
    });