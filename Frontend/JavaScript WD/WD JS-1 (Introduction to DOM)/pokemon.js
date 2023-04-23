// Sample Pokemon URL
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

// Code
const container = document.querySelector("#container");
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

for(let i = 1 ; i < 1008 ; i++){
    const newDiv = document.createElement('div');
    container.append(newDiv);
    const image = document.createElement('img');
    newDiv.append(image);
    image.src = `${baseURL}${i}.png`;
    newDiv.classList.add("divStyles");
    const newSpan = document.createElement('span');
    newDiv.append(newSpan); 
    newSpan.innerText = `${i}`;
}

/*In the container we make a div and inside the div we first put the image and then put the text/number*/
