// Copying product.js
// Here we will learn about a few more things like adding arrays in the schema and objects and a few more schema validators.
// One more thing we'll see oh! whatever schema we made documents/objects entered in the database only need to follow them during insertions but when updating you can break those rules inorder for those rules to be followed even during updation we need to add another option called runValidators : true.
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20, // max length this string can have is 20 characters.
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The value you have enterted is too small"], // min value this number can have is 0 and the second argument you passed in is custom error message that you'll get if someone tries to insert a value les than zero.
  },
  categories: {
    type: [String], // This means this property will store a array of strings.
  },
  // Other way of doing the same thing above is categories : [String]
  qty: {
    // This will make the schema expect a object to be passed in called qty that will store two properties itself it can be thought of like splitting the coloumn into two columns and even on those two subcolumns i'm applying the schema validation.
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size : {
    type : String,
    enum : ['S','M','L'] // enum allows us to do this here any insertion that has a size anything other than these three things will produce a validation error.
  }
});

const Product = new mongoose.model("Product", productSchema);

const bike = new Product({ name: "Bike Cycling Jersey", price: 29.99, categories:['cycling','safety',123],size : 'M'}); // 123 will be converted into a string but if you passin [] as one of the values in the categories array you'll get a error.
bike.save()
  .then((data) => {
    console.log("It Worked");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh Error");
    console.log(err);
  });

Product.findOneAndUpdate({ name: "Bike Helmet" },{ price: -12 },{ new: true, runValidators: true }) // If you remove runValidators you'll be able to put in negative values in price.
  .then((data) => {
    console.log("It Worked");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh Error");
    console.log(err);
  });
  