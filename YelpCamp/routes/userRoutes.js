const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      // res.send(req.body)
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password); // Hashes password and stores the salts and hash results on registered user
      // console.log(registeredUser);
      // Logging in user automatically when he/she regiter without us doing this someone would first register and then they would have to signin.
      // console.log('Console.logging req.user before login method');
      // console.dir(req.user);
      req.login(registeredUser, (err) => {
        // This method is similar to req.logout method also this method is called internally by passport.authenticate when username and password match but you can also call it here.`
        if (err) return next(err);
        // Now once the user has successfully registered as well as signed in we can now just flash a message.
        req.flash("success", "Welcome to Yelp Camp");  // I SPENT SO SO MUCH TIME FIXING THIS THESE TWO LINES OF FLASHING AND REDIRECTING I HAD PUT THEM OUTSIDE THIS BELOW THIS BEFORE THESE TWO CONSOLE STATEMENT AFTER THIS.
        return res.redirect("/campgrounds");
      });
      // console.log('Console.logging req.user after login method');
      // console.dir(req.user);
    } catch (e) {
      req.flash("error", e.message); // This will help us in flashing the duplicated username error.
    res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  // Use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  // passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "login",
  }),
  // Now we can use res.locals.returnTo to redirect the user after login
  (req, res) => {
    // failureRedirect must contain where you want it to go if there is a error. (local here refers to the strategy we are using you could also have multiple login methods like these like in them instead of local it might be google).
    // If i get to this point that means that the username and the password that was entered was infact right.
    req.flash("success", "Welcome Back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds"; // If someone just goes to login page directly and he wasn't redirected from anywhere in that case we should take him to campgrounds otherwise to the page from where he was redirected from.
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      // If i hadn't used this if condition here it was causing issue that it would just send a random error to our custom error handler that wouldn't stop anything but print a error in the console.
      return next(err);
    }
  });
  req.flash("success", "You've been successfully logged out!");
  return res.redirect("/campgrounds");
});

module.exports = router;

// Due to catchAsync you can think that the entire code inside the router.post("/register") is inside a try catch that will send the error to the custom made error handler but we don't want to do that in case like we try to register two people with same name cause it will take us to the error template page and we will have to come back so now we will put another try catch to save us from that so we can flash that message on the login page itself and we don't go the the error template page.
