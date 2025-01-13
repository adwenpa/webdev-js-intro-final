"use strict";

const maxAttempts = 3;
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const currentGuess = document.getElementById("current-guess");
const guessHistory = document.getElementById("guess-history");
const results = document.getElementById("guess-message");
const yourGuess = document.getElementById("guess-input");
const computerGuess = document.getElementById("computer-guess");
const articleTag = document.getElementsByClassName("game-container");

// Copied getRandomIntInclusive(min, max) from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

let computerNum = getRandomIntInclusive(1, 10);
let yourNum;
let attempted = 0;
let history = "";
let reset = false;     // Display Your Guess and Guess History

function publishComputerGuess() {
    computerGuess.innerHTML = computerNum;
}

function updateYourGuesses() {
    if (reset) {
        currentGuess.innerHTML = "";
        guessHistory.innerHTML = "";
        reset = false;
    } else {
        currentGuess.innerHTML = yourNum;
        history += "  " + yourNum;
        guessHistory.innerHTML = history;
    }
}

function updateMessage() {
    if (yourNum === computerNum) {winCondition();}
    else if (attempted >= maxAttempts) {loseCondition();}
    else {
        if (yourNum > computerNum) {results.innerHTML = "Too high. Try again.";}
        else {results.innerHTML = "Too low. Try again.";}
    }
}

function winCondition() {
    results.innerHTML = "You won!!!";
    publishComputerGuess();
    reset = true;
    resetBtns();
}

function loseCondition() {
    results.innerHTML = "You lost!";
    publishComputerGuess();
    reset = true;
    resetBtns();
}

function resetBtns() {
    if (submitBtn.disabled) {
        submitBtn.disabled = false;
        restartBtn.disabled = true;
    } else {
        submitBtn.disabled = true;
        restartBtn.disabled = false;
    }
}

function resetData() {
    computerNum = getRandomIntInclusive(1, 10);
    yourGuess.value = "";
    yourNum = parseInt("");
    computerGuess.innerHTML = "";
    results.innerHTML = "";
    attempted = 0;
    history = "";
    updateYourGuesses();
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    attempted++;
    yourNum = parseInt(yourGuess.value);
    updateYourGuesses();
    updateMessage();
})

restartBtn.addEventListener("click", () => {
    resetData();
    resetBtns();
})