// The code till line 23 is the same code of index3.js just the comments have been removed.
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/cats", (req, res) => {
  res.send("Meow Meow My Man");
});

app.get("/dogs", (req, res) => {
  res.send("Woof Woof What's Up");
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.post("/", (req, res) => {
  res.send("You're sending a post request my boi");
});

// But let's say you have to say Browsing the chickens subreddit when the user types in reddit.com/r/chickens
// and you have to say Browsing the cars subreddit when user types in reddit.com/r/cars.

// Now one way of doing that is :-

app.get("/r/cars", (req, res) => {
  res.send("Browsing the cars subreddit");
});

app.get("/r/chickens", (req, res) => {
  res.send("Browsing the chickens subreddit");
});

// But there are 138,000 subbreddits there are you gonna make 138,000 get requests and shit can get even more insane where each of these 138,000 subreddits might have further deep URLs.
// Like /r/chickens/top or /r/chicken/hot depending on which you might have to sort the pages now are you going to make seperate get requests for those as well.

// That's where express path parameters help us path parameters are basically varaibles in the URL that can store values entered by users and this allows us to set a slightly generalized get requests saying if the get request are /r/anythingHere then accept that get request and do something with whatever was passed in place of anythingHere.
// So, basically the path doesn't need to be exact path it can have variables in it which act as placeholder or catch whatever user has entered in the URL.

// Example :-
// This 3 line code below takes care of everything and you won't have to make 138,000 different get requests.
app.get("/r/:subbredditNameVariable", (req, res) => {
  // console.log(req); // If you look at the request object you'll see that it has a object called params which stores the value user has typed in place of subbredditNameVariable and it will store it as a property like subbredditNameVariable : "Chickens",
  const subbredditNameVariable = req.params.subbredditNameVariable; // Accessing that property and storing it's value'
  // Or if multiple properties you have to access you can always destructure.
  // const {subbredditNameVariable} = req.params;
  res.send(`<h1>Browsing the ${subbredditNameVariable} subreddit</h1>`);
});

// Due to above code you can even open the link localhost:3000/r/subredditNameVarible itself cause that too will be stored in the variable or path parameter whatever you want to call it.
// The above example is quite silly but let's say you had photo of everything now whenever user came to a site r/bananas you'd pick the term banana from there search your database for banana pics and show your website.
// That's what google does it doesn't know what you're going to ask it's not waiting for every possible get request it might get it checks the params object and then sees if it can find something matching.

// You can have multiple params as well the function below will help us open links like http://localhost:3000/r/randomsubreddit/mostliked or http://localhost:3000/randomsubreddit/mostpopular

app.get("/r/:subbredditNameVariable/:sortByVariable", (req, res) => {
  // console.log(req.params);
  const { subbredditNameVariable, sortByVariable } = req.params; // Destructuring the params object.
  res.send(`<h1>Browsing the ${subbredditNameVariable} subreddit sorted by most ${sortByVariable} posts first.</h1>`);
});

// Always keep the general get request at the end.
app.get("*", (req, res) => {
  res.send("I don't know this path/route please try some other path/route");
});

