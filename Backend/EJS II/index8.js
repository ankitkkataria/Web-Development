const express = require("express");
const path = require("path");
const subredditDataJSON = require("./data.json");
// Printing the entire object for you to see that's in data.json file.
// console.log(subredditDataJSON);
const app = express();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/r/:subredditName", (req, res) => {
  const { subredditName } = req.params;
  // Now i can send the entire data.json object to the ejs file but for the get request for chickens i only need that chicken data there so i'll just take that object out and send it.
  const currSubbredditObj = subredditDataJSON[subredditName]; // I can't use subredditDataJSON.subredditName here cause subredditName is a string.
  if (currSubbredditObj) {
    // If you want to see what the object looks like
    console.log(currSubbredditObj); // This will print as you get a request for a subreddit and that subreddit info is present in the data.json file.
    //  res.render("subreddit.ejs",{subredditName}); // I'll can use this but i'll do it a different way since i'm sending the entire object i'll just take out the name property it's actually nothing but subreddit name.
    res.render("subreddit2", { ...currSubbredditObj }); // I'm passing the all the key value pairs directly using the spread operator why this works the explanation is written below.
  } else {
    res.render("notfound", { subredditName });
}
});

// The reason why the spread operator works in the line 23 is cause when you want to send something to the ejs file you just do this kind of thing {name : subredditName,age : personAge,personName : personName(in this third property i can just write personName alone)};
// Now after the above line we will be able to use name,personAge and personName all in the ejs file connected to it.

// This down below shows you how the spread operator actually works when it's coming to the objects it passes in entire key value pairs.
// Suppose you have the below code

// let data = {
//   name: "Anonymous",
//   age: 21
// }
// So, if we have the below code

// res.render("subreddit", {...data});
// So, it is basically like

// res.render("subreddit", {
//   name: "Anonymous",
//   age: 21
// });
// Now you can use name and age in ejs file no issue just keep it in between <% %> ejs tags or even <%= %>
// And, if we have the code like

// res.render("subreddit", {data});
// Then, it is like

// res.render("subreddit", {
//   data: {
//     name: "Anonymous",
//     age: 21
//   }
// });

// It's better to use spread here cause if you don't in ejs you'll have to access data.name and data.age which is just a hassle for a large enough nested object.