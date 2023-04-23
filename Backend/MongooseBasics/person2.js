// Copying person.js
// In this we will learn about mongoose middleware this allows us to do something before and after a action has been taken on a instance.
// For example let's say you were deleting a user before deleting it from your database you might want to delete all the comments/posts this user has ever made and then finally delete the user itself.
// Or for example let's say you gave a movie 5-star rating i immediately after saving your review i might want to update the aggregate rating of that movie.
// This before and after thing can be applied on any action whether that be save,updateMany,delete or anything you can read all of this on the docs itself.
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// You define virtuals on the schema itself
personSchema.virtual("fullName").get(function () {
  // This get means given that we even do personDocument.fullName my function should return what i'm returning on the line below.
  return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function () { // What this method will do is no matter what name you try to save a object by before saving it will call the function inside and change the current instance's first to Yo and last to Mama and you'll store Yo Mama as your first and lastName in the actual mongo database.
  // pre means before you save any instance into the database do this function inside and this function is always a async function cause sometimes the things we might want to do before saving a element might take time.
  this.first = "Yo";
  this.last = "Mama";
  console.log("About to save");
  // After this function is finished finally save on that instance will be called.
});

personSchema.post("save", async function () { // It's not neccessary to always call this on save itself you can call it on any opertation not just save.
  // Before this ling below even executes that means that save has been ran already.
  console.log("Just Saved");
});

const Person = mongoose.model("Person", personSchema); // This will make a collection called people not persons cause that's the correct plural term here.

const Ankit = new Person({ first: "Ankit", last: "Kataria" });
Ankit.save();

console.log(Ankit.fullName); // I can access this property but it's not actually present in the database itself so when you're referring to a property in your code multiple times but you feel there is not much need to actaully store it in the database itself you can just use virtual.
