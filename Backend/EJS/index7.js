// This file teaches us about 
const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Remember <% %> is only used for control flow like loops and conditional statements.

app.get("/cats", (req, res) => {
    const allCats = ['bilu','bula','billi','lilly','cherry'];
    res.render("cats",{allCats}); // This line just says render the cats page and second arg says if you find a name called allCats in between <% %> called allCats it's this array i'm passing from here.
});

