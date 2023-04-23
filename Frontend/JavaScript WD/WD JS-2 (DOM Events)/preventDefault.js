// Your job is to make a form where a user enters their cat name that they want to put in your shelter and you should show all the cats in the shelter.

const form = document.querySelector("#shelterForm");
const ul = document.querySelector("#catList");
const catNameInput = document.querySelector("#catName");

form.addEventListener("submit", function (e) {
  // You could have also done this by seeing when the submit button was clicked submitButtonObj.addEventListener('click',function());
  e.preventDefault(); // preventDefault is a method that's present in the eventObject of the submit button of a form this is the main crux of the situation here if you don't put this line the form will automatically jump to the action site and whatever you want to put on this site won't be visible for more than a split second so we have to stop that.
  // Something to remember almost every event has a default behaviour and this preventDefault can be called on all such events if you want to stop it from doing default things.
  let currCatName = catNameInput.value; // This is how you can access whatever the user enters inside a certain input.
  if (currCatName !== "") {
    // If the user doesn't enter anything i don't want to make that a entry in the cat shelter list.
    let catListItem = document.createElement("li");
    catListItem.innerText = currCatName;
    ul.append(catListItem);
    catNameInput.value = ""; // This is so i can clear out whatever you entered in the input after the submit button has been pressed so input.value can also be used for modifying the input value it's not just for acccessing it.
  }
  // console.log(e); // If you want to see what the form submit eventObject looks like you can uncomment this and see.
});
