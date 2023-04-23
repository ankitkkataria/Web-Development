// This function makes and returns an object every time it is called.
// The resulting objects all follow the same "recipe"
// THE PROBLEM WITH THIS METHOD IS THAT EVERY OBJECT OF SIMILAR TYPE WILL HAVE IT'S OWN SEPERATE FUNCTIONS AND WE DON'T WANT THAT CAUSE THAT'S UNECCESSARY SO WE WILL TRY TO USE CLASSES WHERE THE FUNCTIONS WILL BE USED BY REFERENCE AND ONLY A SINGLE COPY OF THEM WILL BE NEEDED.
function makeColor(r, g, b) {
  const color = {}; // Making an object
  color.r = r; // Setting r property in the new object that was created.
  color.g = g; // Setting g property in the new object that was created.
  color.b = b; // Setting b property in the new object that was created.
  color.rgb = function () {
    // Declaring a method in that new object we can do this along with values our objects can also contain methods.
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  };
  color.hex = function () {
    // Declaring another method.
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  return color; // Returning the new object.
}

const firstColor = makeColor(35, 255, 150);
firstColor.hex(); // #32FF6A <----- What the uncommented line will return.
firstColor.rgb(); // "rgb(35, 255, 150)"

const black = makeColor(0, 0, 0);
black.rgb(); // "rgb(0, 0, 0)"
black.hex(); // "#000000"

