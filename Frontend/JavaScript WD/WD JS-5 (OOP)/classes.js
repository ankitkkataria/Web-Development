class Color {
  constructor(red, green, b, name) {
    // This function automaticlly runs when a new object of this class has been created.
    // You can assume a new object has been created at this point now down below you're going to set the properties of it.
    this.r = red;
    this.g = green;
    this.b = b;
    this.name = name; // These things on the right side are just the variable that catch the arguments you can have the same name as the newly created object properties for them if you want like here this.name means the newly created object will have a property name and i'm assinging it the value stored in the variable name when that object was created.
  }

  innerRGB() { // You don't need to use the keyword function when making functions in a class and all the objects of this class will be able to access these functions as reference or you can say these functions will be added as prototypes when
    const { r, g, b } = this; // r,g,b values of the object will directly be stored in r,g,b variable on the left if you don't remember the destructuring of objects just go back to JS notes you took also this here means the object itself.
    return `${r},${g},${b}`;
  }

  rgbString() {
    return `rgb(${this.innerRGB})`;
  }

  rgba(a = 1.0){
    return `rgb(${this.innerRGB},${a})`;
  }

  hex() {
    const {r,g,b} = this;
    return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
  }
}

const tomatoColor = new Color(255,67,89,"tomato"); // This will create new objects of color.
const whiteColor = new Color(255,255,255,"white"); // This will create new objects of color.

// Now you can easily access the methods present in the object.
console.log("The hex color value of the tomatoColor is ",tomatoColor.hex());