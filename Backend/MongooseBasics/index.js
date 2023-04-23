const mongoose = require('mongoose');
 // This line below connects mongoose to the already running mongod database server and connects to movieApp database in that server if that movieApp database doesn't exist it will create one for us.
mongoose.connect('mongodb://127.0.0.1:27017/movieApp') // Actually this method returns a promise if the request of connecting to the database works successfully then promise is resolved but if let's say you didn't use mongod to run the server beforehand or you changed the 27017(Which is nothing but the default port at which mongod server runs) here if you do 127017(wrong port) your promise will throw an error or you could say promise will be rejected.
.then(() => {
    console.log("Successfully connected to the database specified above");
    // The code below this promise will run before the mongoose is even connected to the database so ideally we should have written all the code below here inside then cause you might think well how can i make a schema before that database is even connected well that's cause of operation buffering used by mongoose it allows you to do certain things before the database is even connected and then tells the databse once it's been connected and if it finds it didn't connect well then it just scraps everything it did this scrapping thing i'm assuming only not sure.
})
.catch((err) => {
    console.log("Oh! no you got a error connecting to the database specified above");
    console.log(err);
})
console.log('Just chekcing if this runs before the promise above or after');
// console.log(mongoose); // Use node --watch index.js if you want to see what mongoose object looks like.

// After connecting to the database the first thing we have to do is defining your schema.
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection(like dogs,cats we saw previously) and defines the shape of the documents within that collection.

const movieSchema = new mongoose.Schema({ // movieSchema after this a object containing the actual schema and all the methods necessary. 
    title : String,
    year : Number,
    score : Number,
    rating : String
});


// Now what i do is i take this schema and i tell mongoose i want to make a model using that schema.
// To do that we use mongoose.model()
// mongoose.model() takes in two args.
// 1) First argument is pass in a string containing the name of our model (keep this name singular and first letter capitalized like Movie).
// 2) Second argument is the schema you want to create a model of here that is movieSchema.
const Movie = mongoose.model('Movie',movieSchema);
// First thing the above line does is it makes a collection in the movieApp database called movies (It came up with this name from the model name Movie it lowercased it and plurlized it this collection will follow the schema specified in the second argument).
// mongoose.model('Movie',movieSchema) actually returns a class and we will store that class into the variable Movie.
// Now just bcz i made a Movie class that in itself does nothing with my database.
// But we can now make new instances of my Movie class and i can save them to my mongo database or more specifically movies collection.

// Creating a new instance/object of Movie class.
const amadeus = new Movie({title: 'Amadeus',year : 1986, score: 9.2, rating : 'R'});

// The above line just created a object of the movie class and stored that new object in amadeus.
// console.log(amadeus); // Checkout what this object looks like.
// If you type amadeus. you'll see a lot of methods in suggestions actually those are the things that help us interact with the Mongo database from our JavaScript.
// See till now we have only made an object.
// You've not stored it in the collection movies in your movieApp database.
// To save this movie actually to your database just do this amadeus.save() // This method save every object of the model will have access to it.
// So, What models allow us to do to is create and manipulate these objects/documents(normally this object would be a row of a movies table) and change values in these objects all from our javascript file and not deal with mongo shell and we when we are done making changes to these objects of our model here in our javascript file we can just use save them to our actual movies collection in the database.
// Another example :-
const forestGump = new Movie({title: 'Forest Gump',year : 1994, score: 9.1241, rating : 'PG-13'});
// forestGump.save(); // This returns a promise as well.
// I saved amadues from the node shell that i accessed by using the command :- node -i -e "$(< index.js)" and saved it from there so that's why you don't see an amadeus.save() command here in JS code.
// These models when created objects from give us access to various methods that allow us to interact with actual mongo database.
// Right now it might feel like just using db.movies.insert(amadeus object written here) would've been easier then doing all this but later we will see why this is the better way.

// Now let me insert a few new movies just so we can learn about other queries as well.
// insertMany() is a model method that works just like db.collectionName.insertMany() it takes a array of documents and stores all of them in a collection.
// Since inserting many things into a database can take a lot of time this method returns a promise if storing the data is successful it will return all the documents in JS object form otherwise it will throw an error.
// Movie.insertMany([ // In insertMany() you don't need to call .save() it directly inserts in the datebase.
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
// ])
// .then((data) => {
//     console.log("I've inserted all these new movies successfully");
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })

console.log("After the insertion");

// Finding Using Mongoose again these operations take time so we have to wait for the output we use find that is a method that's present in the model here in our case Movie model.
// Movie.find({title : "Amelie"}); // If you console.log() this line it returns a query object but you won't get the JS Object for Amelie actually this returns a query object that is a thenable object it doesn't return a actual promise but it's still thenable.
// To actually get the data for the movie Amelie do this :-
Movie.find({title : "Amelie"})
.then(data => console.log(data));
// All the operators that worked in mongo shell still work here in this find as well.
Movie.find({year : {$gt : 2010}})
.then(data => console.log(data));

// If you want the query to return a actual promise do this behind find query put .exec() Movie.find({year : {$gt : 2010}}).exec() // This will return a actual promise here.
// The above method find it doesn't matter if it finds one or many matches it will return a array and it won't stop till the entire collection has been searched.
// So sometimes we need findOne and we do have that here.
Movie.findOne({year : {$lt : 2010}})
.then(data => console.log(data));

// Finding a object/document using id 
// In express apps we have routes like app.get('/movies/:id'); // In such cases we usually need to take the id and find and display the movie information quite often.
// Obviously you can do Movie.findOne({_id : 1adfjhjkhk12lh34lkh1kjl}).then()
// Or you can use 
// Movie.findById('id value here').then();
// So, findById('id value') is almost equivalent to findOne({_id : 'id value'}); // I said almost cause there is a minor difference when it comes to undefined values that you can read in the mongoose docs.
// I said findById is equivalant to findOne not find don't mistake that for that same thing.

// Now let's learn about updating.
// First just like mongoDB here our models contain all three methods update,updateOne and updateMany.
Movie.updateOne({title : "Amadeus"},{year : 1984}) // In this second arg you don't need to add $set but behind the scenes it will automaically be converted to {$set:{year : 1984}};
.then(data => console.log(data)); // But this will only give a object that says nmodified : 1 or something it won't return the thing that was actually updated cause sometimes we need that let's say in a express app you went and setup a update route after updating something you might want to display it if you do it this way you might have to again find this and then display so we have other newer model methods called findOneAndUpdate,findOneByIdAndUpdate.

// Similarly updateMany exists
Movie.updateMany({title : {$in:["Amadeus","Stand By Me"]}},{score : 10}) 
.then(data => console.log(data));

// But if you want to see the data you modified after modifying it just use newer methods.
Movie.findOneAndUpdate({title : "Stand By Me"},{score : 8},{new : true}) // If you don't pass in the third argument it will be set to false by default and this method will return the data that was there just before it was updated.
.then(data => console.log(data)); // We will use this quite frequently from now on moving forward.

// Movie.findByIdAndDelete() // Also works in a similar fashion.

// Let's learn about deleting.
// This down below will delete Amelie movie entirely from databbase and return a message saying 1 thing was deleted.
Movie.deleteOne({title : "Amelie"})
.then(msg => console.log(msg)); 
// Similarly deleteMany() also exists as a Movie model method.

// But if you want the data that was just deleted like the one we needed during update.
// Again we have two methods
// Movie.findOneAndDelete(),Movie.findByIdAndDelete()
