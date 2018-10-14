// set up with variables
const wordToGuess = "bananas";
const wordState = []

let guessesLeft = 10;

const prevGuesses = []

function displayWordState(state){
    let output = "";
    for(let i = 0; i < state.length; i++){
        const char = state[i];
        output = output + char;
        output = output + " ";
    }
    const wordStateContainer = document.getElementById("word");
    wordStateContainer.innerHTML = output;
}


function displayGuessesLeft(num){
    document.getElementById("guesses-left").innerHTML = num
}


function displayPreviousGuesses(guessesArray){
    const list = document.getElementById("past-guesses");
    
    // clear list before adding guesses
    list.innerHTML = "";

    // for each guess, append a li child
    for(let i = 0; i < guessesArray.length; i++){
        const guess = document.createElement("li");
        guess.innerHTML = guessesArray[i];
        list.appendChild(guess)
    }
}

// takes in word to guess, the current state of the word, and the new character to guess
function guess(wordToGuess, wordState, currGuess){
    // for each character in the word to be guessed, 
    for(let i=0; i < wordToGuess.length ; i++){
        // if the character matches the current guess
        // update word state at that position
        if(wordToGuess[i] == currGuess){
            wordState[i] = currGuess;
        }
    }
    displayWordState(wordState);
}




function checkWon(){
    let hasBlanks = false; 
    for(i=0;i<wordState.length;i++){
        // if any part of wordState has blank, return true
        if(wordState[i] == "_"){
            hasBlanks = true
        }
    }
    return !hasBlanks;
}


// initial setup
function setup(){
    for(i=0;i<wordToGuess.length;i++){
        wordState.push("_");
    }
    
    displayWordState(wordState)
    displayGuessesLeft(guessesLeft)
    displayPreviousGuesses(prevGuesses)
}


function setupForm(){
    // add form submit handler
    const form = document.getElementById("player-input");
    const input = document.getElementById("player-guess");


    form.onsubmit = function(event){
        event.preventDefault();

        // get current input
        const currentInput = input.value.toLowerCase();

        // clear input field
        input.value = "";

        // check if input is valid
        if(!validateInput(currentInput, prevGuesses)){
            window.alert("Please choose a character from a-z that has not been guessed before.")
            // stop the function setupForm()
            return;
        }
            




        // add guess to previous guesses
        prevGuesses.push(currentInput);

        // update guesses left
        guessesLeft = guessesLeft - 1;
        displayGuessesLeft(guessesLeft);

        //make a guess
        guess(wordToGuess, wordState, currentInput);

        // check if user has won
        const won = checkWon(wordState);
        if(won){
            window.alert("You won!")
        }

        // check if user has lost
        else if(guessesLeft == 0){
            window.alert("You lost!")
        }

        // update previous guesses
        displayPreviousGuesses(prevGuesses);
    }

}


// if guess if valid turn true, else return false
function validateInput(guess, prevGuesses){
    // check that guess is only one character and not in previous guesses
    if(guess.length == 1 && prevGuesses.indexOf(guess) == -1){
        return true
    }
    return false
    // check that user has not guess this before
}



setup();
setupForm();