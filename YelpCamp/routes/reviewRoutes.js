// Requiring Express Router
const express = require("express");
const router = express.Router({ mergeParams: true });

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Requiring Models
const Campground = require("../models/campground");
const Review = require("../models/review");

// Requiring Joi Validation Schema
const { reviewSchema } = require("../validationSchemas"); // So i can use it to validate my post and put routes for my reviews here.

// Validation Middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const allErrorMessages = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(allErrorMessages, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    campground.reviews.push(newReview);
    await campground.save(); // If i add await in front of both of them then they will be saved sequentially but right now they will be saved parallelly.
    await newReview.save(); // See if you have to use the saved result here immediately let's say for campground in that case adding a await makes sense but if you're not using it then you don't need to make these saves sequential.
    req.flash("success", "Successfully created a new review!");
    res.redirect(`/campgrounds/${id}`); // Can not awaiting both those above lines cause an error.
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // What the pull operator does is from array reviews it pulls/deletes all the occurences of reviewId.
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted review successfully!");
    res.redirect(`/campgrounds/${id}`);
  })
);

router.get(
  "/:reviewId/edit",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    const foundReview = await Review.findById(reviewId);
    console.log(foundReview); // Incase you bookmark the review editing page and then that review is deleted then foundReview will become null and the code when their is no review will be executed in the ejs file so you don't need to put and flash message here.
    res.render("campgrounds/show", { campground, foundReview });
  })
);

router.put(
  // For Updating a review what i was doing was first i would pull out the review with that id from this campground's review's array then I would go ahead find and delete the review from the reviews collection then finally i would make a new review with a brand new id and push it in the reviews array of this campground and render the page again but the problem with that was my new updated review would go to the end of the list so my new method works by just updating the data in the review object only in the reviews collection and not tempering with the objectId in the reviews array in campground object at all.
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndUpdate(reviewId, req.body.review);
    const review = await Review.findById(reviewId);
    /*
    Down below is what I was doing previously It's stupid I know but still let's just keep it here.
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // What the pull operator does is from array reviews it pulls/deletes all the occurences of reviewId.
    await Review.findByIdAndDelete(reviewId);
    const updatedReview = new Review(req.body.review);
    campground.reviews.push(updatedReview);
    await campground.save();
    await review.save();
    */
    req.flash("success", "Updated review successfully!");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
