const ok = document.querySelector("#ok");
const input = document.querySelector("#maxScore");
const playerOneScored = document.querySelector("#playerOneScored");
const playerTwoScored = document.querySelector("#playerTwoScored");
const reset = document.querySelector("#reset");
const scoreCard = document.querySelector("#scoreCard");
let maxScore = 0;
askForInput();
function askForInput() {
  ok.addEventListener("click", function () {
    maxScore = parseInt(input.value); // This is actually fucking garbage even though you ask for input in number terms you still only get a string bcz of it so much fucking time was wasted
    // input.value = 0;
    // console.log("ok button clicked");
    // console.log("maxScoreValueIs:",maxScore);
    // console.log("input.value:",input.value);
    // console.log("calling maintainScore");
    maintainScore();
  });
}

function maintainScore() {
  let playerOneScore = 0;
  let playerTwoScore = 0;
  playerOneScored.addEventListener("click", function () {
    console.log("+1 p1 clicked");
    playerOneScore++;
    scoreCard.innerText = `${playerOneScore} to ${playerTwoScore}`;
    checkWhoWon(playerOneScore, playerTwoScore);
  });

  playerTwoScored.addEventListener("click", function () {
    console.log("+1 p2 clicked");
    playerTwoScore++;
    scoreCard.innerText = `${playerOneScore} to ${playerTwoScore}`;
    checkWhoWon(playerOneScore, playerTwoScore);
  });
}

function checkWhoWon(playerOneScore, playerTwoScore) {
//   console.log("calling check who won");
//   console.log("here p1score", playerOneScore);
//   console.log("here p2score", playerTwoScore);
//   console.log("max score", maxScore);
  if (playerOneScore === maxScore) {
    scoreCard.innerText = "Player One Won";
    playerOneScored.disabled = true;
    playerTwoScored.disabled = true;
  } else if (playerTwoScore === maxScore) {
    scoreCard.innerText = "Player Two Won";
    playerOneScored.disabled = true;
    playerTwoScored.disabled = true;
  }
}

reset.addEventListener("click", function () {
  playerOneScore = 0;
  playerTwoScore = 0;
  maxScore = 0;
  scoreCard.innerText = "0 to 0";
  input.value = 0;
  playerOneScored.disabled = false;
  playerTwoScored.disabled = false;
  askForInput();
});
