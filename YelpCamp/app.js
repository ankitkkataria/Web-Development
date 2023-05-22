const express = require("express");
const app = express();
const path = require("path");
const Campground = require('./models/campground');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
// Connecting to the mongoose database server.
mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

// Middleware  
app.use(express.urlencoded({extended: true})); // All these inside the app.use() are functions that are executed on each and every reqeust we get to our webpage.
app.use(methodOverride('_method'));

// Starting server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

// Setting up EJS
app.engine('ejs',ejsMate); // This is so instead of using the default ejs engine it starts using the new ejsMate engine that allows us to easily make boilerplate code and saves us from repeating the code even better than what ejs partials did for us.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setting up routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find();
  res.render('campgrounds/index',{campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
  const camp = new Campground(req.body.campground);
  await camp.save();
  res.redirect(`/campgrounds/${camp._id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show',{campground});
});

app.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit',{campground});
});

app.put('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  const updatedCampground = await Campground.findByIdAndUpdate(id,req.body.campground,{new: true,runvalidators: true}); // You could also have used {...req.body.campground} as second arg.
  res.redirect(`/campgrounds/${updatedCampground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});