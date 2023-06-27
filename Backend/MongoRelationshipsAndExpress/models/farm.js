const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;

// I'll not embed all the products in a farm directly cause we want a page that will show just all products too.
