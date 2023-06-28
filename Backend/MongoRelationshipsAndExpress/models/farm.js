const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("./product");
const { fileLoader } = require("ejs");
const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// Defining Mongoose Middleware Example (But still read them please)
// Since findOneAndDelete is a query attaching pre,post to it makes it a query middleware and something weird about query middleware If you look our pre middleware, the data that was passed in was not real data, it was a function.Anyway, my point is that inside of the pre middleware, we don't have access to the farm that is being deleted, which makes sense. It's running before the query in the post middleware.
// farmSchema.pre("findOneAndDelete", async (data) => {
//   console.log("Pre Middleware");
//   console.log(data);
// });

// Also you don't need to manually call next() here in mongoose middleware just returing a promise is enough which anyway our async function does by default.
// If you see the previous instance of where you learnt about the middleware here in mongoose you'll see us using it on save that is a document middleware in those we did not need to use post cause in those this referred to the document itself but here in query middleware this refers to the query anyways all this is available on the docs for us to look at.
// farmSchema.pre("findOneAndDelete", async (data) => {
//   console.log("Post Middleware");
//   console.log(data);
// });

// Defining Mongoose Middleware
farmSchema.post("findOneAndDelete", async (farm) => {
  // findByIdAndDelete is converted to findOneAndDelete so we will be using that as our query on which we would like to define our middleware on cause findByIdAndDelete is not available.
  if (farm.products.length) {
    const deletedInfo = await Product.deleteMany({
      _id: { $in: farm.products },
    });
    console.log(deletedInfo);
  }
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;

// I'll not embed all the products in a farm directly cause we want a page that will show just all products too.

// Question :- 
// To be clear, the argument inside the async function for the mongoose middleware "catches" the result (what would be caught by a .then() normally) of the given method which it is being used for (in this case, findOneAndDelete() and findByIdAndDelete())?
// Answer :- Correct, that's why it's available in the post and not the pre.