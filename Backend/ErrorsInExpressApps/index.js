// Copying the entire middleware folder here.

const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require('./AppError');
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

app.use(morgan("tiny"));

// Defining our own middleware
app.use((req, res, next) => {
  req.requestTime = Date.now(); 
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I love dogs");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }

  // Instead of throwing errors the way given below we can define our own error class and send both status code and error message in the same line.
  // res.status(401); // Unauthorized Access
  // throw new Error('Password Required');
  throw new AppError('Password Required',401);
  // By default the default error handler in express looks for err.status property to see if there is an error status code that's associated with a error even though the normal error in express doesn't have the status property to begin with and we can only send status codes through res.status(401) so in our AppError when i defined a status and set it and then when it reached the default error handler when thrown it was displayed in the console.
  // err.headers is also something you can set as a property and the default error handler will respond with those headers as it looks for a headers property in any error to display.
  // All the things in the above two lines only happen when you let it get to the default error handler either by not defining your own custom error handler or through using next(err) in the custom error handlers.
  res.send("Sorry but you need a password to access this path");
};


app.get('/error', (req, res) => {
  chicken.run(); // This path is made here so we could see the default way express deals with errors.
});

app.get('/admin', (req, res) => { // When we get this request we will immediately throw an error and our custom error handler will be triggered and then the message and status code will be shown.
  throw new AppError("You're not an Admin!",403);
});

app.get("/", (req, res) => {
  console.log(`This is the request time ${req.requestTime}`); 
  res.send("Home Page");
});

app.get("/dogs", (req, res) => {
  res.send("Woof Woof");
});

app.get("/secret", verifyPassword, (req, res) => { 
  res.send("I hate most people");
});

// Defining a custom error handler.
// app.use((err,req,res,next) => { // When you have four arguments in a function it is considered as error handling middleware.
    // Whenever a error is this function will be first ran. 
//   console.log("*******************************");
//   console.log("************error**************");
//   console.log("*******************************");
//   console.log(err);
//   next(err); // When you do this the next error handling middleware is called and in this case since we don't have a next error handling middleware the default express error handler will be activated without this line the default error handler won't be called also you must pass in a argument only then next is considered or is treated as if we are calling the next error handler otherwise just next() is treated as if we are calling the next normal middleware.
// }) 

// Our own custom error handler that takes any error and if it AppError it will use those message,status codes and display them otherwise if it's not a AppError but a normal error it will assign some default values to status and message and respond with those.
app.use((err,req,res,next) => { // When you have four arguments in a function it is considered as error handling middleware. (You must keep your custom error handler at the end after all the app.use() middlewares)
    // Whenever a error is this function will be first ran.
    const {status = 500, message = 'Something went wrong'} = err; // The error that occurs when line 42 is hit doesn't have status as a property cause that's not the AppError we have defined that a normal reference error so in that case it will say status code undefined in order to deal with that we can have a default value for the status code while destructruing it itself.
    res.status(status).send(message); // Normally message is present in a normal error to begin with not the status code so even if you get a normal error and you don't see Something went wrong message don't worry that's cause by default if you look at the Error object in chrome's console and type console.dir(Error) you'll see that it has a message property not a status property however.
}) 


app.use((req, res) => {
  res.status(404).send("404 Not Found"); // Setting the status code of the response to 404 and then sending 404 Not Found to that webpage.
});

// 401 is thrown when you don't know who the person is in other words Unauthorized access.
// 403 is thrown when we do know who the person is they just don't have the permission to do whatever they are trying to do. 
