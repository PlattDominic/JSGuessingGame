/*
    - Dominic Martinez
    - I.T project
    - Guessing Game project
*/


// Difficulty Enum, will be used to set number of guesses user has left
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
let currentDifficulty = document.getElementById('current-difficulty');

let userGuessInput = document.getElementById('user-guess');
let guessSubmit = document.getElementById('guess-submit');

let resetButton = document.getElementById('reset-button')

// Main variables 
let NumberOfGuessesLeft = 0;
let gameNum = 0;


// This function will be the first one to be called when page loads and when user press reset button 
// and will Setup or reset the game for user and allow them to choose a difficulty
initGame = () => {
    // Hide any HTML elements that should not be shown until user chooses difficulty
    mainTextContainer.style.display = "none";
    previousGuessesContainer.style.display = "none";
    resetButton.style.display = "none";

    // Disable any HTMl element that should not be enabled until user chooses difficulty
    userGuessInput.disabled = true;
    guessSubmit.disabled = true;

    // Enable any HTML elements that should be enabled when user is choosing difficulty
    difficultyButtons.setAttribute('style', 'display: flex-block !important');
    difficultyPrompt.setAttribute('style', 'display: flex-block !important');

    // Reset the container for previous guesses and the guess result one as well
    previousGuessesContainer.innerHTML = `<h3 class="text-white fw-bold">Guess List:</h3>`;
    guessResultDisplay.innerHTML = '';

    // Clear current difficulty element text
    currentDifficulty.innerHTML = '';

    // Set random number for game
    gameNum = randNumInRange(1, 100);
}

// Event listener to be called when user submits a guess
document.addEventListener('submit', (event) => {
    // Prevents refreshing of page
    event.preventDefault();

    // Returns if no user input
    if (userGuessInput.value == '') {
        return;
    }

    // Store the user guess input in a variable and show the user their current guess
    // And clearing the user guess input element
    userGuess = userGuessInput.value;
    currentGuessDisplay.innerHTML = `${userGuess}`
    userGuessInput.value = '';

    // Compare user guess and the actual random number, if they guess correctly
    // Tell the user of so, and evoke endGame function
    if (userGuess == gameNum) {
        guessResultDisplay.innerHTML = "Woohoo! You guessed the right number"
        endGame();
    }
    else {
        // If user does guess correctly, tell them if they need to guess higher or lower
        if (userGuess < gameNum) {
            guessResultDisplay.innerHTML = "Your guess is lower than the answer";
        }
        else {
            guessResultDisplay.innerHTML = "Your guess is higher than the answer";
        }

        // Show user how many guesses they have left and also add current guess
        // To previous guesses container
        guessesLeftDisplay.innerHTML = `${--NumberOfGuessesLeft}`;
        previousGuessesContainer.innerHTML += `<h6 class="text-white">${userGuess}</h6>`

        // If user has no more guesses left, tell them of so and evoke end game function
        if (NumberOfGuessesLeft <= 0) {
            guessResultDisplay.innerHTML = `Damn! You ran out of guesses, the correct answer is ${gameNum}`
            endGame();
        }
    }

    // Keep focus on the user guess input
    userGuessInput.focus();
    
})

// Function will be called when user looses or wins game and will 'end' the game for the user
endGame = () => {
     // Disables any user input
    userGuessInput.disabled = true;
    guessSubmit.disabled = true;

    // Display reset button for user to press
    resetButton.style.display = "inline-block";
}


// Function will be called when user presses difficulty button, and will start the game
// And set number of guesses based on user difficulty choice
chooseDifficulty = (difficulty) => {
    // Set numbers of guesses left based on what difficulty button user clicked on
    // Also set current difficulty text and color to what difficulty user choose
    if (difficulty == 'easy') {
        NumberOfGuessesLeft = DifficultyLevel.Easy;
        currentDifficulty.innerHTML = 'Easy';
        currentDifficulty.style.color = '#4FFFB0';
    } 
    else if (difficulty == 'normal') {
        NumberOfGuessesLeft = DifficultyLevel.Normal;
        currentDifficulty.innerHTML = 'Normal';
        currentDifficulty.style.color = '#f0ad4e';
    }
    else if (difficulty == 'insane') {
        NumberOfGuessesLeft = DifficultyLevel.Insane;
        currentDifficulty.innerHTML = 'Insane';
        currentDifficulty.style.color = '#d9534f';
    }

    // Hide difficulty choice buttons and prompt from user
    difficultyButtons.style.display = "none";
    difficultyPrompt.setAttribute('style', 'display: none !important');

    // Unhide main text container and also the amount of guesses left element
    mainTextContainer.style.display = "block";
    guessesLeftDisplay.innerHTML = `${NumberOfGuessesLeft}`;

    // Unhide the container that will show user their previous guesses
    previousGuessesContainer.style.display = "block";   

    // Enable user input
    userGuessInput.disabled = false;
    guessSubmit.disabled = false;
}


// Function will return a random number based in a (min, max) range given in parameters 
randNumInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




initGame(); 