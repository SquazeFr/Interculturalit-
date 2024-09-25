const container = document.querySelector(".container");
const containerCarrousel = container.querySelector(".container-carrousel");
const carrousel = container.querySelector(".carrousel");
const carrouselItems = carrousel.querySelectorAll(".carrousel-item");

// Limiter à 5 éléments
const maxItems = 5;

// Iniciamos variables que cambiaran su estado.
let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createCarrousel = () => {
  const carrouselProps = onResize();
  const length = Math.min(carrouselItems.length, maxItems); // Limiter à 5
  const degrees = 360 / length; // Grados por cada item
  const gap = 20; // Espacio entre cada item
  const tz = distanceZ(carrouselProps.w, length, gap);

  const fov = calculateFov(carrouselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  // Boucler uniquement sur les 5 premiers items
  carrouselItems.forEach((item, i) => {
    if (i < maxItems) { // Limite à 5 éléments
      const degreesByItem = degrees * i + "deg";
      item.style.setProperty("--rotatey", degreesByItem);
      item.style.setProperty("--tz", tz + "px");
    }
  });
};

// Fonction qui donne de la suavité à l'animation
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distance Z des éléments
};

// Calcula la hauteur du conteneur en fonction du champ de vision et de la distance de perspective
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcule le champ de vision du carrousel
const calculateFov = (carrouselProps) => {
  const perspective = window
    .getComputedStyle(containerCarrousel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrouselProps.w * carrouselProps.w) +
    Math.sqrt(carrouselProps.h * carrouselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Obtient la position X et évalue si la position est à droite ou à gauche
const getPosX = (x) => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrousel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  // Obtient les propriétés de taille du carrousel
  const boundingCarrousel = containerCarrousel.getBoundingClientRect();

  const carrouselProps = {
    w: boundingCarrousel.width,
    h: boundingCarrousel.height,
  };

  return carrouselProps;
};

const initEvents = () => {
  // Evénements souris
  carrousel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrousel.style.cursor = "grabbing";
  });
  carrousel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrousel.style.cursor = "grab";
  });
  container.addEventListener("mouseleave", () => (isMouseDown = false));

  carrousel.addEventListener(
    "mousemove",
    (e) => isMouseDown && getPosX(e.clientX)
  );

  // Evénements touch
  carrousel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrousel.style.cursor = "grabbing";
  });
  carrousel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrousel.style.cursor = "grab";
  });
  container.addEventListener(
    "touchmove",
    (e) => isMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createCarrousel);

  update();
  createCarrousel();
};

initEvents();
