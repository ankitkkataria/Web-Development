// Requiring Express Router
const express = require("express");
const router = express.Router({ mergeParams: true });

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");

// Requiring Models
const Campground = require("../models/campground");

// Requiring isLoggedIn and validateCampground Middleware
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// When using catchAsync it's optional to pass in next argument in these route handlers the reasoning being https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291546#questions/17815506 but one more thing since you're not passing in next in the async function you can only throw new ExpressError here and let the next in the wrapping catchAsync function but you can't do next(new ExpressError()) cause you can't reference next here as you've not included it in the args.
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  // Putting isLoggedIn here only protect the form route someone can still send this information with the correct fields if they want and if we have left the post route for campgrounds left unprotected they can make as many campgrounds as they want so we will add this isLoggedIn middlware over there too similar logic for edit and put route too.
  // INSTEAD OF PUTTING THIS CODE IN EVERY SINGLE PATH WE WANT TO PROTECT WE JUST PUT THE CODE INSIDE A MIDDLEWARE.JS FILE.
  // if (!req.isAuthenticated()) {
  //   req.flash("error", "You must be signed in first!");
  //   return res.redirect("/login");
  // }
  res.render("campgrounds/new");
});

router.post(
  "/",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
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
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
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
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor, // There is a issue here that is if you bookmark the edit page and then somehow that campground is infact deleted then our isAuthor does campground.author that will break.
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    // This functionality down below is now taken care of by isAuthor middleware.
    // if (!campground) {
    // Incase someone bookmarked a campground and then that campground is deleted when that bookmark is then accessed at some point of time a weird looking error is generated there we can rather show a flash message.
    //   req.flash("error", "Campground no longer exists!");
    //   res.redirect("/campgrounds");
    // }
    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
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
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted campground successfully!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
