const express = require("express");
const app = express();
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./validationSchemas"); // So i can use it to validate my post and put routes for my campgrounds here.
const Review = require("./models/review");
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

// Middleware
app.use(express.urlencoded({ extended: true })); // All these inside the app.use() are functions that are executed on each and every reqeust we get to our webpage.
app.use(methodOverride("_method"));

// Starting server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

// Setting up EJS
app.engine("ejs", ejsMate); // This is so instead of using the default ejs engine it starts using the new ejsMate engine that allows us to easily make boilerplate code and saves us from repeating the code even better than what ejs partials did for us.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setting up my custom middleware function that will use Joi to validate the campground whereever needed.
const validateCampground = (req, res, next) => {
  // After building the schema this line below is used to run the validation code on the req.body object.
  // const result = campgroundSchema.validate(req.body); // It will return you an result that will contain a error object that will be defined if a error is generated if any of the property doesn't follow any of the specified constraints but if everything is valid in that case the value of the error property will be left undefined and the if condition if(error) will surely fail.
  // console.log(result);
  // console.dir(result.error.details);
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    // This line below takes the details array of objects in the error object and makes a new array containing all the messages present in that details array if there are more than one errors using the map operator and then joins all those messages using (,) and returns it.
    const allErrorMessages = error.details.map((ele) => ele.message).join(","); // Here ele is a element which is nothing but a object of the details array and this join will help us return a string of all the elements in the new mapped array that we formed out of all the messages.
    throw new ExpressError(allErrorMessages, 400);
  } else {
    next(); // If there is no error just go ahead and call the next middleware function that will go ahead and try to add a new campground or edit an existing campground.
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const allErrorMessages = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(allErrorMessages, 400);
  } else {
    next();
  }
};

// Setting up routes
app.get("/", (req, res) => {
  res.render("home");
});

// When using catchAsync it's optional to pass in next argument in these route handlers the reasoning being https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291546#questions/17815506 but one more thing since you're not passing in next in the async function you can only throw new ExpressError here and let the next in the wrapping catchAsync function but you can't do next(new ExpressError()) cause you can't reference next here as you've not included it in the args.
app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res) => {
    // You're using client side validation using bootstrap which means it won't allow you to submit the form with fields missing from the form.
    // But it's still possible to do it using postman/axios or something.
    // So, One way is to use required in mongoose schema itself.
    // Otherway could be like
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400); // This will only save us from cases where campground key is not present in the post request we're not making sure if campground itself is a object to begin with so it's still possible to fool this method but just naming something campground but this is just to show the concept of things that can be done.
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    res.render("campgrounds/show", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground,
      { new: true, runvalidators: true }
    ); // You could also have used {...req.body.campground} as second arg.
    res.redirect(`/campgrounds/${updatedCampground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    campground.reviews.push(newReview);
    await campground.save(); // If i add await in front of both of them then they will be saved sequentially but right now they will be saved parallelly.
    await newReview.save(); // See if you have to use the saved result here immediately let's say for campground in that case adding a await makes sense but if you're not using it then you don't need to make these saves sequential.
    res.redirect(`/campgrounds/${id}`); // Can not awaiting both those above lines cause an error.
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // What the pull operator does is from array reviews it pulls/deletes all the occurences of reviewId.
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

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
