let random = Math.random();
if (random > 0.5) {
  console.log("The random number is greater than 0.5");
  //   console.log(`The number is ${random}`);
} else {
  console.log("The random number is less than or equal to 0.5");
  //   console.log(`The number is ${random}`);
}
console.log(`The number is ${random}`); // Instead of having this same line in two places have it here.

// Demonstrating concat
let cats = ["blue", "kitty"];
let dogs = ["cherry,harry"];
let animals = cats.concat(dogs);
// concat doesn't change the original array rather it just returns the new concatenated array.

const person = {
  firstName: "Ankit",
  lastName: "Kataria",
  age: 25,
  rollNo: 214101008,
  hobbies: ["notmuch", "somethingInteresting"], // Even array's can be stored as values.
  male: true,
};

// Code for guessing game

let maxNum = parseInt(prompt("Enter a max num: "));
// parseInt("aafljajgd") will give a NaN if that thing is not a number so must check here.
while (!maxNum) {
  maxNum = parseInt(
    prompt("Enter a max num again you entered something wront the last time : ")
  );
}

let randomNum = Math.floor(Math.random() * maxNum) + 1;
let guess = parseInt(prompt("Take a guess : "));
let guessCount = 0;
while (true) {
  guessCount++;
  if (guess === "q") {
    console.log(
      `You quit in ${guessCount} tries and the random number was ${randomNum}`
    );
    break;
  } else if (parseInt(guess) < randomNum) {
    guess = prompt("Take a guess again your guess was too low : "); // If you had used parseInt here you'd never be able to enter 'q' cause it would have been parsed.
    // Also something to remember parseInt(guess) doesn't change the value of guess permanently it only changes it temporarily in these if else-if statements you have 
    // store it yourself only then it works like let intValueOfGuess = parseInt(prompt("enter a guess value"));
  } else if (parseInt(guess) > randomNum) {
    guess = prompt("Take a guess again your guess was too high : ");
  } else if (parseInt(guess) === randomNum) {
    console.log(`You guessed right in ${guessCount} tries`);
    break;
  } else {
    guess = prompt(
      "Take a guess again and you entered something wrong the last time : "
    );
  }
}
