// This models folder will contain all the models we make this is quite a common practice to do we might have multiple models(each derived from it's different schema) so we make them here in one location and then export them to other files whereever needed.
const mongoose = require('mongoose'); // You might think how will it find mongoose if node_modules is not in this folder actually this is something node handles automatically it will keep on going one level up if it doesn't find node_modules folder in current directory it will go till the root folder of the current project.
// I don't need to connect to the mongoose server here cause i'll just be creating a model and exporting it from here.

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true, // This means whatever the user enters in the string just convert it all to lowercase.
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product; // Exporting this Product model that in itself implicitly contains information about what collection it should manipulate and what schema it should follow.