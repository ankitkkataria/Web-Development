const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground"); // .. means one level above since models folder is not here.

mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => {
    console.log("Successfully connected to the database specified above");
  })
  .catch((err) => {
    console.log(
      "Oh! no you got a error connecting to the database specified above"
    );
    console.log(err);
  });

const randomElementFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => { // This function will make 50 enteries in your database with random names and random places.
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
        location :`${cities[random1000].city}, ${cities[random1000].state}`,
        title : `${randomElementFromArray(descriptors)} ${randomElementFromArray(places)}`
    })
    await camp.save();
  }
};

// Calling seedDB
seedDB() // All async functions automatically return Promises. If you declare a function as async, it will return a Promise, even if your only return value is a simple value like a string or number. If you don't return explicitly, your async function will still return a Promise with a value of undefined.
.then(() => {
    mongoose.connection.close(); // Closing the database connection after seeding is a good practice to ensure that the program terminates cleanly and does not leave any open connections to the database. In this case, it's just a small seed script, that will end and get us back to the system terminal after the database connection is properly closed. In larger applications or web servers that continuously run and interact with the database, leaving open connections can cause issues like performance problems, so it's good to close the database connection when it's not needed anymore.
})
