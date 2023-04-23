const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// See when you search on google your data goes through query strings to the server now client side i handled getting that data through input.value but at server we don't have that there we only have a get request that's it which says google.com/q=logitech even any input in a form is sent through this search queries so we should be able to extract it out from the request.
// So how should the server get out the information from the request ?

// Well we will use the req object that we get from the app.get method when a get request to it's corresponding path has been sent like app.get("/search",(req,res) => {}) a URL is typed in the browser having localhost:3000/search/?q=logitech that means a get request to /search and whenever i have gotten a get request to /search path express makes sure that the function inside this code should be ran and also passes in information about request including search query information and also gives us a way of responding through response object.
// req.query is the object that contains information about all the search queries that have been added to this get request.

app.get("/search", (req, res) => { // When extracting the search queries we don't have to make any changes to the URL itself like we had to when we were extracting path parameters rather here the URL just stays the same the search query partameters will be automatically stored in the req.query object by express.
  // console.log(req.query); // If you want to see the req.query object you can uncomment this.
  const { q } = req.query; // If multiple things are sent in the search query even then you can get them out this same destructuring the object.
  if (!q) {
    res.send("Nothing searched in the search query");
  } else {
    res.send(`<h1>Search results for: ${q}</h1>`);
  }
});

// Always keep the general get request at the end.
app.get("*", (req, res) => {
  res.send("I don't know this path/route please try some other path/route");
});

// To test the above thing just start the server and use localhost:3000/search?q=anything
