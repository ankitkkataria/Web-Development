const jokesList = document.querySelector("#jokesList");
const button = document.querySelector("button");

// Function below will return a new dad joke
const getNewJoke = async () => { // I should use try and catch here but not using it just cause i know this API works here and i want these comments to just stay easily readable.
  // You can pass in the request headers as a second argument of the axios.get() command it's a optional argument till now we saw how to pass in header information using postman but this is how you do it using JS.
  // Header information is passed in as a object literal where each property itself migght be a object literal you can pass the line below as the second arg directly but we did it by first storing it in a variable just cause it looks nice.
  let headerInformation = { headers: { Accept: "application/json" } }; // This is just the header information that you need to pass into this API request that will provide you with JSON Object or JS object literal of that JSON string in the response.data.
  let response = await axios.get("https://icanhazdadjoke.com/", headerInformation); // Again axios.get() also returns a promise.
  return response.data.joke; // response.data means the JS object literal of the JSON string and .joke is cause that's the property here that contains the joke you can see it by using console.log(res.data);
};

// Function below will add a new joke to our jokesList unorderd list.
const addNewJoke = async () => {
    let newJokeText = await getNewJoke(); // Since getNewJoke() is a async function and so it by default will return a promise and in that promise's response i know i'll get the joke text but since the function is going to return a promise i shall await here till that promise gets resolved otherwise i'll just move out of this line really quickly before the jokes has been even fetched from the server that's why i'm using the await keyword here.
    const newLI = document.createElement('li');
    newLI.append(newJokeText);
    jokesList.append(newLI);
}   

button.addEventListener('click',addNewJoke); // addNewJoke will automatically call the getNewJoke function so we don't need to worry about that.