// Middleware is nothing but function/s that are called between a req and res.
// url parser, json parser, app.get, method-overide are all middlewares they take in functions that are executed when a request comes.
const express = require("express");
const app = express();
const morgan = require("morgan");

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// One thing to note even if you use app.use() that doesn't mean it will run on every request if you just put it in the end of the code and don't call next from above middlewares or just do res.send() from any of the get requests above it that automatically stops everything below it for a certain request.
// So, It is extremely important to be aware of the order in which you put this middleware code if you want any middleware to run 100% of the time for all the requests put them above all the routes and stuff and make sure that middleware can be reached by using proper next() function calls.

// Using morgan middleware
app.use(morgan("tiny"));

// Defining our own middleware
app.use((req, res, next) => {
  req.requestTime = Date.now(); // Adding a new property to every request that comes in called requestTime that will store the request time.
  next();
});

app.use("/dogs", (req, res, next) => {
  // This will only run when any request kind of request is sent to /dogs only not only all the other paths till now we had been using it without specifying the path.`
  console.log("I love dogs");
  next();
});

// This is a middleware function that verifies whether the password you entered is correct or not.
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  res.send("Sorry but you need a password to access this path");
};

// app.use((req, res, next) => {// Any request i get this function will be called immediately after getting it so we usually put middleware in app.use() that executes no matter what kind of request i get.
//   console.log("This is my first middleware!!!");
//   return next(); // Otherwise no other middleware will be called (including route handler functions that are present in app.get routes etc. cause they are also middlewares)
//   console.log("This is my first middleware!!! - After calling next()");
// });

// app.use((req, res, next) => {
//   console.log("This is my second middleware!!!");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("This is my third middleware!!!");
//   return next();
// });

app.get("/", (req, res) => {
  console.log(`This is the request time ${req.requestTime}`); // Using a function that i added using middleware function to every request.
  res.send("Home Page");
});

app.get("/dogs", (req, res) => {
  res.send("Woof Woof");
});

// This way you can run certain middlewares only when you get a specific request on a certain path if you wanted to run on every verb well in that case just put the path in app.use() itself as it's first arg.
app.get("/secret", verifyPassword, (req, res) => { // The next in verifyPassword function will call the normal route handler function here that contains the res.send() here. 
  res.send("I hate most people");
});

// Usually kept at the end of all routes meaning the request for the path that you've got didn't res.redirect,res.render or res.send you to anything.
app.use((req, res) => {
  res.status(404).send("404 Not Found"); // Setting the status code of the response to 404 and then sending 404 Not Found to that webpage.
});
