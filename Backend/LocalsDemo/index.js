// The res.locals property is an object that contains response local variables scoped to the request and because of this, it is only available to the view(s) rendered during that request/response cycle (if any).
// Basically res.locals it's a object that is sent to the ejs file before it is rendered.
// If you want to refresh whatever is writtin here https://www.youtube.com/watch?v=IuqhkjkcXbo&t=310s&ab_channel=DevSprout

const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

// Setting up the ejs engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.myNameIs = "Ankit"; // This is another way of adding something to locals before any response is generated for a request we just go ahead and add a property to the res.locals object.
  next();
});

app.get("/", (req, res) => {
  res.render("index", { greeting: "Hi, How are you ?" }); // What happens before you call this render method on the index template is res/locals.greeting = "Hi, How are you ?". So, We can access it in the index template.
});
