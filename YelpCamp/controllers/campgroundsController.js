// So the term controller comes from MVC, which is a pattern MVC model view controller frameworks, or it's just an approach to structuring applications.
// You know, we've been using models, the term models, we have a model directory, we've been using views, right?. So we can set up controllers as well.
// In general, the concept is that you put all of your data heavy stuff here, your modeling of the data in the models,
// You put all of your view content, the layouts, everything a user sees in views and then
// Controllers is where you really structure everything. It's kind of the heart of your application. It's where all the main logic happens that where you're rendering views and you're working with models.

const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  // Putting isLoggedIn here only protect the form route someone can still send this information with the correct fields if they want and if we have left the post route for campgrounds left unprotected they can make as many campgrounds as they want so we will add this isLoggedIn middlware over there too similar logic for edit and put route too.
  // INSTEAD OF PUTTING THIS CODE IN EVERY SINGLE PATH WE WANT TO PROTECT WE JUST PUT THE CODE INSIDE A MIDDLEWARE.JS FILE.
  // if (!req.isAuthenticated()) {
  //   req.flash("error", "You must be signed in first!");
  //   return res.redirect("/login");
  // }
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res) => {
  // You're using client side validation using bootstrap which means it won't allow you to submit the form with fields missing from the form.
  // But it's still possible to do it using postman/axios or something.
  // So, One way is to use required in mongoose schema itself.
  // Otherway could be like
  // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400); // This will only save us from cases where campground key is not present in the post request we're not making sure if campground itself is a object to begin with so it's still possible to fool this method but just naming something campground but this is just to show the concept of things that can be done.
  const camp = new Campground(req.body.campground);
  // Since to get to this point we have to be logged in that means due to passport middleware we have access to req.user and with that we can store the author id of the currently logged in user who is making this campground in this campground before saving it. (So, when going to it's show page I can have it's id here using which I can show the username on the show page)
  camp.author = req.user._id;
  await camp.save();
  req.flash("success", "Successfully created a new campground!");
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      // What this does is it populates the reviews on this campground and within each review it goes ahead and populates the author too that gives us access to the username so we can show it on each review.
      path: "reviews",
      populate: {
        path: "author", // Instead of populating the entire user here you could have also went down the path of just storing the username here itself too if that's the only thing we will use here but that's a choice only you can make.
      },
    })
    .populate("author"); // We want to populate the author too if we want to show the username too. (One more random thing you can't do .populate('reviews','author')) you have to chain them separetely like we did here.
  // console.log(campground); // I added this just to check if everything like author was populated properly.
  if (!campground) {
    // Incase someone bookmarked a campground and then that campground is deleted when that bookmark is then accessed at some point of time a weird looking error is generated there we can rather show a flash message.
    req.flash("error", "Campground no longer exists!");
    res.redirect("/campgrounds");
  }
  const foundReview = 0;
  res.render("campgrounds/show", { campground, foundReview });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  // This functionality down below is now taken care of by isAuthor middleware.
  // if (!campground) {
  // Incase someone bookmarked a campground and then that campground is deleted when that bookmark is then accessed at some point of time a weird looking error is generated there we can rather show a flash message.
  //   req.flash("error", "Campground no longer exists!");
  //   res.redirect("/campgrounds");
  // }
  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  // THIS CODE BELOW CHECKS IF THE PERSON THAT'S TRYING TO SEND THIS REQUEST IS ALSO THE SAME PERSON WHO IS THE AUTHOR OF THIS CAMPGROUND (NOW YOU CAN EITHER REPEAT THIS CODE IN DELETE AND /EDIT PATH OR JUST MAKE A FUNCTION OUT OF IT (THAT'S WHAT WE WILL DO.))
  // const campground = await Campground.findById(id);
  // if(!campground.author.equals(req.user._id)) {
  //   req.flash('error','You do not have permission to do that!');
  //   return res.redirect(`/campgrounds/${id}`);
  // }
  const updatedCampground = await Campground.findByIdAndUpdate(
    id,
    req.body.campground,
    { new: true, runvalidators: true }
  ); // You could also have used {...req.body.campground} as second arg.

  req.flash("success", "Updated campground  successfully!");
  res.redirect(`/campgrounds/${updatedCampground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Deleted campground successfully!");
  res.redirect("/campgrounds");
};
