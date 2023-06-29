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
});

campgroundSchema.post("findOneAndDelete", async (campground) => {
  if (campground) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  }
});

module.exports = new mongoose.model("Campground", campgroundSchema);
