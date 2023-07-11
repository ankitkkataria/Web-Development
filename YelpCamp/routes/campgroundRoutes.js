// Requiring Express Router
const express = require("express");
const router = express.Router({ mergeParams: true });

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");

// Requiring isLoggedIn and validateCampground Middleware
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// Requiring Campgrounds Controller
const campgrounds = require("../controllers/campgroundsController");

// router.route allows us group together requests that send a request to the same path it allows us to define a path and let's us chain on requests having different HTTP verbs onto that route also you don't need to specify path again in the chained on get, post, put, patch or delete requests.
router
  .route("/")
  .get(catchAsync(campgrounds.index)) // Index Route (When using catchAsync it's optional to pass in next argument in these route handlers the reasoning being https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291546#questions/17815506 but one more thing since you're not passing in next in the async function you can only throw new ExpressError here and let the next in the wrapping catchAsync function but you can't do next(new ExpressError()) cause you can't reference next here as you've not included it in the args. Also campgrounds here represent the object returned from campgroundsController file that contains all the functions we use here in this file we are just cleaning up our routes file.)
  .post( // Create Campground Route
    isLoggedIn,
    // isAuthor, // I had put this here for some really odd reason but this will give a error in a post route for sure cause currently this campground doesn't even exist how will you go and look for a author for this campground.
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

// Render New Campground Form Route (Must be before /:id route)
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// :id Path
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground)) // Show Campground Route
  .put( // Update Campground Route
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // Delete Campground Route

// Render Edit Campground Form Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor, // There is a issue here that is if you bookmark the edit page and then somehow that campground is infact deleted then our isAuthor does campground.author that will break.
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
