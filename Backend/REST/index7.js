// First copy everything from index6.js
// Here we learn how to use use uuid (universally unique identifier).
// See if you used index6.js and try to add a new comment you won't get to see it's details(link) cause in the post request of adding a new comment i wasn't adding any identifier to the object of the new comment i was adding to the comments array.
// Now instead of adding ascending numbers i will add actually unique ids.
// First do npm i uuid.
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require('uuid'); // New line
// Now after doing the above thing calling uuid() returns a random string.
console.log(uuid());
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// Views folder and EJS setup:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());

// Our fake database:
let comments = [
  {
    id: uuid(), // Change instead of numbers i'm using uuid.
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

// INDEX - renders all comments currently in database.
app.get("/comments", (req, res) => {
  res.render("comments/index.ejs", { comments });
});

// NEW - renders a form.
app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

// CREATE - creates a new comment.
app.post("/comments", (req, res) => {
  // console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment , id : uuid()});
  // console.log(...comments);
  res.redirect("/comments");
});

// SHOW - details about one particular comment.
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  for (const currComment of comments) {
    console.log('i ran');
    if (id === currComment.id) { 
      res.render("comments/show.ejs", { currComment }); // Once you find a comment with matching id you just send it to the show.ejs page where we will render it.
      break;
      // Instead of using this for loop to find comment one other way is const comment = comments.find((c) => c.id === id)
    }
  }
});
