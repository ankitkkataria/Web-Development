// This is a Constructor Function...
function Color(r, g, b) { // Keeping first capital letter is a good thing just a norm not a rule.
	// When used with new keyword at this point you can imagine a new object is automatically created.
	this.r = r; // The properties of this automatically created object that i'm setting when new keyword was used.
	this.g = g;
	this.b = b;
	// And at this point that automatically created object is returned when new keyword was used.
    // If you defined functions here they won't be defined in prototype rather every object will contain them so we will have to set all the fucntions outside that's a weird syntax you have to declare all the functions outside that's why classes were used classes package everything like properties and functions together it just provides easier syntax that's it however it does that same thing.
}

// If you call it on its own like a regular function...
Color(35, 60, 190); //undefined
// It returns undefined. Seems useless!

// *****************
// THE NEW OPERATOR!
// *****************

// When the new operator is used with the constructor function call the following 4 things happen :-

// 1. It creates a blank, plain JavaScript object.
// 2. Links (sets the constructor of) this object to another object.
// 3. Passes the newly created object from Step 1 as the this context.
// 4. Returns this if the function doesn't return its own object.

Color.prototype.rgb = function() { // These functions will be defined as prototype functions in other terms they will be used by reference and not every object will contain them this can be done like in prototype.js file we made Array.proptotype.pop = function() same way they are making these functions prototypes.
	const { r, g, b } = this;
	return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function() {
	const { r, g, b } = this;
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function(a = 1.0) {
	const { r, g, b } = this;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const color1 = new Color(40, 255, 60); // Using the new keyword
color1.hex();
const color2 = new Color(0, 0, 0);
color2.hex();
