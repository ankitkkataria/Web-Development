const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; // Just shortening the term mongoose.Schema for later use.

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author:{ // So we can find a user who created this current campground.
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

campgroundSchema.post("findOneAndDelete", async (campground) => {
  if (campground) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  }
});

module.exports = new mongoose.model("Campground", campgroundSchema);
