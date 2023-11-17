'use strict';

/* Functions */

// Crea cella e inserisci il numero dentro
function createCell(tag, classe, index) {
  const element = document.createElement(tag);
  element.classList.add(classe);
  element.innerHTML = index;
  return element;
}

// Genera bombe
function bombCreation(difficultyLevel) {
  let i = 0;
  let num = 0;
  let multiplyer = 0;
  const bombs = [];
  if (difficultyLevel === 'easy') multiplyer = 100;
  else if (difficultyLevel === 'medium') multiplyer = 81;
  else multiplyer = 49;
  // Genera 16 numeri casuali di range pari al numero di caselle del livello scelto
  while (i < 16) {
    num = Math.floor(Math.random() * multiplyer) + 1;
    if (!bombs.includes(num)) {
      bombs.push(num);
      i++;
    }
  }
  return bombs;
}

// Restituisce i punti totali meno l'ultimo click
function pointStamp(array) {
  let num = 0;
  for (let i = 0; i < array.length; i++) num += array[i];
  return num;
}

// Rimuove gli eventi da tutti i figli di un container
function removeEL(element) {
  if (element.length > 1)
    for (let i = 0; i < element.length; i++) {
      element[i].removeEventListener('click', function () {});
    }
  else element.removeEventListener('click', function () {});
}

// Gestione aggiunta e rimozione Event Listener
function handleEventListener(e) {
  const children = container.children;
  // SE ho aperto tutte le celle meno una e non ho trovato una bomba
  if (
    points.length >= difficultyCells - 17 &&
    !bombs.includes(Number(e.target.innerHTML)) &&
    !e.target.classList.contains('active')
  ) {
    e.target.classList.add('active');
    container.removeEventListener('click', handleEventListener);
    points.push(1);
    console.log(
      'Hai vinto! Hai totalizzato un punteggio di',
      pointStamp(points)
    );
    points = [];
  } else if (
    // NON è una bomba e non contiene classe active aggiungo classe active e incremento punteggio
    !bombs.includes(Number(e.target.innerHTML)) &&
    !e.target.classList.contains('active')
  ) {
    e.target.classList.add('active');
    points.push(1);
    // E' una bomba allora aggiungo classe red tolgo EL e stampo punteggio e lo azzero
  } else if (bombs.includes(Number(e.target.innerHTML))) {
    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < children.length; j++) {
        if (+children[i].innerHTML === bombs[j])
          children[i].classList.add('red');
      }
    }
    container.removeEventListener('click', handleEventListener);
    console.log(
      'La partita è finita! Hai totalizzato un punteggio di',
      pointStamp(points)
    );
    points = [];
  }
}

/* Program */

const container = document.querySelector('main .container');
const playButton = document.querySelector('header button');
const difficulty = document.getElementById('chosen');
const title = document.querySelector('main .container h2');
let bombs = '';
let difficultyCells = 0;
let difficultyLevel = '';
let element = '';
let points = [];

window.addEventListener('load', function () {
  title.classList.add('visible');
});

playButton.addEventListener('click', function () {
  points = [];
  container.innerHTML = '';

  if (difficulty.value === 'easy') {
    difficultyCells = 100;
    difficultyLevel = 'easy';
  } else if (difficulty.value === 'medium') {
    difficultyCells = 81;
    difficultyLevel = 'medium';
  } else {
    difficultyCells = 49;
    difficultyLevel = 'hard';
  }
  for (let i = 1; i <= difficultyCells; i++) {
    element = createCell('div', 'cell', i);
    container.append(element);
    element.classList.add(difficultyLevel);
  }
  bombs = bombCreation(difficultyLevel);
  container.addEventListener('click', handleEventListener);
});
