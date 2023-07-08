// Copied index.js
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
    secret: "notagoodsecret",
  })
);

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/secret", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    // Only a logged in person should be able to see this.
    res.render('secret'); // You can even return this statement.
    // res.send("This is secret! You cannot see me unless you are logged in");
  }
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
  // When i register a new user i will automatically consider them logged in (to do that i will store a new property in the session object)
  req.session.user_id = user._id; // I can even do req.session.isLoggedIn = true; // But i store user._id as it makes it easier to identify who is logged in and you can display their name or if they comment we can identify oh this person is the one who commented.
  res.redirect("/secret");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (validPassword) {
    req.session.user_id = user._id; // If someone goes to other browser after registering and signs in we will store this user_id here.
    res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  // Or instead of doing the way it is done in the line above we can also do req.session.destroy() that will delete everything in the session.
  res.redirect("/login");
});

/*
Ques :- For logout what should we use get or post ?
Sol :- Use POST.
In 2010, using GET was probably an acceptable answer. But today (in 2013), browsers will pre-fetch pages they "think" you will visit next.
*/

// Now to login you can't just send a random cookie name connect.sid that just has a user_id that's random that's cause the cookie we have is a signed cookie so the server will immediately know if it has been tempered with by anyone.
// So, If the cookie is the same as the server initially sent and in req.session if it finds the user_id only then will it say oh! you're logged in.
// To, Logout all you gotta do is remove this user_id property by making it null or destroying the entire session itself (If there are multiple cookies that are there and you want to delete all of them but here we only have one so we can also just set it to null.)
