const giveMeAJoke = require("give-me-a-joke");
const colors = require("colors");
giveMeAJoke.getRandomDadJoke(function (joke) {
  console.log(joke.rainbow); // How did the colors npm package do this well they added these methods to the string prototype that's it.
});

// Feeling pretty proud of myself. The Sesame Street puzzle I bought said 3-5 years, but I finished it in 18 months.
