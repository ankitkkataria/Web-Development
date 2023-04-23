// This file teaches us that <%= %> anything you put in between those tags will be rendered and shown as output in HTML page.
// But anything put in between <% %> will be treated as JS and ran but won't be displayed this is good for loops and ifelse statements.
const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/random", (req, res) => {
  let randomNum = Math.floor(Math.random() * 10) + 1;
  res.render("random2.ejs", { randomNum }); // When you pass in a object here as the second arg it tells our code that hey you're rendering a ejs file it if it contains a rand that actually means this randomNum we generated.
});


