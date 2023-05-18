const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Just shortening the term mongoose.Schema for later use.

const campgroundSchema = new Schema({
    title : String,
    price : String,
    description : String,
    location : String
})

module.exports = new mongoose.model('Campground',campgroundSchema);



