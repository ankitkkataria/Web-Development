// In this file i'll just set up my /comments get reqeust which is nothing but a request that will display all the comments in our database.
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
  res.render("comments/index.ejs", { comments }); // Here you're passing the entire comments array this line is equivalant to {comments : comments} in the ejs file called index now whenever you type comments that just means you're referring to this particular array.
});
