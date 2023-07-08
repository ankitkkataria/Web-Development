const express = require("express");
const app = express();
const User = require("./models/user");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/loginDemo")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/secret", (req, res) => {
  res.send("This is secret! You cannot see me unless you are logged in");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  // console.log(hash);
  const user = new User({
    username,
    hashedPassword: hash,
  });
  await user.save();
  // console.log(I was here);
  res.redirect("/");
});
