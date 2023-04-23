// First copy everything from index3.js
// Second if you look at the REST slides page-5 here i'll be setting the create functionality when i get a request at comments/new i'll render a form there and once that form is submitted i'll submit it as a post request and then to the URL that submit post request is being sent to i'll use app.post() here and say whenever i get a post request to that route store the info sent by the user in my fake database.

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
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

// INDEX - renders all comments currently in database.
app.get("/comments", (req, res) => {
  res.render("comments/index.ejs", { comments });
});

// Content after index3.js file.

// NEW - renders a form
app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

// CREATE - creates a new comment
app.post("/comments", (req, res) => { // This method is to take care of the post request sent by the new comment form.
  // Bcz of line 17 all the data sent by the form will be parsed and stored in req.body.
  console.log(req.body); // If you want to make sure whatever you send from the new comment form got here or not.
  const { username, comment } = req.body;
  comments.push({ username, comment }); // This will push the new object containing username and comment in the comments array we can do this cause due to destructring username and comment are now variables and here you're saying store a object containing these two variables these variables are automatically treated as key-value pairs.
  console.log(...comments); // You can check your key-value pair you sent from the form is now succsessfully stored in the array you can even open localhost:3000/comments you'll find a new comment there as well.
  res.send("New comment has been added")
});
