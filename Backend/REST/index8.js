// Copying index7.js
// Here i'll learn about how to update a specific comment's text.
// We use patch request for the above task patch request when sent to a path comments/:id that should update my comment's text.
// People use patch and put interchangably but that's not the right way of doing it actually put is when you update everything like here if you update everything about your comment like username,comment's text and id as well and just replace it entirely that's where put is good but patch is like updating something that's just a part of the overall resource like here we're updating a part of the comment itself.

const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid"); // New line
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
  comments.push({ username, comment, id: uuid() });
  // console.log(...comments);
  res.redirect("/comments");
});

// SHOW - details about one particular comment.
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  for (const currComment of comments) {
    console.log("i ran");
    if (id === currComment.id) {
      res.render("comments/show.ejs", { currComment }); // Once you find a comment with matching id you just send it to the show.ejs page where we will render it.
      break;
      // Instead of using this for loop to find comment one other way is const comment = comments.find((c) => c.id === id)
    }
  }
});

// UPDATE - updates a particular comment.
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  let originalComment;
  // Finding the originalComment with the id found in the URL so i can make the neccessary update.
  for (const currComment of comments) {
    if (currComment.id === id) {
      originalComment = currComment;
      break;
    }
  }
  // Instead of using for loop you could also do const originalComment = comments.find((c) => c.id === id);
  // Similar to a post request in a patch request also we have a req.body that contains the payload of the message.
  // Get new text from req.body
  const newCommentText = req.body.comment;
  // Update the comment with the data from req.body:
  originalComment.comment = newCommentText;
  // Just like post request we don't usually res.send any content from a patch request like bcz of the form resubmission issue.
  // So, We will redirect back to index (or wherever you want).
  res.redirect("/comments");
});

// To get the above code to work in the next file we will see a form that sends a patch request for this update but if you want to test it right here you can send a patch request from postman to the id of one the comments above the req.body must contain some text with property name comment any your comment text will be updated.