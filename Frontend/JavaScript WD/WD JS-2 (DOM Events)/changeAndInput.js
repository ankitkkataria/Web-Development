// You have to make a input that changes the h1 in realtime
const input = document.querySelector("input");

// 1st way using keydown event is this down below but it doesn't account for the fact that there can be a copy paste in that case no key is actually pressed or there can be a speech to text that can be used also it considers pressing arrow keys as change in input and similarly leftshift and alt and stuff too and we don't need that .

// const h1 = document.querySelector("h1");
// input.addEventListener("keydown", function() {
//     h1.innerText = input.value;
//     console.log("The keydown event just got fired"); // Open console for each of these three ways and check when and how they get fired.
// });

// 2nd way is using the change event.
// change event :- Say you type something now in the input and once you click out of it. It checks whether this new input you just entered is different than the one it had before in that case it fires the event otherwise it says there was no event but it takes copy/paste into considraion as well so no need to worry there.

// const h1 = document.querySelector("h1");
// input.addEventListener("change", function() {
//     h1.innerText = input.value;
//     console.log("The change event just got fired");
// });

// 3rd way is using the input event.
// input event :- It in real time checks whether something has been entered if yes it updates we don't need to click out of the input it also takes copy/paste or voice input into considration this is the best way of doing such a thing and it doesn't really consider shift,alt or up,down,left and right as valid event either.

const h1 = document.querySelector("h1");
input.addEventListener("input", function () {
  h1.innerText = input.value;
  console.log("The input event just got fired");
});
