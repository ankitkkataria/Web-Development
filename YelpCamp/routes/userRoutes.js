const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require('passport');

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      // res.send(req.body)
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to Yelp Camp");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message); // This will help us in flashing the duplicated username error.
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render('/users/login');
});

router.post("/login", passport.authenticate('local',{failureFlash:true,failureRedirect:true}),(req, res) => { // 
  // If i get to this point that means that the username and the password that was entered was infact right.
  req.flash('success','Welcome Back');
  req.redirect('/campgrounds');
});

module.exports = router;

// Due to catchAsync you can think that the entire code inside the router.post("/register") is inside a try catch that will send the error to the custom made error handler but we don't want to do that in case like we try to register two people with same name cause it will take us to the error template page and we will have to come back so now we will put another try catch to save us from that so we can flash that message on the login page itself and we don't go the the error template page.
