// I want to change the body's color after 1 second in form of a rainbow.
// setTimeout(() => {
//   document.body.style.backgroundColor = "red";
//   setTimeout(() => {
//     document.body.style.backgroundColor = "orange";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "yellow";
//       setTimeout(() => {
//         document.body.style.backgroundColor = "green";
//         setTimeout(() => {
//           document.body.style.backgroundColor = "blue";
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// One other way of doing the same thing as the code above :-

// First make a function
const delayedColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    doNext && doNext();
  }, delay);
};

// Then make the calls which shows that there is still a lot of nesting.

delayedColorChange("red", 1000, () => {
  delayedColorChange("orange", 1000, () => {
    delayedColorChange("yellow", 1000, () => {
      delayedColorChange("green", 1000, () => {
        delayedColorChange("blue", 1000, () => {});
      });
    });
  });
});

// Normally we don't just have a single call we have 2 calls for each function call that really shows how quickly things can get out of hand as the number of calls increase.

// searchMoviesAPI(
//   "amadues",
//   () => {
//     // If the moviesAPI works (success function for moviesAPI)
//     saveToMyDB(
//       movies, // First arg is the name of my database.
//       () => {
//         // If it works run this or save to this database (success function for database)
//       },
//       () => {
//         // If the saving to database gives an error (failure function for database)
//       }
//     );
//   },
//   () => {
//     // If the moviesAPI itself is down (failure function for moviesAPI)
//   }
// )

