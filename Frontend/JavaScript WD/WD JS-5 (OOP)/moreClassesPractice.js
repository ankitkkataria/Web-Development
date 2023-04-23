class Color {
  constructor(red, green, b, name) {
    // This function automaticlly runs when a new object of this class has been created.
    // You can assume a new object has been created at this point now down below you're going to set the properties of it.
    this.r = red;
    this.g = green;
    this.b = b;
    this.name = name; // These things on the right side are just the variable that catch the arguments you can have the same name as the newly created object properties for them if you want like here this.name means the newly created object will have a property name and i'm assinging it the value stored in the variable name when that object was created.
    this.calcHSL(); // This way we can call a function within the class itself by this point r,g,b values have been stored and that's the only thing we need to calculate h,s,l values this way as this function call happens we will get h,s,l values as properties of my current object.
  }

  innerRGB() {
    // You don't need to use the keyword function when making functions in a class and all the objects of this class will be able to access these functions as reference or you can say these functions will be added as prototypes when
    const { r, g, b } = this; // r,g,b values of the object will directly be stored in r,g,b variable on the left if you don't remember the destructuring of objects just go back to JS notes you took also this here means the object itself.
    return `${r},${g},${b}`;
  }

  rgbString() {
    return `rgb(${this.innerRGB})`;
  }

  rgbaString(a = 1.0) { // Here i'm using default parameter for opacity.
    return `rgb(${this.innerRGB},${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hslString() {
    const { h, s, l } = this; // As soon as the constructor is called we will get h,s,l values right away in our object and that means you can directly call these functions without worrying if the h,s,l values of this object have been set or not.
    return `hsl(${h},${s}%,${l}%)`;
  }

  fullySaturated() {
    const { h, l } = this; // Don't need s cause we will set it 100% anyway.
    return `hsl(${h},100%, ${l}%)`;
  }

  opposite() {
    const {h,s,l} = this;
    const newHue = (h + 180) % 360; // To get the hue of the opposite color.
    return `hsl(${newHue},${s}%, ${l}%)`;
  }

  calcHSL() { // Initially it was taking r,g,b as arguments but we don't want to call this function with r,g,b values ourselves since we already have these values in my object as soon as it's created i can just use them.
    let { r, g, b } = this; // Storing r,g,b values in variables using let instead of const cause the values in these variables is being changed in the few lines below.
    // CODE FROM THE NEXT LINE IS COPIED
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    // CODE IS COPIED TILL HERE NEXT FEW LINES ARE OURS.
    // By this point in this function it has calculated the h,s,l values successfully so i make new properties in my object called h,s,l and store the values calculated by this function.
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

const tomatoColor = new Color(255, 67, 89, "tomato"); // This will create new objects of color.
const whiteColor = new Color(255, 255, 255, "white"); // This will create new objects of color.

// Now you can easily access the methods present in the object.
console.log("The hex color value of the tomatoColor is ", tomatoColor.hex());
console.log("The hsl color value of the tomatoColor is ",tomatoColor.hslString());
// If you want to set the body's background color to the opposite color of tomato color you can do it this way.
document.body.style.backgroundColor = tomatoColor.opposite();
// If you want to get the fully saturated color of tomato color and set that as the body background do it this way.
document.body.style.backgroundColor = tomatoColor.fullySaturated();

