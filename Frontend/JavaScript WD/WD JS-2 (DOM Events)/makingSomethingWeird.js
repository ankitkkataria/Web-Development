let arr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function generateRandomNum0to25() {
  return Math.floor(Math.random() * 26);
}

function makeRandomCharacter() {
  let randomNum = generateRandomNum0to25();
 // console.log(`returning the random character ${arr[randomNum]}`)
  return arr[randomNum];
}

const h1 = document.querySelector("h1");
const myName = h1.innerText;

h1.addEventListener("mouseenter", function () {
  for (let i = 0; i < h1.innerText.length; i++) {
    setTimeout(function() {
            let randomCharacter = makeRandomCharacter();
            h1.innerText = h1.innerText.substring(0, i) + randomCharacter + h1.innerText.substring(i + 1);
    }, i*20);
    
    setTimeout(function() {
        h1.innerText = h1.innerText.substring(0, i) + myName[i] +  h1.innerText.substring(i + 1);
    }, i*40);
    // console.log(h1.innerText);
    // console.log(`first part :- ${h1.innerText.substring(0, i)}`);
    // console.log(`second part :-  ${randomCharacter}`);
    // console.log(`third part :-  ${h1.innerText.substring(i + 1)}`);
  }
});


// Above function is my original one let me try a different way.

// let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Initially i had made it an array ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"] // This was breaking the code entirely for obvious reasons.

// function generateRandomNum0to25() {
//   return Math.floor(Math.random() * 26);
// }

// function makeRandomCharacter() {
//   let randomNum = generateRandomNum0to25();
//   // console.log(randomNum,letters[randomNum]);
//   return letters[randomNum];
// }

// const h1 = document.querySelector("h1");
// const myName = h1.innerText;
// let currIndex = 0;
// h1.addEventListener("mouseenter", function () {
//   for (let i = 0; i < myName.length; i++) {
//     console.log("iteration " , i , " currIndex ", currIndex);
//     if(currIndex === i) {
//       setTimeout(function() {
//               let randomCharacter = makeRandomCharacter();
//               h1.innerText = h1.innerText.substring(0, currIndex) + randomCharacter + h1.innerText.substring(currIndex + 1);
//       }, i*300);
//       // console.log("i'm inside if");
//     }
//     else {
//       setTimeout(function() {
//             h1.innerText = h1.innerText.substring(0, currIndex) + myName[currIndex] +  h1.innerText.substring(currIndex + 1);
//             currIndex++;
//             console.log("i've updated currIndex to ", currIndex);
//         }, i*400);
//     }

//     console.log("i've updated i to ", i+1);
//   }
// });
