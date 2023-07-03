const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
// const Joi = require('joi'); // Not needed here anymore as we are importing our schemas from validationSchemas file and that itself is importing joi.

// Connecting to the mongoose database server.
mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp")
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

// Router Middleware
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes); // When you use a param in the prefix route you must go ahead and merge params in the corresponding file (Here that file is reviewRoutes.js) that's cause routers get their own separate params so we will have to merge them if we want to access them in our router.get() methods specified in reviewRoutes.js file.

// Starting server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

// Setting up EJS
app.engine("ejs", ejsMate); // This is so instead of using the default ejs engine it starts using the new ejsMate engine that allows us to easily make boilerplate code and saves us from repeating the code even better than what ejs partials did for us.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
