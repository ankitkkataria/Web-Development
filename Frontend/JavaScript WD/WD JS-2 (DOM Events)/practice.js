// Events example here we first select a component that should perform something when a user does something and then on that event we write a function that tells what to do.
const btn = document.querySelector("button");
btn.onclick = function(){ // This property should be assigned to a function not directly to console.log("statement") cause when that console.log() statement would have been executed immediately rather the fucntion is called only when the button is clicked.
    console.log("Yo you clicked me my boi");
    console.log("I hate you");
}

btn.onmouseenter = () => {
    console.log("You just entered my buttony body");
    console.log("Don't do that again");
}

function scream() {
    console.log("You're an idiot");
}

// Example of first defining a function seperately and then assigning so you don't need to always define the function like you did in above two cases.
btn.onmousedown = scream; // See we're not typing scream(); bcz we're not calling it initially we're assining the function to onmousedown so when that happens call the function.
