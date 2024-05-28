'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring starting condition outside the init function
let scores, currentScore, activePlayer, playing;

// starting conditions -  create init function
const init = function () {
  // set score initial scores of players in array
  scores = [0, 0];
  // set current score to 0
  currentScore = 0;
  // active player
  activePlayer = 0;
  playing = true; // how to stop the game

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// calling init outside the function
init();

// create a funciton for switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //using toggle to swich player background
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // testing if game is still being played
  if (playing) {
    // state variable
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); // to check number displayed

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true.
    if (dice !== 1) {
      // Add dice to current score
      // currentScore = currntScore + dice;
      currentScore += dice;
      // set active player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore; // change later
    } else {
      // switch to next player
      //call switch function
      switchPlayer();     
    }
  }
});

// hold score
btnHold.addEventListener('click', function () {
  // testing if game is still being played
  if (playing) {
    // state variable
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //score[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false; // set playing to false
      // remove the dice when game ends
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
  // switch to the next player
  // call switch player function
  swichPlayer();
});

// resetting the game afresh
btnNew.addEventListener('click', init);
