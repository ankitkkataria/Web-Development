const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// app.get("/random", (req, res) => {
//   res.render("random");
// });

// First i put in the line <h1>Your random number is : <%= Math.floor(Math.random()*10) + 1 %></h1> in ejs but you should put as minimum of logic in ejs as possible just use it as a template.
// So instead of the above line being put in the ejs file what if i pass the random number directly to the ejs file.

// app.get("/random", (req, res) => {
//   let randomNum = Math.floor(Math.random() * 10) + 1;
//   res.render("random.ejs", { rand: randomNum }); // When you pass in a object having key and value pairs here as the second arg it tells our code that hey you're rendering a ejs file it if it contains a rand that actually means this randomNum we generated.
// });

// But if you're going to use the same name in the ejs file as it is here we have a shorthand notation rather then doing {randomNum : randomNum} just do {randomNum} they are both equivalent.

app.get("/random", (req, res) => {
  let randomNum = Math.floor(Math.random() * 10) + 1;
  res.render("random.ejs", { randomNum }); // When you pass in a object here as the second arg it tells our code that hey you're rendering a ejs file it if it contains a rand that actually means this randomNum we generated.
});
