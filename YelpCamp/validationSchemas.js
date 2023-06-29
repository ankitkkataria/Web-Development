const Joi = require("joi"); // I'll use Joi for data validation in my when submitting a new campground or updating a existing campground.

// Using Joi to make a schema which will help us to validate the data before we even attempt to save it to the actual database.
module.exports.campgroundSchema = Joi.object({
  // This says whatever you pass in this schema during the validation it must be a object and yes req.body is a object inside that object there must be another object by the name of campground that is required and within that campground object there must be these properties having these types and following these particular constraints.
  // Format inside Joi schema => (property name : Joi.typeThatPropertyNeedsToBe().additionalConstraints().
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
