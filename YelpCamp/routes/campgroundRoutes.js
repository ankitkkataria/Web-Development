// Requiring Express Router
const express = require("express");
const router = express.Router({ mergeParams: true });

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");

// Requiring isLoggedIn and validateCampground Middleware
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// Requiring Campgrounds Controller
const campgrounds = require("../controllers/campgroundsController");

// Index Route
router.get("/", catchAsync(campgrounds.index)); // When using catchAsync it's optional to pass in next argument in these route handlers the reasoning being https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291546#questions/17815506 but one more thing since you're not passing in next in the async function you can only throw new ExpressError here and let the next in the wrapping catchAsync function but you can't do next(new ExpressError()) cause you can't reference next here as you've not included it in the args. Also campgrounds here represent the object returned from campgroundsController file that contains all the functions we use here in this file we are just cleaning up our routes file.

// Render New Campground Form Route
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// Create Campground Route
router.post(
  "/",
  isLoggedIn,
  // isAuthor, // I had put this here for some really odd reason but this will give a error in a post route for sure cause currently this campground doesn't even exist how will you go and look for a author for this campground.
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// Show Campground Route
router.get("/:id", catchAsync(campgrounds.showCampground));

// Render Edit Campground Form Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor, // There is a issue here that is if you bookmark the edit page and then somehow that campground is infact deleted then our isAuthor does campground.author that will break.
  catchAsync(campgrounds.renderEditForm)
);

// Update Campground Route
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

// Delete Campground Route
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
