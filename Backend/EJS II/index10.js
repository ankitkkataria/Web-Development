// Copying index8.js file here without comments.
// Here we will learn about serving static assets (static assets mean they don't change based on the request unlike our ejs files they are called dynamic assets) so basically till now we have seen that for a request we recieve on the server we are just sending HTML pages now as you know when you go to a website it's not like you only see HTML pages you also get CSS,JS and or sometimes audios or videoes even so how do you send them.
// Well for that we use app.use() which says as soon as you get any request on this page do whatever is inside the app.use() do that inside app.use() we use express.static(Directory Name) whatever is present in that directory is automatically included on your site.

const express = require("express");
const path = require("path");
const subredditDataJSON = require("./data.json");
const app = express();

// Additions in this code from index8.js start here
// app.use(express.static("assetsFolder")); // It's saying take everything in the assets folder and serve it when any request to this server is made.
// But if you use the above way it will give the same kind of error if you try to run from a different directory as you got in line 18 without __dirname
// So a better way of writing it would be
app.use(express.static(path.join(__dirname, "/assetsFolder"))); // People usually name this assets folder as public and then make seperate folders inside it for HTML,CSS and JS files.
app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/r/:subredditName", (req, res) => {
  const { subredditName } = req.params;
  const currSubbredditObj = subredditDataJSON[subredditName];
  if (currSubbredditObj) {
    // console.log(currSubbredditObj);
    res.render("subreddit4", { ...currSubbredditObj }); // I linked the css sheet in the subreddit3.ejs file not in the subreddit2.ejs file i just made a new one.
  } else {
    res.render("notfound", { subredditName });
  }
});

// We use static folders just to keep all the static assets in it so atleast we don't have to worry about managing them they are all present in the same location and we can access them.
