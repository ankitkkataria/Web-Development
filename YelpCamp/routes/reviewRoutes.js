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
    res.redirect(`/campgrounds/${id}`); // Can not awaiting both those above lines cause an error.
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // What the pull operator does is from array reviews it pulls/deletes all the occurences of reviewId.
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

router.get(
  "/:reviewId/edit",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    const foundReview = await Review.findById(reviewId);
    res.render("campgrounds/show", { campground, foundReview });
  })
);

router.put(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // What the pull operator does is from array reviews it pulls/deletes all the occurences of reviewId.
    await Review.findByIdAndDelete(reviewId);
    const updatedReview = new Review(req.body.review);
    campground.reviews.push(updatedReview);
    await campground.save();
    await updatedReview.save();    
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
