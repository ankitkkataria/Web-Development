// MAKE SURE AFTER YOU MAKE ANY CHANGES TO THE CODE STOP THE SERVER BY CTRL+C IN THE TERMINAL AND THEN RESTART THE SERVER AGAIN USING node index3.js THIS WORKS CAUSE WE ARE STARTING A SERVER AND LISTENING FOR REQUESTS ON LINE 5 AFTER RESTARTING THE SERVER ONLY THEN THE CHANGES YOU MADE WILL BE REFLECTED IN YOUR REQUESTS.
// Here we will learn how to respond differently to different incoming requests till now we have been responding to everything the same way.
// This concept is called routing.
// Routing is taking incoming incoming requests like a path that is requested like localhost:3000/dogs and matching that to some code/response.

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// I'm commenting this code below cause it will just send a response whenever any request is made we will stop right there if you wanna make a specific response on /dogs you won't get it cause you can't set two responses for the same path cause then the browser won't know what to show and what to not show.
// app.use((req,res) => {
//     console.log("We got a new request!!!")
//     // res.send("Hello,We got a new request");
//     res.send("<h1>Yo boi you getting a response right now !</h1>")
// });

// To respond only when a specific path on the site is requested we use app.get method.

// This down below is called a route.
app.get("/cats", (req, res) => {
  // get has the same structure as app.use but here the method inside will only be called when the /cats path is the only one that's called.
  res.send("Meow Meow My Man");
}); // app.get is a function that allows us to deal with get requests made on a specific path and allows us to respond from the server side.

// This down below is another route.
app.get("/dogs", (req, res) => {
  res.send("Woof Woof What's Up");
});

// This down below is a route to the homepage (/ donoted the root page)
app.get("/", (req, res) => {
  res.send("This is the home page");
});

// But now if you type any url except the three above you'll see a error that says Cannot Get Page or something.
// To deal with that you need to use * as a path you must put this at the end if you put it first any get request you make will match with it will match with this and it will be the only response you get no matter what page you're trying to access.
// When you try to access a url your browser/postman sends a HTTP get request for that url and we are just responding to those get requests using express module's app.get method from the server side with a slightly different webpage each time.
// This down below is for all the other paths.
app.get("*", (req, res) => {
  res.send("I don't know this path/route please try some other path/route");
});

// Our browser isn't currently sending post requests but you can send a post request to this path from postman and you'll see this.
app.post("/", (req, res) => {
  res.send("You're sending a post request my boi"); // See even though there is a get request above this statement that will match with all get requests to any path but get and post are completely different requests so only this will be executed.
});

