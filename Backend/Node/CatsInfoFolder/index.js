// This file is extremely of importance as anyone outside this folder if they import this directory into their file using require what they will get is only whatever was exported by this file.
const blue = require('./blue');
const janet = require('./janet');
const sadie = require('./sadie');

const allCats = [blue,janet,sadie];
// console.log(allCats);

module.exports = allCats; // We can return anything not just objects like arrays,strings or anything just know whatever you return will be stored in the const LHS = require("./catsInfoFolder") in the LHS whatever you returned from index.js file will be stored.