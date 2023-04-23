// This file is used to set up some basic enteries in the database/collection just so we don't clutter the index.js file with everything this file is called seeds file usually cause it initially seeds the data into our database.
const mongoose = require("mongoose");
const Product = require("./models/product");

// Connecting to the mongoose database server.
mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

const p = new Product({
  name: "Ruby Grapefruit",
  price: 1.99,
  category: "fruit",
});
p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  });

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts) // In insertMany i need to pass in a array of objects.
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})
