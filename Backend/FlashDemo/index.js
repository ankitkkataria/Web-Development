// First copied everything from MongoRelationshipsAndExpress.
// Implementing flash messages here.
// Is it necessary to use session if you want to use connect-flash?
// Yes, if you want to use connect-flash middleware in Express.js, you need to use session middleware as well. connect-flash relies on session storage to store and retrieve flash messages. Flash messages are typically used to display temporary messages to the user after a specific action, such as displaying a success message after a form submission or showing an error message when a login attempt fails. Flash messages are stored in the session. So, we need to have the session stuff before our flash middleware.
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product"); // This will include the Product model here in this file that will allow me to manipulate the farmStand database's products collection.
const methodOverride = require("method-override");
const Farm = require("./models/farm");
const session = require("express-session");
const flash = require("connect-flash");
// Starting up the server
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Setting up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Putting in all the middleware together
// Session Middleware
const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

// Flash Middleware
app.use(flash());

// app.use((req,res,next) => {
//   res.locals.messages = req.flash('success');
// })

// For decoding the post requests that you will get when you get data from the form you served when setting up the products/new route.
app.use(express.urlencoded({ extended: true }));
// For making post request act like put request when we send data from our edit form.
app.use(methodOverride("_method"));

// Connecting to the mongoose database server.
mongoose
  .connect("mongodb://127.0.0.1:27017/flashDemo")
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

//  ======================i
//  SETTING UP FARM ROUTES
//  ======================

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post("/farms", async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  req.flash("success", "Successfully Added a New Farm");
  res.redirect("/farms");
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  // When rendering a form you should pass in the flash message you might get from a newly added farm route and if a success key exists in the req.flash body then it's value will be passed in and sent to the farms/index ejs file.
  res.render("farms/index", { farms, messages: req.flash("success") });
});

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/show", { farm });
});

app.delete("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findByIdAndDelete(id); // Also one thing to note if you change this method here to something else that doesn't convert to findOneAndDelete in that case that particular middleware you've defined won't work so be careful about that.
  // Instead of delelting all the products associated with it here you can use mongoose middleware as it makes it easier if you have multiple things associated with your farm like employees,schedules,reviews etc. instead of doing them here we can use mongoose middleware that we will define in the farm.js file on farmSchema.
  res.redirect("/farms");
});

//  =========================
//  SETTING UP PRODUCT ROUTES
//  =========================

// Setting up a index route (Following the RESTful routes convention)
app.get("/products", async (req, res) => {
  // Making this a async function cause i'm making a request to the database.
  const { category } = req.query;
  if (category) {
    // If category is passed in the URL as a search query if not just display all the products normally.
    const products = await Product.find({ category: category }); // Or you could even do Product.find({category});
    res.render("products/index", { products, category }); // Display the products that belong to that category all index page does is just whatever array of products you pass in it displays them also we pass in the category cause we'd like to say which category products i'm showing.
  } else {
    const products = await Product.find({}); // You can also do Product.find({}) or db.products.find() or db.products.find({})
    // console.log(products);
    res.render("products/index", { products, category: "All" }); // We're putting all the templates inside another folder called products inside views cause we might have multiple collections like products,users,orders etc. and in each folder we can have it's own index template and show template etc and also we just passed in category as All cause on the index page i won't have to use if else condition i can just use category and it will just display All or the catergory name itself.
  }
});

// Setting up insert route
// When i put this route after the app.get('/produts/:id') it didn't work so the order you set up these routes actually matters a lot.
// Actually '/produts/new' follows the same pattern as '/produts/:id'.  If your '/produts/:id' route comes first then you are passing 'new' as the id parameter which cannot be cast to an ObjectId that the 'findById' method requires.
// The '/products/new' route must come before the '/produts/:id' route.
// In this particular case, the /new route must come before the /:id because the routes are checked from top to bottom, and since the :id placeholder matches any string, new is considered an id when the order is swapped and the wrong route is triggered. There won't be other similar cases in this project, but it's always a good idea to check your routes when using a placeholder to make sure that another fixed route doesn't have the exact same pattern, and if it does, it should come first.
app.get("/products/new", (req, res) => {
  // This should just serve me a form
  res.render("products/new.ejs", { categories });
});

// Setting up a post route for /products we will get request to this route when the new product form is submitted.
app.post("/products", async (req, res) => {
  // Since i've already parsed the URL data above we will be able to directly access it here in req.body no problem.
  // console.log(req.body); // { name: 'Blueberry', price: '1', category: 'fruit' } this is what the req.body looks like we can directly save this data in my database you can store some of the information you get from a form by destructring the object probably but here i'll store everything directly.
  const newProduct = new Product(req.body);
  await newProduct.save(); // This is a async operation so we shall wait here till it finishes before executing the next line of code.
  res.redirect(`/products/${newProduct._id}`); // Redirecting (cause form resubmission problem might occur) to the show page for this new product by sending the correct kind of get request also we did not ask for _id in the form it was provided to us when we saved it in the mongoose database.
});

// Setting up the show route
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // Search the database for the document with that id.
  const product = await Product.findById(id).populate("farm", "name"); // Only populate the name field in the farm object also id is already populated inside the farm object that's not something you have to specify explicitly as even if you don't populate you'll still be able to see the id.
  res.render("products/show", { product });
});

// Setting up an edit form generation route
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); // This is cause i would like to populate the form with already existing values for name,price and category.
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  // Now to update the product i can first do findById and then update each of the fields in it to req.body and then save it.
  // Or you can do findByIdAndUpdate
  // For findByIdAndUpdate first arg is id,second arg is the object that contains the data you want to update and third arg is object that contains the option you want to set.
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/products/${updatedProduct._id}`); // You could've directly put ${id} there too cause we're not gonna be changing the _id from the edit form.
});

// Setting up a delete route
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { farm, categories });
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const foundFarm = await Farm.findById(id);
  const newProduct = new Product(req.body); // Storing name,price and category in the product using this line you can destructure these three things out and insert them or do it this way on the next line we will go ahead and make sure the farm property is also filled up.
  newProduct.farm = foundFarm;
  foundFarmkkk.products.push(newProduct);
  await newProduct.save();
  await foundFarm.save();
  res.redirect(`/farms/${id}`);
});

// Now i'd like to implement a functionality that when i'm on the show page and i click on the category of product it should take me to a page that contains all the products of that category.
// How do you want to structure your URL for this case ?
// Do you want to send a get request to /products/categories/:categoryName ?
// Doing the above thing is easy all you do is take out the categoryName from req.params and then find all the documents having that catergory.
// And then just render it on a page.
// But that's not the way it's usually done when you're looking to search something or display a subset of something usually products/categories might actaully show all the categories of the products that might be present in your farm. So making products/categories in such a way that categories itself is a resource doesn't make sense here.
// So, In these search kind of things it's better to go with a query string kind of URL.
// Here we will send a get request to /products?category=fruit kindof thing.

// Here really all we just did was plugged Mongoose into a pattern we've already seen.
// Here we just did the same thing we were doing with a array but with an actual database and inorder to achieve that what new work i did is written in the line below.
// What's new however was setting up async route handlers and then awaiting the results of our model using methods like findById,findByIdAndDelete,findByIdAndUpdate and save etc. cause these operations can take time to complete.
// The methods you put in requests like app.get,app.post,app.patch etc. as second arguments are called route handlers or route handler functions cause they handle when we get a certain request at a route or a endpoint.