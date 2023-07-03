// You can't store a lot of information using cookies that's why we need sessions so we can store some data on the server side.
// If you want to read more about web sessions https://redisson.org/glossary/web-session.html
const express = require("express");
const session = require("express-session");
const app = express();
// First thing is you don't need to include cookie parser to parse cookies sent by express-session
// Also by default the session data is stored in local memory on the server. So, If you restart the server all the session data is also wiped out you can change this behaviour by changing the storage store.

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};

// Session middleware down below also somthing to remember is session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
app.use(session(sessionOptions)); // secret is used for signing the one cookie that contains the session id.

// Here I'm implementing a counter that counts the number of times you have visited a page using a session and stores the data onto server side also remember this server side doesn't mean mongoDB but it can be a small and light weight database like redus etc.
app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    // If there is no such variable stored in your session object that means that's the first time you're visiting this site.
    req.session.count = 1;
  }
  res.send(`You have visited this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcome back, ${username}`);
});

// If you want to learn more about express sessions
// https://www.youtube.com/watch?v=hKYjSgyCd60&ab_channel=codebubb
