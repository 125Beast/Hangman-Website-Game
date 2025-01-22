const wordsWithHints = [
  { word: "python", hint: "A popular programming language" },
  { word: "hangman", hint: "A word guessing game" },
  { word: "computer", hint: "A device used for various tasks" },
  { word: "developer", hint: "A person who writes code" },
  { word: "programming", hint: "The process of writing software" },
  { word: "apple", hint: "A popular fruit that's often red or green" },
  { word: "book", hint: "Something you read for information or enjoyment" },
  { word: "chair", hint: "A piece of furniture you sit on" },
  { word: "pizza", hint: "A popular Italian dish with cheese and toppings" },
];

let selectedWord = "";
let hint = "";
let guessedWord = [];
let lives = 6;
let guessedLetters = [];
let hintUsed = false;

// Helper to get a random word and hint
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  return wordsWithHints[randomIndex];
}

// Initialize the game
function initializeGame() {
  const { word, hint: wordHint } = getRandomWord();
  selectedWord = word.toLowerCase();
  hint = wordHint;
  guessedWord = Array(selectedWord.length).fill("_");
  lives = 6;
  guessedLetters = [];
  hintUsed = false;

  document.getElementById("word-display").textContent = guessedWord.join(" ");
  document.getElementById("lives").textContent = `Lives: ${lives}`;
  document.getElementById("guessed-letters").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("word-length").textContent = `The word has ${selectedWord.length} letters.`;
}

// Update the display
function updateDisplay() {
  document.getElementById("word-display").textContent = guessedWord.join(" ");
  document.getElementById("lives").textContent = `Lives: ${lives}`;
  document.getElementById("guessed-letters").textContent = guessedLetters.join(", ");
}

// Handle a letter guess
document.getElementById("guess-button").addEventListener("click", () => {
  if (lives <= 0) {
    alert("Game over! Restart to play again.");
    return;
  }

  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (!guess || guess.length !== 1 || !/^[a-z]$/.test(guess)) {
    alert("Please enter a single valid letter.");
    return;
  }

  if (guessedLetters.includes(guess)) {
    alert("You've already guessed that letter!");
    return;
  }

  guessedLetters.push(guess);

  if (selectedWord.includes(guess)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    if (!guessedWord.includes("_")) {
      document.getElementById("lives").textContent = "Congratulations, you won! 🎉";
      document.getElementById("hint").textContent = "";
      document.getElementById("word-display").textContent = guessedWord.join(" ");
      return; // Stop further updates once the game is won
    }
  } else {
    lives--;
    if (lives === 0) {
      document.getElementById("lives").textContent = "Game over! 💀";
      document.getElementById("word-display").textContent = `The word was: ${selectedWord}`;
      return;
    }
  }

  updateDisplay();
});

// Handle full word guess
document.getElementById("guess-full-word").addEventListener("click", () => {
  if (lives <= 0) {
    alert("Game over! Restart to play again.");
    return;
  }

  const fullWordGuess = document.getElementById("full-word-guess").value.toLowerCase();
  document.getElementById("full-word-guess").value = "";

  if (!fullWordGuess || fullWordGuess.length < 1) {
    alert("Please enter a valid word.");
    return;
  }

  if (fullWordGuess === selectedWord) {
    document.getElementById("lives").textContent = "Congratulations, you guessed the word! 🎉";
    document.getElementById("word-display").textContent = selectedWord;
    document.getElementById("hint").textContent = "";
  } else {
    lives--;
    if (lives === 0) {
      document.getElementById("lives").textContent = "Game over! 💀";
      document.getElementById("word-display").textContent = `The word was: ${selectedWord}`;
      return;
    }
    updateDisplay();
  }
});

// Handle hint button
document.getElementById("hint-button").addEventListener("click", () => {
  if (lives <= 1) {
    alert("Not enough lives to use a hint!");
    return;
  }

  if (hintUsed) {
    alert("You've already used the hint for this word!");
    return;
  }

  lives--;
  hintUsed = true;
  document.getElementById("hint").textContent = `Hint: ${hint}`;
  updateDisplay();
});

// Handle restart button
document.getElementById("restart-button").addEventListener("click", () => {
  initializeGame();
});

// Initialize the game on page load
initializeGame();
