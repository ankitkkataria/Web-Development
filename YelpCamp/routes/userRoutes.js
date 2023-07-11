// Requiring Express Router
const express = require("express");
const router = express.Router();

// Requiring Utilities
const catchAsync = require("../utils/catchAsync");

// Requiring Passport
const passport = require("passport");

// Requiring storeReturnTo Middleware
const { storeReturnTo } = require("../middleware");

// Requiring Users Controller
const users = require("../controllers/usersController");

// Render Register-User Form
router.get("/register", users.renderRegisterUserForm);

// Register User Route
router.post("/register", catchAsync(users.registerUser));

// Render Login-User Form
router.get("/login", users.renderLoginUserForm);

// Redirection Route
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
  users.redirectToAPage // This just takes you either to campground if you weren't redirected to login page otherwise after login it takes you to the page you were redirected from.
);

// Logout User Route
router.get("/logout", users.logout);

module.exports = router;


