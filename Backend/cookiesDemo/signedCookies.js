const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Now cookie parser will not only be used for parsing cookies that are by the browser to our site but it will also be used to sign the cookies using this secret code passed in cookieParser when they are sent by our server so when it recieves them back from our browser at a later time it can make sure they are not tempered.
app.use(cookieParser("thisismysecret")); // This secret code should stay the same when you send the cookie as well as when you recieve the cookie otherwise it will not be able to parse signed cookies if it has been changed in between. Usually we store this message in a enviorment variable.

app.get("/getsignedcookie", (req, res) => {
  // Sending signed cookie to the requesting client
  res.cookie("fruit", "grape", { signed: true });
  res.send("Ok Signed Your Fruit Cookie");
});

app.get("/verifyfruit", (req, res) => {
  console.log(req.cookies); // This is so you can see your non-signed cookies.
  console.log(req.signedCookies); // This is so you can see your signed cookies that your browser sends you.
  res.send(req.signedCookies);
});

/* 

What does signing mean ?

The idea is not to encrypt or hide information.
Instead, it is to be able to verify its integrity.
Verify that something hasn't changed.
It is about making sure that the original data that we sent to the client, to the browser, is still the data being sent back to us.
So, finally  signing, digitally signing something is a way of verifying that it's not been tampered with.
It is not a way of hiding or encrypting the information.

*/

// ===========
// OLD COOKIES
// ===========

app.get("/greet", (req, res) => {
  console.log(req.cookies);
  const { name = "User" } = req.cookies;
  res.send(`Hey There! ${name}`);
});

app.get("/setName", (req, res) => {
  res.cookie("name", "Deevya");
  res.cookie("animal", "shrimp");
  res.send("Sent You a Cookie");
});

// Also one more thing i've realized is that you can temper with the key as much as you want but if you try tampering with the value then it's will either not show you the entire key value pair (If it doesn't even match the signed cookie pattern) or it will show you value as false (If the pattern but something has been changed). 