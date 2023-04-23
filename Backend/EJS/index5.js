const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get('/r/:subredditName', (req, res) => {
     const {subredditName} = req.params;
     res.render("subreddit.ejs",{subredditName});
})

