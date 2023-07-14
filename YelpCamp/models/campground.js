const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; // Just shortening the term mongoose.Schema for later use.

// I want to define a virtual called .thumbnail on each image so i can show smaller thumbnails on upload page.
// To do that we can use cloudinary image transformation tool that changes the image dynamically based on what option was passed in the URL after /upload
// But virtuals can only be defined on schema's so we will take out the url: String, filename: String and make a new schema and the define the virtual

const ImageSchema = new Schema({
  url: String, // This will store req.files.path so we can access the image from this url we get back from cloudinary.
  filename: String, // This will store the file name that is given by cloudinary to the file we uploaded this helps us in deleting the file from our cloud storage.
});

ImageSchema.virtual("thumbnail").get(function () { // Why do we want thumbnail sized images is cause it's less resource intensive what happens is normally when we want to show smaller images we can set a certain width and height but the problem is cloudinary will still send us those entire high res images one it's wastes data and second it's slow and third it's just not needed.
  return this.url.replace("/upload", "/upload/w_200"); // It will return this new thumbnail url for any image we want but we won't actaully be storing the thumbnail propery in images as it's just a derivative property.
});

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  images: [ImageSchema],
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    // So we can find a user who created this current campground.
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // images: [{ url: String, filename: String }], // Before defining a separate schema this is what the images property looked like.
});

campgroundSchema.post("findOneAndDelete", async (campground) => {
  if (campground) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  }
});

module.exports = new mongoose.model("Campground", campgroundSchema);
