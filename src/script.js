/*
    - Dominic Martinez
*/


// Difficulty Enum
const DifficultyEnum = {
    Easy: 7,
    Normal: 5,
    Insane: 3
};

// Main HTML element Variables 

let mainTextContainer = document.getElementById('main-game-text');
let guessesLeftDisplay = document.getElementById('guesses-left');
let currentGuessDisplay = document.getElementById('current-guess');
let guessHintDisplay = document.getElementById('guess-hint');

let difficultyPrompt = document.getElementById('difficulty-prompt');
let difficultyButtons = document.getElementById('difficulty-buttons');

let guessSubmit = document.getElementById('guess-submit');



initGame = () => {
    mainTextContainer.style.display = "none";
    
}

initGame();