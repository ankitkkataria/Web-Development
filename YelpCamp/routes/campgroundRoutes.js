// Requiring Express Router
const express = require("express");
const router = express.Router({ mergeParams: true });

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Requiring Models
const Campground = require("../models/campground");

// Requiring Joi Validation Schema
const { campgroundSchema } = require("../validationSchemas"); // So i can use it to validate my post and put routes for my campgrounds here.

// Validation Middleware
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

// When using catchAsync it's optional to pass in next argument in these route handlers the reasoning being https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291546#questions/17815506 but one more thing since you're not passing in next in the async function you can only throw new ExpressError here and let the next in the wrapping catchAsync function but you can't do next(new ExpressError()) cause you can't reference next here as you've not included it in the args.
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  validateCampground,
  catchAsync(async (req, res) => {
    // You're using client side validation using bootstrap which means it won't allow you to submit the form with fields missing from the form.
    // But it's still possible to do it using postman/axios or something.
    // So, One way is to use required in mongoose schema itself.
    // Otherway could be like
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400); // This will only save us from cases where campground key is not present in the post request we're not making sure if campground itself is a object to begin with so it's still possible to fool this method but just naming something campground but this is just to show the concept of things that can be done.
    const camp = new Campground(req.body.campground);
    await camp.save();
    req.flash("success", "Successfully created a new campground!");
    res.redirect(`/campgrounds/${camp._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    if (!campground) { // Incase someone bookmarked a campground and then that campground is deleted when that bookmark is then accessed at some point of time a weird looking error is generated there we can rather show a flash message.
      req.flash("error", "Campground no longer exists!");
      res.redirect("/campgrounds");
    }
    const foundReview = 0;
    res.render("campgrounds/show", { campground, foundReview });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) { // Incase someone bookmarked a campground and then that campground is deleted when that bookmark is then accessed at some point of time a weird looking error is generated there we can rather show a flash message.
      req.flash("error", "Campground no longer exists!");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground,
      { new: true, runvalidators: true }
    ); // You could also have used {...req.body.campground} as second arg.
    req.flash("success", "Updated campground  successfully!");
    res.redirect(`/campgrounds/${updatedCampground._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted campground successfully!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
