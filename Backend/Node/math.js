// I'll declare some simple functions and properties in this file that i'll try to use in other file.
const add = (x, y) => x + y;
const square = (x) => x * x;
const PI = 3.14;

// This will send everything we have in this file as a object that object you can console.log() in the other file.
// module.exports.add = add;
// module.exports.square = square;
// module.exports.PI = PI;

// Other shorthand way of exporting is you don't need to use module. but this only works if exports is not a varible assigned to something else like const exports = "Some random string"; if that line exists above then the three lines below won't work.
// exports.add = add;
// exports.square = square;
// exports.PI = PI;

// One other way might be 
// Since we are just sending a object to the other file you can first make a object and then send it.

const mathObject = {
    add : add,
    square : square,
    PI : PI,
}

module.exports = mathObject; 
// exports = mathObject won't work here when you're returning a object directly it doesn't work it only works for cases such as from line 12 to 14.
// One thing to note we don't always have to export a object it's just the most common thing to do we can even export array or strings etc just know that those are the things will be stored in LHS when require() is called.

// module.exports = "yo string";
// If i comment the above module.exports and uncomment this one you'll see that mathFile in usingMathInOtherFile.js will contain the string "yo string".
