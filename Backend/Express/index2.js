const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use((req,res) => { // Whenever a request is made app.use gets passed in these two objects actually the req you get is a HTTP request which is nothing but a plain text but it's express that parses it and makes it into a JS object also response is a object that provides us many methods that help us in responding to these requests we will see one of those methods here.
    // console.log(req); // You can just refresh the page at localhost:3000 and see what the request object looks like it contains 100s of properties like url which show what url was this request made upon and methods are also present in it.
    // console.log(res); // You can also look at what the response object looks like.
    console.log("We got a new request!!!"); // This will be sent to the console.
    // res.send("Hello,We got a new request"); // This will be sent to the browser and this is the method i was talking about.
    res.send("<h1>Yo boi you getting a response right now !</h1>") // See as a response to a request made on my server i sent a h1 heading as a response this is the most basic way of how sites operate when you request for something this is how something is sent on the webpage and any string you pass in this function will be converted to html and will be displayed on the page.
    // But right now if you see we're responding to every single request no matter what it is even if it's on the page localhose:3000/djfladf we will still get the same response so what we will learn next is how to send different responses for different requests that's called routing.
});
