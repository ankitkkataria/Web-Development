const button = document.querySelector("#changeColor");
const container = document.querySelector("#container");

button.addEventListener("click", function (e) {
    container.style.backgroundColor = makeRandColor();
    e.stopPropagation(); // This just says okay make sure the detail of this event happening to this element is not sent to the parent of this element.
})

// button.addEventListener("click", function (e) {
//   e.stopPropagation(); // This can be put before the color changing line as well.
//   container.style.backgroundColor = makeRandColor();
// });

container.addEventListener("click", function () {
  container.classList.toggle("hide");
});

const makeRandColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
