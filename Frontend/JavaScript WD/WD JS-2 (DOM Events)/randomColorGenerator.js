const colorName = document.querySelector("#randomColorName");
const colorButton = document.querySelector("#randomizeColorButton");
// const body = document.querySelector("body");

function generateRandNum0to255(){
    return Math.floor(Math.random()*256);
}

function makeRandomColor(){
    let rValue = generateRandNum0to255();
    let gValue = generateRandNum0to255();
    let bValue = generateRandNum0to255();
    return `rgb(${rValue},${gValue},${bValue})`; // Returning a string is important cause both innerText and backgroundColor will be assigned this string.
}

colorButton.addEventListener('click',() => {
    let newColor = makeRandomColor();
    // Now show the random color name on site.
    colorName.innerText = newColor;
    // Now change the body color of the site to that new color.
    document.body.style.backgroundColor = newColor;

})