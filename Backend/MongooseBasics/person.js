// In this file we will learn about virtuals.
// So virtuals are a really nice feature, actually. They give us the ability to add properties to a schema that don't actually exist in the database itself, but that we have access to thanks to Mongoose so these are usually a synthesis of multiple properties in a database or something that could be derived from the database.
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
personSchema.virtual('fullName').get(function(){ // This get means given that we even do personDocument.fullName my function should return what i'm returning on the line below.
    return `${this.first} ${this.last}`; 
})


const Person = mongoose.model('Person',personSchema); // This will make a collection called people not persons cause that's the correct plural term here.

const Ankit = new Person({first : "Ankit", last : "Kataria"});
Ankit.save();

console.log(Ankit.fullName); // I can access this property but it's not actually present in the database itself so when you're referring to a property in your code multiple times but you feel there is not much need to actaully store it in the database itself you can just use virtual.

// What we saw is virtual get but we could also set up a virtual set what it would do is when you pass in the full name to that method it will break it down into first and last and store it in the database you can look at that method in the docs as well.
