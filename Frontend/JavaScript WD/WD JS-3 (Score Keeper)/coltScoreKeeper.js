const player1 = {
  score: 0,
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Display"),
};

const player2 = {
  score: 0,
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Display"),
};

const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#playto");
let winningScore = 3;
let isGameOver = false;

// Add event listeners to all the buttons where i'll be constantly listening of any click events that might happen on any of these buttons at any time.
player1.button.addEventListener("click", function () {
  console.log("clicking p1 button");
  updateScores(player1, player2);
});

player2.button.addEventListener("click", function () {
  console.log("clinking p2 button");
  updateScores(player2, player1);
});

resetButton.addEventListener("click", reset);

winningScoreSelect.addEventListener("change", function () {
  console.log("clinking select button");
  winningScore = parseInt(this.value); // winningScoreSelect.value could also be used.
  reset();
});

// Making the updateScores function.

function updateScores(player, opponent) {
  // If you had a lot of opponents the lines 42,44 will keep on repeating for every single opponent 1,2,3.. so it would have been better to pass in every other opponent as a array in the second arg and loop over the array just like we did in the reset function.
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.innerText = player.score;
  }
}

// Instead of the reset function below you can also do the one below.
// function reset() {
//   isGameOver = false;
//   player1.score = 0;
//   player2.score = 0;
//   winningScore = 0;
//   player1.button.disabled = false;
//   player2.button.disabled = false;
//   player1.display.innerText = 0;
//   player2.display.innerText = 0;
//   player1.display.classList.remove('has-text-success, has-text-danger');
//   player2.display.classList.remove('has-text-success, has-text-danger');
// }

function reset() {
  isGameOver = false;
  for (let p of [player1, player2]) {
    p.score = 0;
    p.display.innerText = 0;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}
