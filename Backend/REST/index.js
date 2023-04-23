// This is just to demonstrate you can use postman app and send get and post request to localhost:3000/tacos and you'll see two different web pages.
// Similarly i'll try sending those form requests in the getVsPost.html file and direct them to localhost:3000/tacos
// See the point of this code is to show that our server treats get and post requests differently that's it and we can listen to them from the server side for a specific route like here we are doing for tacos route.
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/tacos", (req, res) => {
  res.send("Getting a get request on tacos");
});

app.post("/tacos", (req, res) => {
  res.send("Getting a post request on tacos");
});

// Just run this server and open the getVsPost.html file and submiting first the post request and then the get request you'll see our server can recognize both of them and respond accordingly.
