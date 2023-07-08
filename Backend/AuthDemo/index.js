const express = require("express");
const app = express();
const User = require("./models/user");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

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

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    },
  })
);

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

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (validPassword) {
    res.send("Yay Welcome");
  } else {
    res.send("Wrong username or password");
  }
});

