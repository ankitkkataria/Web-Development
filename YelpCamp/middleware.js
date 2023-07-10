module.exports.isLoggedIn = (req, res, next) => {
  // console.log("REQ.USER...", req.user); // Bcz of passport every request just like isAuthenticated has another method that is set to undefined if the user is not logged in otherwise if he is loggedin in that case it will contain information about the user that has logged in. (Behind the scenes it must work like we did when we were implementing the user authentication from scratch like after login our session object might have a user_id property using which you can fetch the user object.) also req.user doesn't show hash or salt only the username and email in our case also we can use it to selectively display logout if a user is logged in and hide the login,register button and vice-versa.
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // req.path would return /new (what the router uses after the prefix removal) and req.originalUrl returns campgrounds/new so, here if we were not logged in when this isLoggedIn middleware was called in that case it would store the req.originalUrl on that req so we can take that out after our login and go back to the page from where we were redrirected to login.
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req,res,next) => {
  if(req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next(); // Always always remember next(); 
}