if(process.env.NODE_ENV != 'production') {
  require('dotenv').config(); // .env file must be in the root directory of this project
} 

// console.log(process.env.CLOUDINARY_KEY); // You can access anything you store in the .env file using process.env

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session"); // Including session capability cause of two reasons one is we would like to use flash messages & other being we would like to use session for authentication.
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local"); // passport-local-mongoose has nothing to do with this here that's just in our model file.
const User = require("./models/user");
const multer = require('multer');
const upload = multer({dest:'uploads/'})
// const Joi = require('joi'); // Not needed here anymore as we are importing our schemas from validationSchemas file and that itself is importing joi.

// Connecting to the mongoose database server.
mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

// Parsing and Method Override Middleware
app.use(express.urlencoded({ extended: true })); // All these inside the app.use() are functions that are executed on each and every reqeust we get to our webpage.
app.use(methodOverride("_method"));

// Session Middleware
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // These options are for the session id cookie that is sent by the server initially.
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Means keep the cookie valid for a week (milliseconds).
    maxAge: 1000 * 60 * 60 * 24 * 7, // This is so we would have to relogin after a week otherwise as long as we have that cookie we don't ever need to login again.
  },
};
app.use(session(sessionConfig));

// Flash Middleware :- Using this middlware adds a flash method to every incoming request using which you can send and access flash messages also bcz it's added to every request before it being sent to the router we don't need to require flash in that file now I will go to my routes and send new flash messages. Something to read :- https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291778#questions/19753164
app.use(flash()); // This must be above router middlware because otherwise when you go to a route like creating a new campground from where you will try to send a flash message you won't have access to the req.flash() method also flash() middlware should also be after session middleware because it uses the session memory inorder to be able to store the flash messages.

// Passport Middleware (Must be after session middleware)
app.use(passport.initialize()); // This is required to initialize passport
app.use(passport.session()); // If your app uses persistent login session and you don't have to login on every page (that might also be used in some apis) then you must use passport.session() middleware.
passport.use(new LocalStrategy(User.authenticate())); // This says hey passport we would like you to use the LocalStrategy that we have downloaded and required and for that LocalStrategy the authentication method is going to be located on our User model called authenticate (that was not added by us but by passport-local-mongoose);

passport.serializeUser(User.serializeUser()); // passport-local-mongoose generates a function called serializeUser that tell my passport how i want to add users into my session.
passport.deserializeUser(User.deserializeUser()); // Similar to above like but for removing.

// Res.locals Middleware (Since we are using req.user here that is added only by passport middleware this should these res.locals middleware must always be present after the passport middlewares cause as it's known middleware execute from top to bottom)
app.use((req, res, next) => { // This should also be after flash middleware otherwise we won't have access to req.flash()
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // Instead of passing in req.user on every single path/request literally all of them to like hide logout and login button cause navbar is on every page rather i can add it here on res.locals.
  res.locals.currUser = req.user; // This will be null if no one is signed in and it will have a user if someone is infact signed in.
  // console.log("Before sending it to the next middleware");
  // console.log(req.user); // Used this to find out that i needed to put res.locals middlware below the passport middleware.
  next();
});

// Registering a new user becomes pretty easy when you have passport
// app.get("/registerfakeuser", async (req, res) => { // After going to this page you'll get a new user in your database.
//   const user = new User({email : 'ankitkataria@gmail.com',username:'ankit'});
//   const userWithHashedPassword = await User.register(user,'ankitkataria1234'); // This register method we get due to passport-local-mongoose it checks if the username is unique and secondly it hashes the password and stores it under the hash field and also stores the salt it used in the userWithHashedPassword object it does that cause it's not using bcrypt it's using something else like pbkdf2 or some weird algo reason being it says bcrypt is platform dependent while it's not.
//   res.send(userWithHashedPassword); // Similar to register method above passport,passport-local,passport-local-mongoose provide us the ability to use these methods that otherwise we would have to write on our own.
// });

// Router Middleware
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes); // When you use a param in the prefix route you must go ahead and merge params in the corresponding file (Here that file is reviewRoutes.js) that's cause routers get their own separate params so we will have to merge them if we want to access them in our router.get() methods specified in reviewRoutes.js file.
app.use("/", userRoutes);

// Starting server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

// Setting up EJS
app.engine("ejs", ejsMate); // This is so instead of using the default ejs engine it starts using the new ejsMate engine that allows us to easily make boilerplate code and saves us from repeating the code even better than what ejs partials did for us.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serving static assets
app.use(express.static(path.join(__dirname, "public")));

// Setting up routes
app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  // This must be at the end of the file this takes care of all the possible get/post/put/patch/delete requests we did not handle.
  next(new ExpressError("Page Not Found", 404)); // We are not throwing a error directly instead we are using next cause it's possible some asynchronus errors might make it down to this level.
  // next(new Error);  // Comment the above line and send this simple error to see the Louli's version working.
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something went wrong!"; // If the error has a undefined message than this will be set up for it.
  res.status(statusCode).render("error", { err });
});

// Louli's version to show that why if (!err.statusCode) err.statusCode = 500; is not neccessary cause we're going to use it res.status(statusCode) right here and we don't need to pass it to the ejs template.
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "It won't work" } = err;
//   console.log(`BEFORE: statusCode=${err.statusCode}, message=${err.message}`);
//   if (!err.message) err.message = 'Oh No, Something Went Wrong!';
//   if (!err.statusCode) err.statusCode = 500;
//   console.log(`AFTER: statusCode=${err.statusCode}, message=${err.message}`);
//   res.status(statusCode).render('error', { err });
// })

// Louli's explanation behind using Joi as a data validation tool
// I don't believe Joi is easier at all, as it has too many details when compared to the Mongoose validation, but it's considered safer, as it validates the data way before any attempt of data insertion to the database, different from mongoose, that validates the data when it's being added to the database. If you have a small, simple-purpose application that won't deal with payment or something considered 'more dangerous', then you can use only MongoDB validation; otherwise, it may be a better choice to use a package like Joi.

