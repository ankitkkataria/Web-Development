function generateRandNum0to255() {
  return Math.floor(Math.random() * 256);
}

function makeRandomColor() {
  let rValue = generateRandNum0to255();
  let gValue = generateRandNum0to255();
  let bValue = generateRandNum0to255();
  return `rgb(${rValue},${gValue},${bValue})`;
}

// Now let's say you want to make it so that whenever you click a button both the backgroundColor of it and the textColor of it should be assigned a random color.

// const allButtons = document.querySelectorAll("button");

// for (let currButton of allButtons) {
//   // Here i'm taking each button one by one and adding a event listener to each button that says when i'm being clicked change both of my background color and text color.
//   currButton.addEventListener("click", () => {
//     currButton.style.backgroundColor = makeRandomColor();
//     currButton.style.color = makeRandomColor();
//   });
// }

// You want to do the same thing with all the h1s.

// const allh1s = document.querySelectorAll("h1");

// for (let currh1 of allh1s) {
//   currh1.addEventListener("click", () => {
//     currh1.style.backgroundColor = makeRandomColor();
//     currh1.style.color = makeRandomColor();
//   });
// }

// Two do those two things you'd have to write the code from like 14 to 33.
// But if you think about it just the element is changing one time is h1 and other time it's a button but we're actually doing the same thing for both the elements.

// Can i write a function that can be called when a element is clicked on and it will randomize both it's backgroundColor as well as text but in that function we won't know how to access the element that was clicked that's where the keyword this comes into the picture.

// const allButtons = document.querySelectorAll("button");
// for (let currButton of allButtons) {
//   currButton.addEventListener("click", function () { // Remember this doesn't work with arrow functions for some odd reason.
//     this.style.backgroundColor = makeRandomColor();
//     this.style.color = makeRandomColor();
//   });
// }

// You want to do the same thing with all the h1s.

// const allh1s = document.querySelectorAll("h1");

// for (let currh1 of allh1s) {
//   currh1.addEventListener("click", function () {
//     this.style.backgroundColor = makeRandomColor();
//     this.style.color = makeRandomColor();
//   });
// }

// Best and smallest way of doing all this.

const allButtons = document.querySelectorAll("button");

for (let currButton of allButtons) {
  currButton.addEventListener("click", colorize);
}

const allh1s = document.querySelectorAll("h1");
for (let currh1 of allh1s) {
  currh1.addEventListener("click", colorize);
}

function colorize() { // So basically whenever this is used in a function that's being passed in a addEventListener whenever that event happens and that function is called putting this in that function basically means this particular element on which this event occured.
  this.style.backgroundColor = makeRandomColor();
  this.style.color = makeRandomColor();
}