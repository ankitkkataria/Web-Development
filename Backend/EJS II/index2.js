// Copying from index.js without comments.
// Now one thing you should know about express is when you run this file node --watch index2.js it sets the path to the views folder dynamically it does this process.cwd() + "/views".
// What the above line basically means is if you're in a directory outside the EJS directory and you call node --watch Backend/EJS/index2.js it will start looking in Backend for the views folder cause that's process.cwd() (Remember process is the same object used in argv) but it won't find it anywhere and it will give a error saying can't find views folder so we should make sure that in whatever folder this index2.js is present that's where we should look for views folder for that we use path module that's built-into node.

const express = require("express");
const path = require("path"); // Built into node this module allows us to play with directory paths like path.join basically joins all the arguments you pass into it and makes a path for you also remember __dirname returns the path to the directory containing this current file here.
const app = express();

console.log("The path to the folder containing this file is ", __dirname);
console.log("The path to this current file is ", __filename);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs"); // Saying i'll be using the ejs engine.
app.set("views", path.join(__dirname, "/views")); // This line tells my express app that when you're looking for views/templates look in the path (where this file is present/views) if i want to use a different folder name for my templates/views then i can do path.join(__dirname,'/templatesFolderName').
// If you wanna check whether changing the name of the directory for views/templates files from the default views to templatesFolder will work or not try changing the /views to /templatesFolder it will work cause i made a temporary folder called templatesFolder and put the same home.ejs file in it.
app.get("/", (req, res) => {
  res.render("home");
});

