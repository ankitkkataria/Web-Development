// First copy everything from index4.js
// Here we are going to learn about res.redirect()
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

// NEW - renders a form
app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

// CREATE - creates a new comment.
app.post("/comments", (req, res) => { 
  console.log(req.body); 
  const { username, comment } = req.body;
  comments.push({ username, comment }); 
  console.log(...comments); 
  // Content after index4.js 
  // See actually when the form was submitted we were sending that line down below to the webpage.
  // res.send("New comment has been added");
  // If you press enter there on the URL you'll send a get request to /comments and you'll see all the comments.
  // But if you were to press refersh chrome would ask well you just sumitted a form here do you want to submit it again and if you say yes the same data you entered there will be added again and as many times you refersh the page you will add duplicate data to the comments data structure.
  // So,Usually what people do after submission of a form they redirect to somewhere we can redirect to the all comments page.
  res.redirect("/comments"); // This line leads to 2 request made consecutively firstly a HTTP request with 302 status code will be made which means redirection request and that request will contain a field called location which will have stored /comments in it and after that our browser will say oh! i've got a redirection request with status code 302 then it will check the location field in it and find /comments URL and then it make a new get request to URL /comments and we already know what happens when we get a get request on /comments we just display all the comments we have stored.
});
