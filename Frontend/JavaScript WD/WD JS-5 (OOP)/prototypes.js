// String.prototype is a "template object" for every single string.
// We could go crazy and add our own method called yell...
String.prototype.yell = function () { // Just think of it like this String is the class and all the string methods are in that class and you can access or add methods using String.prototype also remember for every string these methods are not redefined again and again rather they are actually just references to the same functions present in prototype property of the string class.
  return `OMG!!! ${this.toUpperCase()}!!!!! AGHGHGHG!`;
};

"bees".yell(); // "OMG!!! BEES!!!!! AGHGHGHG!"

// We can overwrite an existing Array method like pop (not a good idea):
Array.prototype.pop = function () {
  return "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF!";
};

const nums = [6, 7, 8, 9];
nums.pop(); // "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF!"
