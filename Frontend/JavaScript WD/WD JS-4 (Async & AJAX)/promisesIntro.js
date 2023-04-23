// Now we will see a function that does the same thing with and without promises.

const fakeRequestCallback = (url, successFunction, failureFunction) => {
  const delay = Math.floor(Math.random() * 4500) + 500;
  setTimeout(() => {
    if (delay > 4000) {
      failureFunction("Connection Timeout :(");
    } else {
      successFunction(`Here is your fake data from ${url}`);
    }
  }, delay);
};

// Now in order to make few consecutive calls to the above function it will make a callback hell.

// fakeRequestCallback(
//   "books.com/page1",
//   (response) => {
//     console.log("It worked for page1");
//     console.log(response);
//     // Now after the first one has worked making a call for the second page
//     fakeRequestCallback(
//       "books.com/page2",
//       (response) => {
//         console.log("It worked for page2");
//         console.log(response);
//         // Now after the second page has worked now making a call for the third page.
//         fakeRequestCallback(
//           "boooks.com/page3",
//           (response) => {
//             console.log("It worked for page3");
//             console.log(response);
//           },
//           (err) => {
//             console.log("Error while acccessing page3");
//             console.log(err);
//           }
//         );
//       },
//       (err) => {
//         console.log("Error while acccessing page2");
//         console.log(err);
//       }
//     );
//   },
//   (err) => {
//     console.log("Error while acccessing page1");
//     console.log(err);
//   }
// );

// Now making the same kindof function using promise and we will try to do these dependent actions again using .then & .catch

const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Connection Timeout :(");
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay);
  });
};

// Now using .then() and .catch() methods to do the same thing as above
// fakeRequestPromise("books.com/page1") // This will return a promise so i can use .then and .catch to do whatever i want depending on whether that promise was rejected or resolved.
//   .then((response) => {
//     console.log(response);
//     console.log("It worked for page1");
//     // Making the next call
//     fakeRequestPromise("books.com/page2")
//       .then((response) => {
//         console.log(response);
//         console.log("It worked for page2");
//         fakeRequestPromise("books.com/page2")
//           .then((response) => {
//             console.log(response);
//             console.log("It worked for page3");
//           })
//           .catch((err) => {
//             console.log(err);
//             console.log("Error while acccessing page3");
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log("Error while acccessing page2");
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("Error while acccessing page1");
//   });

// The above version is still not much better then the callback method now let's see a much better version.
// Now the cleanest option with then() and catch()
// Here we actually return a promise from then() callback so we can chain these dependent actions.
fakeRequestPromise("yelp.com/page1")
  .then((response) => {
    console.log(response);
    console.log("It worked for page1");
    return fakeRequestPromise("yelp.com/page2");
  })
  .then((response) => {
    console.log(response);
    console.log("It worked for page2");
    return fakeRequestPromise("yelp.com/page3");
  })
  .then((response) => {
    console.log(response);
    console.log("It worked for page3");
  })
  .catch((err) => { // If any of the above promises get rejected we will straightaway fall to this catch statement idk how to have separate catch statements for each of the then() but i'll learn that later.
    console.log(err);
    console.log("One of the requests has failed !");
  });

// See this above thing how clean this code looks compared to the callback hell we were dealing with in the first function.

