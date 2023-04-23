// The line below require("./math") will return the module.exports object you sent from the math.js file and store it in the mathFile making mathFile the object containing add,square and PI.
const mathFile = require("./math"); // ./ means same directory so this line is saying i require the math file that's present in this very same directory we didn't use ./ when using fs cause those are built in files/modules.
console.log(mathFile); // As i said i'll console.log() here you can run it and see what you get.

// Now you can use all the function and properties of the other file.
console.log(mathFile.PI);
console.log(mathFile.square(9));
console.log(mathFile.add(3, 4));

// You could also destructure the incoming object directly if you know what functions you want to use then you won't have to use mathFile. everywhere.
// I'll do the same thing as above like :-
// const {add,square,PI} = require('./math');

// console.log(PI);
// console.log(square(9));
// console.log(add(3,4));
