// First copying index2.js
// In this file i'll write a wrapper function that will help us in not repeating the try/catch in all the async functions.

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");
const AppError = require("./AppError");
// Starting up the server
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Setting up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Putting in all the middleware together
// For decoding the post requests that you will get when you get data from the form you served when setting up the products/new route.
app.use(express.urlencoded({ extended: true }));
// For making post request act like put request when we send data from our edit form.
app.use(methodOverride("_method"));

// Connecting to the mongoose database server.
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand2")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

const categories = ["fruit", "vegetable", "dairy"];

//  ====================================
//  DEFINING THE NEW WRAP ASYNC FUNCTION
//  ====================================

const wrapAsync = (fn) => { // This uses the property of async functions returning promises since the function passed in inside is an async function that means it will return a promise so i can chain a .catch() method to that function.
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

//  =================
//  SETTING UP ROUTES
//  =================

// Setting up a index route (Following the RESTful routes convention)
app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    // Making this a async function cause i'm making a request to the database.
    const { category } = req.query;
    if (category) {
      // If category is passed in the URL as a search query if not just display all the products normally.
      const products = await Product.find({ category: category }); // Or you could even do Product.find({category});
      res.render("products/index", { products, category }); // Display the products that belong to that category all index page does is just whatever array of products you pass in it displays them also we pass in the category cause we'd like to say which category products i'm showing.
    } else {
      const products = await Product.find(); // You can also do Product.find({}) or db.products.find() or db.products.find({})
      // console.log(products);
      res.render("products/index", { products, category: "All" }); // We're putting all the templates inside another folder called products inside views cause we might have multiple collections like products,users,orders etc. and in each folder we can have it's own index template and show template etc and also we just passed in category as All cause on the index page i won't have to use if else condition i can just use category and it will just display All or the catergory name itself.
    }
  })
);

// Setting up insert route (no need to add error handling here)
app.get("/products/new", (req, res) => {
  // This should just serve me a form
  res.render("products/new.ejs", { categories });
});

// Setting up a post route for /products we will get request to this route when the new product form is submitted.
app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    // Here we will deal with errors like you missed a field while making a new product
    // Since i've already parsed the URL data above we will be able to directly access it here in req.body no problem.
    // console.log(req.body); // { name: 'Blueberry', price: '1', category: 'fruit' } this is what the req.body looks like we can directly save this data in my database you can store some of the information you get from a form by destructring the object probably but here i'll store everything directly.
    const newProduct = new Product(req.body);
    await newProduct.save(); // This is a async operation so we shall wait here till it finishes before executing the next line of code.
    res.redirect(`/products/${newProduct._id}`); // Redirecting (cause form resubmission problem might occur) to the show page for this new product by sending the correct kind of get request also we did not ask for _id in the form it was provided to us when we saved it in the mongoose database.
  })
);

// Setting up the show route
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    // These normal route handlers also have access to next call.
    const { id } = req.params;
    // Search the database for the document with that id.
    const product = await Product.findById(id);
    // The code below will not work in async functions to throw errors you must use the next() function to throw errors.
    // if (!product) {
    //   throw new AppError("Product Not Found", 404);
    // }
    // This line below is actually the correct way of throwing error from a async function when you pass any arg in next it autoamatically calls the next error handler.
    if (!product) {
      throw new AppError("Product Not Found", 404); // Now i'm not returning it to next() function here like i was doing in index.js cause i realize that error can not only occur in this line but also in any of the lines above so i'll just wrap it in try catch and say this line actually is executed and a error is infact thrown in that case i can just take it and catch it in catch statement and from there send it using next() call.
    }
    res.render("products/show", { product });
  })
);

// Setting up an edit form generation route
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    // Again during editing you can leave any field empty.
    const { id } = req.params;
    const product = await Product.findById(id); // This is cause i would like to populate the form with already existing values for name,price and category.
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    // Now to update the product i can first do findById and then update each of the fields in it to req.body and then save it.
    // Or you can do findByIdAndUpdate
    // For findByIdAndUpdate first arg is id,second arg is the object that contains the data you want to update and third arg is object that contains the option you want to set.
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect(`/products/${updatedProduct._id}`); // You could've directly put ${id} there too cause we're not gonna be changing the _id from the edit form.
  })
);

// Setting up a delete route
app.delete(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

// Now i'd like to implement a functionality that when i'm on the show page and i click on the category of product it should take me to a page that contains all the products of that category.
// How do you want to structure your URL for this case ?
// Do you want to send a get request to /products/categories/:categoryName ?
// Doing the above thing is easy all you do is take out the categoryName from req.params and then find all the documents having that catergory.
// And then just render it on a page.
// But that's not the way it's usually done when you're looking to search something or display a subset of something usually products/categories might actually show all the categories of the products that might be present in your farm. So making products/categories in such a way that categories itself is a resource doesn't make sense here.
// So, In these search kind of things it's better to go with a query string kind of URL.
// Here we will send a get request to /products?category=fruit kindof thing.

// Here really all we just did was plugged Mongoose into a pattern we've already seen.
// Here we just did the same thing we were doing with a array but with an actual database and inorder to achieve that what new work i did is written in the line below.
// What's new however was setting up async route handlers and then awaiting the results of our model using methods like findById,findByIdAndDelete,findByIdAndUpdate and save etc. cause these operations can take time to complete.
// The methods you put in requests like app.get,app.post,app.patch etc. as second arguments are called route handlers or route handler functions cause they handle when we get a certain request at a route or a endpoint.
