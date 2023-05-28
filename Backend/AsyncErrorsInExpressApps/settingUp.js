// In this file i'll be just connection mongoose and express.
// Till now we have only seen how to use routes and forms in routes to manipulate a fake databse we created with the help of a array now we will see how to do it using an actual database.
// Immidiately after forming this folder i did few basic things 
// npm init -y
// npm i express mongoose ejs
// mkdir views
// touch index.js

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

// Starting up the server
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connecting to the mongoose database server.
mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });
  
// Setting up a basic route.  
app.get("/dogs", (req, res) => {
  res.send("Woof");
});
