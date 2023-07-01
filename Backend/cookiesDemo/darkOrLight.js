const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

// Starting server
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("chooseBetweenDarkAndLight");
});

app.post("/darkbutton", (req, res) => {
  res.cookie("colorPreference", "dark");
  res.redirect("/homepage");
});

app.post("/lightbutton", (req, res) => {
  res.cookie("colorPreference", "light");
  res.redirect("/homepage");
});

app.all("*", (req, res) => {
  const { colorPreference } = req.cookies;
  console.log(req.cookies);
  console.log(colorPreference);
  if (colorPreference === "dark") {
    res.render("dark");
  } else {
    res.render("light");
  }
});
