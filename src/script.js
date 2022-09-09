/*
    - Dominic Martinez
*/


// Difficulty Enum
const DifficultyLevel = {
    Easy: 7,
    Normal: 5,
    Insane: 3
};

// Main HTML element Variables 

let mainTextContainer = document.getElementById('main-game-text');
let guessesLeftDisplay = document.getElementById('guesses-left');
let currentGuessDisplay = document.getElementById('current-guess');
let guessResultDisplay = document.getElementById('guess-result');
let previousGuessesContainer = document.getElementById('previous-guesses');

let difficultyPrompt = document.getElementById('difficulty-prompt');
let difficultyButtons = document.getElementById('difficulty-buttons');

let userGuessInput = document.getElementById('user-guess');
let guessSubmit = document.getElementById('guess-submit');

let resetButton = document.getElementById('reset-button')

// Main variables 
let NumberOfGuessesLeft = 0;
let gameNum = 0;



initGame = () => {
    mainTextContainer.style.display = "none";
    previousGuessesContainer.style.display = "none";
    resetButton.style.display = "none";

    userGuessInput.disabled = true;
    guessSubmit.disabled = true;


    difficultyButtons.setAttribute('style', 'display: flex-block !important');
    difficultyPrompt.setAttribute('style', 'display: flex-block !important');

    previousGuessesContainer.innerHTML = `<h3 class="text-white fw-bold">Guess List:</h3>`;
    guessResultDisplay.innerHTML = '';

    // Set random number for game
    gameNum = randNumInRange(1, 100);
  
}

document.addEventListener('submit', (event) => {

    event.preventDefault();

    if (userGuessInput.value == '') {
        return;
    }


    userGuess = userGuessInput.value;
    currentGuessDisplay.innerHTML = `${userGuess}`
    userGuessInput.value = '';

    if (userGuess == gameNum) {
        guessResultDisplay.innerHTML = "Woohoo! You guessed the right number"
        endGame();
    }
    else {
        if (userGuess < gameNum) {
            guessResultDisplay.innerHTML = "Your guess is lower than the answer";
        }
        else {
            guessResultDisplay.innerHTML = "Your guess is higher than the answer";
        }

        guessesLeftDisplay.innerHTML = `${--NumberOfGuessesLeft}`;
        previousGuessesContainer.innerHTML += `<h5 class="text-white">${userGuess}</h5>`

        if (NumberOfGuessesLeft <= 0) {
            guessResultDisplay.innerHTML = `Damn! You ran out of guesses, the correct answer is ${gameNum}`
            endGame();
        }
    }

    userGuessInput.focus();
    
})

endGame = () => {
     
    userGuessInput.disabled = true;
    guessSubmit.disabled = true;

    resetButton.style.display = "inline-block";
}


chooseDifficulty = (difficulty) => {
    if (difficulty == 'easy') {
        NumberOfGuessesLeft = DifficultyLevel.Easy;
    } 
    else if (difficulty == 'normal') {
        NumberOfGuessesLeft = DifficultyLevel.Normal;
    }
    else if (difficulty == 'hard') {
        NumberOfGuessesLeft = DifficultyLevel.Insane;
    }

    difficultyButtons.style.display = "none";
    difficultyPrompt.setAttribute('style', 'display: none !important');

    mainTextContainer.style.display = "block";
    guessesLeftDisplay.innerHTML = `${NumberOfGuessesLeft}`;

    previousGuessesContainer.style.display = "block";

    userGuessInput.disabled = false;
    guessSubmit.disabled = false;
}



randNumInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




initGame();