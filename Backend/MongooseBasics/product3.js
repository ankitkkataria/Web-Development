// Copying product2.js
// Here we will learn about instance methods (instance methods are methods that are present on every instance of a class unlike the protoype methods that are only present on the class here we will declare some instance methods on each document/row of a collection.)
// Here also we will learn about static methods (methods that apply on the entire model itself on all the instances like i'm defining a method down below called firesale that makes all the items price 5 dollars and makes onsale to true).
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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The value you have enterted is too small"], 
  },
  categories: {
    type: [String],
  },

  qty: {
  
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size : {
    type : String,
    enum : ['S','M','L']
  },
  onSale : {
    type : Boolean,
    default : false,
  }
});

// Declaring instance methods any new document that's present in or will be inserted in the schema will have access to these methods actually these methods will be present on each and every instace seperately.
productSchema.methods.toggleOnSale = function () { // Don't use arrow function here cause you can't use this inside it for some reason i'm not sure.
  this.onSale = !this.onSale; // this here refers to the instance itself.
  return this.save(); // I'm returning this cause save might take time and when i call this function i can call it from a async function and await till this thenable object is resolved or wait using .then()
}

productSchema.methods.addCategory = function (newCategory) {
  this.categories.push(newCategory);
  return this.save();
}

productSchema.statics.fireSale = function () {
  return this.updateMany({},{onSale : true, price : 5}); // this here means Product class itself but i'm using this cause we might not know the class name Product always and in the first considtion i left {} that means update everything and we don't need to do save() here cause updateMany automatically saves behind the scenes.
}
const Product = new mongoose.model("Product", productSchema);

const findProduct = async () => {
  const fountProduct = await Product.findOne({name : 'Bike Helmet'});
  console.log('This is what this product properties look like currently',fountProduct);
  await fountProduct.toggleOnSale();
  console.log('This is what this product properties look like after calling toggleOnSale',fountProduct);
  await fountProduct.addCategory('Outdoors');
  console.log('This is what this production properties look like after calling addCategory',fountProduct);
  
}

// Calling this function to see if my instance methods work or not.
findProduct();
Product.fireSale().then(res => console.log(res));
// See the reason we defind instance methods is cause it saves us from writing duplicate code.
// So if there is something that you do regularly like toggling a item's sale on/off adding a function that does that and saves the new resulting item makes sense.
// Otherwise you'd have to do this 
// const findProduct = async () => {
// const fountProduct = await Product.findOne({name : 'Bike Helmet'});
// fountProduct.onSale = !fountProduct.onSale;
// fountProduct.save();
// }
// For each and every item you might have to write the same code if you want to put them onSale.
// Now you just get the items and then do .toggleOnSale() that's it.














// const bike = new Product({ name: "Bike Cycling Jersey", price: 29.99, categories:['cycling','safety',123],size : 'M'}); 
// bike.save()
//   .then((data) => {
//     console.log("It Worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh Error");
//     console.log(err);
//   });

// Product.findOneAndUpdate({ name: "Bike Helmet" },{ price: -12 },{ new: true, runValidators: true }) 
//   .then((data) => {
//     console.log("It Worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh Error");
//     console.log(err);
//   });

  