// In this file we will learn about schema validation using mongoose.
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
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
  // The way you used schema in index.js is a shorthand notation where it automatically assumed you're specifying type information but normally we do this we specify a object that contains all the information about that property.
  name: {
    type: String,
    required: true, // If during inserting a new document in the collection if this property is not assigned a value then it won't be inserted and a error will be produced.
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema); // By this line a products collection will be made that will follow the productSchema.

const bike = new Product({ name: "mountain bike", price: "599" });
bike
  .save()
  .then((data) => {
    console.log("It Worked");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh Error");
    console.log(err);
  });

// A few more things if while inserting you try to insert a new property inside a document while inserting it into the collection and that new property is not in schema then it will not produce a error and the document will be inserted but the entry that wasn't in the schema won't be shown when you go and check in the database.
// Another thing is let's say price is expecting a number but you pass in "599" it will still work as long as it can convert it into a number but if you enter "hjalkadsfhklahdfk" it will produce an error.

