const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs"); // This is to set the templating engine to ejs we use app object that has a method called set.
                               // One more thing by default when you set the templating engine to ejs you should install ejs using npm install ejs either prior to the above line or immediately after otherwise you won't have the files for ejs in node_modules.
                               // And once it's installed ejs says by default it'll look for all the templates in a folder called views we can change this directory but here we're not going to so before making any template html files (ejs) just make sure to put them in views folder.

app.get("/", (req, res) => { // This method says whenever we get a call on the homepage just go ahead and call the function that renders the html file views/home.ejs but since the default location when we set our template engine to ejs got set to views behind the scene we don't need to specify views we don't even need to specify .ejs as express already knows that's my default templating engine.
       res.render("home.ejs"); // ejs files are nothing but HTML files that allow JS to be a part of it when they are rendered all the JS that's present in that HTML file is converted to HTML that's it and that page is then shown.
       // res.render("./views/home.ejs") // Is allowed and will do the same thing as the above line (THIS DOESN'T WORK FOR SOME REASON IDK WHY).
       // res.render("home") // Skipping ejs extension our code will still work like it did when line 13 in uncommented. (THIS WORKS THO).
});

