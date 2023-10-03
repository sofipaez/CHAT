let flippedCards = [];
let lockBoard = false;
let pairsFound = 0;
let puntaje= 20;
function flipCard(card) {
  if (lockBoard) return;
  if (card === flippedCards[0]) return;

  card.classList.add('flip');

  if (flippedCards.length === 0) {
    flippedCards[0] = card;
  } else if (flippedCards.length === 1) {
    flippedCards[1] = card;
    lockBoard = true;
    checkMatch();
  }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function disableCards() {
  flippedCards[0].removeEventListener('click', handleCardClick);
  flippedCards[1].removeEventListener('click', handleCardClick);
  flippedCards = [];
  lockBoard = false;
}

function enableCards() {
  flippedCards[0].addEventListener('click', handleCardClick);
  flippedCards[1].addEventListener('click', handleCardClick);
  flippedCards = [];
  lockBoard = false;
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  const img1 = card1.querySelector('.card-back img');
  const img2 = card2.querySelector('.card-back img');

  if (img1.src === img2.src) {
    disableCards();
    pairsFound++;
    document.getElementById("overlay").style.display="flex"
    setTimeout(() => {
      document.getElementById("overlay").style.display="none";
      checkWin();
  }, 10000);
  } else {
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        enableCards();
    }, 1000);
  }
  
}

function shuffleAndDisplayCards(sectionId) {
  const cardsContainer = document.getElementById(sectionId);
  const cards = Array.from(cardsContainer.querySelectorAll('.card'));
  shuffleArray(cards);
  cardsContainer.innerHTML = ''; // Limpia el contenedor

  cards.forEach((card, index) => {
    card.addEventListener('click', handleCardClick);
    cardsContainer.appendChild(card);
  });
}

function resetCards() {
  flippedCards = [];
  lockBoard = false;
  pairsFound = 0;
}

function handleCardClick() {
  flipCard(this);
}

function checkWin() {
  if (pairsFound === 6) { // Cambiar el número según la cantidad total de pares
    alert('¡Has ganado! ¡Encontraste todos los pares!');
    // Aquí puedes agregar más acciones cuando se gana el juego
    
  }
}

document.addEventListener('DOMContentLoaded', function () {
  resetCards();
  shuffleAndDisplayCards('nivel1');
});

