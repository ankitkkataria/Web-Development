const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // This is to parse the cookies that are send on subsequent requests by your browser.

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

app.get("/greet", (req, res) => {
  console.log(req.cookies);
  const {name = "User"} = req.cookies;
  res.send(`Hey There! ${name}`);
});

app.get("/setName", (req, res) => {
  res.cookie("name", "Deevya"); // What this line does is when this route is accessed our server sends the browser a cookie that contains this key value pair having this name and value now any url/request that's accessed after it starting with localhost:3000 after this the browser as it has stored this cookie locally it will send this back to us.
  res.cookie("animal", "shrimp");
  res.send("Sent You a Cookie");
});

// Once cookies have been stored on your browser your browser will send those cookies on every subsequent request that you make to localhost:3000 or to the root site/url.
// To get that information out of each request you need to use a npm package called cookie-parser.
