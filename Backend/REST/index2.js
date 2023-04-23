// Copying from index.js
// See till now what we have done is just set up a server and we are listening for get and post requests on a certain URL that's it.
// Now we will see how to extract the incoming data of the post requests for get requests you already know you can get the incoming data like from it's req object like req.query.
// Now to send a post request with JSON as it's payload from the client side use postman and for URL data as it's payload well that too you can do with postman or just use the getVsPost.html page to make a post request from there.
// See just like we could read the request data when it came to get request using the req object similiarly when it comes to post request we can do the same thing the data that is sent from the client side is present in req.body object.
// But there is one problem the req.body object contains data in text format now we don't know the data in the post request might be sent from a URL or it might be JSON object or any other type (like HTML,JS or anything) so here i should first parse it.

const express = require("express");
const app = express();

// These two lines below are used to parse data coming from the post request and since this entire thing is being put in app.use() that means that code will be run each and every time any request is made get,post,page refresh anything.
app.use(express.urlencoded({extended: true})); // Without this line the code on line 22 will say undefined whenever you send a post request to localhost:3000/tacos from a form like from our getVsPost.html page cause this line says if get data from a form parse it.
app.use(express.json()); // This line says if you get JSON data from the post request parse that as well.
// To test the above line just send a post request on localhost:3000/tacos and in the request body just send this JSON object down below.
// {
//   "tacosFlavor" : "yellow",
//   "qty" : 323
// }
// And everything will still work fine even though now i'm getting data from a JSON object rather then URL that's all bcz of line 13.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/tacos", (req, res) => {
  res.send("Getting a get request on tacos");
});

app.post("/tacos", (req, res) => {
  console.log(req.body);
  const {tacosFlavor,qty} = req.body;
  res.send(`Ok, Here are your ${qty} ${tacosFlavor} tacos`)
  res.send("Getting a post request on tacos");
});

