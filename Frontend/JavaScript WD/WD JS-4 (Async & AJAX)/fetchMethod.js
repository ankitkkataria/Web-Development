// XHRs didn't support promises hence no support for async/await either and had weird syntax so people came up with fetch requests.
// Anytime i use the word JSON Object that's just me saying JSON string that has been converted to a JS object literal.

// fetch("https://swapi.dev/api/people/1/") // This will fetch the data from this URL and return a promise this works like a get request.
//   .then((response) => {
//     console.log("This is the responsed we got", response); // If you look at this response it's not actually the JSON string you were expecting it's actually going to return something called readable stream what actually happens is as soon as out fetch request recieves the first header from the URL it says okay i'm resolved it doesn't wait till it gets the entire JSON string so we don't get the entire JSON string.
//     So since you want the JSON object in out javascript code like we did with JSONparse() we will do it this way
//     response.json() // This method will return a promise that will contain the JSON object as a response if it's resolved cause sometimes the JSON string you got might be invalid too so this way if it's resolved you'll get your JSON object like you got from JSONparse();
//       .then((data) => {
//         console.log("This is the actual JSON Object", data); // data actually contains the JSON object you can take a look at it in the console.
//       })
//       .catch((err) => {
//         console.log("Error While Forming JSON Object", err);
//       });
//   })
//   .catch((err) => {
//     console.log("Error While Getting Response", err);
//   });

// Smaller way of doing the above thing.

// fetch("https://swapi.dev/api/people/1/")
//   .then((response) => {
//     console.log("This is the responsed we got", response);
//     return response.json(); // Returning a promise and then chaining outside.
//   })
//   .then((data) => {
//     console.log("This is the actual JSON Object", data);
//   })
//   .catch((err) => {
//     console.log("Error!", err);
//   });

// Making multiple fetch requests one after another

// fetch("https://swapi.dev/api/people/1/")
//   .then((response) => {
//     console.log("This is the responsed we got", response);
//     return response.json(); // Returning a promise and then chaining outside.
//   })
//   .then((data) => {
//     console.log("This is the actual JSON Object", data);
//     return fetch("https://swapi.dev/api/people/2/"); // Again returning a promise the so the .then() code below will have to wait.
//   })
//   .then((response2) => {
//     console.log("Second Request Has Been Resolved");
//     return response2.json();
//   })
//   .then((data2) => {
//     console.log("This is the second JSON Object",data2);
//   })
//   .catch((err) => {
//     console.log("Error!", err);
//   });

// Since .then() chaining works we can even use async functions to do the same thing.

// const makeTwoCallsOneAfterAnother = async () => {
//   try {
//     let response = await fetch("https://swapi.dev/api/people/1/"); // We will wait for this promise to be resolved first.
//     let data = await response.json(); // Now data will contain the actual JSON Object.
//     console.log("This is the actual JSON Object", data); // This line won't run directly cause the lines above are await lines and the function execution pauses till those promieses aren't resolved.
//     let response2 = await fetch("https://swapi.dev/api/people/2/");
//     let data2 = await response2.json();
//     console.log("This is the second JSON Object", data2);
//   } catch (err) {
//     console.log("Error!", err);
//   }
// };

// makeTwoCallsOneAfterAnother(); // Since line 59 to 61 are same as 62 to 64 we can probably make a function that takes a person ID and returns the JSON object.

const returnPersonJSONObject = async (id) => {
  // Again try/catch can be added here like we did above.
  let response = await fetch(`https://swapi.dev/api/people/${id}/`);
  let data = await response.json();
  return data; // Resolving the promise returned by this async function.
};

const makeTwoCallsOneAfterAnotherAgain = async () => {
  let object1 = await returnPersonJSONObject(1);
  console.log("This is the actual JSON Object", object1);
  let object2 = await returnPersonJSONObject(2);
  console.log("This is the second JSON Object", object2);
};

// makeTwoCallsOneAfterAnotherAgain();

const make50Calls = async () => {
  for (let i = 1; i <= 50; i++) {
    let obj = await returnPersonJSONObject(i);
    console.log(obj.name,obj);
  }
};

make50Calls();
