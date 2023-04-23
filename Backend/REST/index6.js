// First copy everything from index5.js
// Here we are going to learn about showing one specific resource here we're going to learn how to show only one specific comment.
// This is usually used to see a detailed information about one thing like a specific user,specific comment,specific tvshow etc.

const express = require("express");
const app = express();
const path = require("path");

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
    id: 1,
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: 2,
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: 3,
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: 4,
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

// CREATE - creates a new comment
app.post("/comments", (req, res) => {
  // console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment });
  // console.log(...comments);
  res.redirect("/comments");
});

// SHOW - details about one particular comment.
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  for (const currComment of comments) {
    if (parseInt(id) === currComment.id) { // Using parseInt cause the id you get from the req.params is a string but in the object the id we've made it a integer other way of dealing with this is using == rather then ===.
      res.render("comments/show.ejs", { currComment }); // Once you find a comment with matching id you just send it to the show.ejs page where we will render it.
      // Instead of using this for loop to find comment one other way is const comment = comments.find((c) => c.id === id);

    }
  }
});
