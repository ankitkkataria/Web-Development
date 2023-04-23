const squareImages = document.getElementsByClassName('square');
// for(let img of squareImages)
//     console.log(img.src);
const allLinks = document.querySelectorAll('a');
// for(let link of allLinks){
//     link.textContent = "<p>I'm done</p>";
// }

// document.querySelector('h1').innerHTML += '<sup>i am the superscript</sup>';

for(let link of allLinks){
    // link.style.color = "#23ac23";
    link.style.textDecoration = "none";
}