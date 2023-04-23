const button = document.querySelector("button");
button.addEventListener("click", function (eventObject) {
  // See first of all this function that's passed in here is called event handler and whenever you're listening for an event and when that event actually happens this function inside is automatically gets passed in a event object that containes the details about what happend in that event.
  console.log(eventObject);
  // If you look at the eventObject in the console you'll see various things about the mouse click you made like the position of the cursor when that click happend and many other things.
});

// This above click only listens to event that happens on the button but if you want to listen for a event (click or keypress or scroll etc.) if it happens anywhere on the page you can do so by using the window object.

// window.addEventListener("click",function(e){ // e here catches the eventObject.
//     console.log(e);
// });

// Now if you wanna look for a keypress that's where the eventObject is used for checking exactly what key was pressed.
// You have two events one is keydown when occurs when a key is pressed down and keyup occurs when the key is left.

const input = document.querySelector("input");
input.addEventListener("keydown", (e) => {  // Similarly a keyup event can be listened to.
  console.log(e);
  // The event object in case of a keypress contains two properties
  // 1) key that tells up which key was pressed so if right shift was pressed it would say shift.
  // 2) code that tells us the actual code of the key so shiftRight will be the code value in this case.

  // So in a keyboard of different language the key might be different but the code always stay the same.
  console.log("The key value of the key you pressed is ", e.key); // Printing key.
  console.log("The key value of the key you pressed is ", e.code); // Printing code.
  // The key pressed down need not be a character or should neccessarily change the input text the key can even be alt,shift,up,down arrow etc.
});

// Making a program that listens to a keypress anywhere on the site and only takes a few inputs into considration and ignores all the others.
window.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowUp':
            console.log("UP!");
            break;
        case 'ArrowDown':
            console.log("DOWN!");
            break;
        case 'ArrowLeft':
            console.log("LEFT!");
            break;
        case 'ArrowRight':
            console.log("RIGHT!");
            break
        default:
            console.log("IGNORED!")
    }
})
