// Copying index8.js
// Here i'll learn about getting patch request from a form when forms from web can only send get and post request but using a npm package method-override where it will recieve a post request but due to some match like _method=patch it will treat that reqeust as a patch request.
const express = require("express");
const app = express();
const path = require("path");

const { v4: uuid } = require("uuid"); // New line
// Now after doing the above thing calling uuid() returns a random string.
console.log(uuid());

const methodOverride = require("method-override");
// Bcz of the line above i'll be able to send patch request from the edit.ejs page.
// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method")); // Meaning along with the form's action(meaning where it will be submitted) in the search query if you type _method=patch then when express gets a post request on that path and it sees _method=patch it will treat it as a patch request not a post request and the code written inside the app.patch will run not app.post even though they are on the same URL but the HTTP request type is different.


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
  for (const currComment of comments) {
    if (currComment.id === id) {
      originalComment = currComment;
      break;
    }
  }
  const newCommentText = req.body.comment;
  originalComment.comment = newCommentText;
  res.redirect("/comments");
});

// Setting up a path for the edit request i might get comments/id/edit this should open a form that has some text area that i can enter text in and based on that my text should change.
app.get('/comments/:id/edit', (req, res) => {
  const {id} = req.params;
  // Find the comment cause into edit.ejs i'd like to passed in the comment itself so we can see the old comment also when we're editing.
  let originalComment;
  for (const currComment of comments) {
    if (currComment.id === id) {
      console.log("finding comment");
      originalComment = currComment;
      break;
    }
  }
  console.log(originalComment.comment);
  res.render('comments/edit.ejs',{originalComment});
});