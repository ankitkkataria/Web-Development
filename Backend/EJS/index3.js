// Copying from index2.js

const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs"); 
app.set("views",path.join(__dirname,'/views'));

app.get("/", (req, res) => { 
    // <h1>The Home Page <%="hello world".toUpperCase()%></h1> I made this modification to home.ejs and made it into a new file called home2.ejs.
    // <%= You can put any JS code within these tags and later when rendered it will automatically be converted to HTML by our EJS engine.%>
    res.render("home2");
});
