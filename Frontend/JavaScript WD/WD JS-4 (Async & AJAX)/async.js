// Let's try to do the same things we have been doing using async/await.

// async function hello() {
//     // First of all async function always returns a promise even when it's empty.
// }

// If you don't return anything like the function above then the promise it returned is resolved by a undefined value.
// Now if you want to resolve the promise returned by a async function you'll have to return and that says ok this promise is resolved with the value you just returned so in then you can even catch that return value in .then() it's almost like calling resolve('whatever you return') and if you have some then() methods that are depending on it they will be able to move forward.
// If you throw an error within the async function whether that be intentional or unintentional error the promise will be rejected.
// If you want to reject it you'll have to throw something it can be a string or a error anything you want that will tell us when this function is called and the promise it returned was rejected (with the value that was thrown you can even catch it in .catch()) so you can run a .catch() statement if you want.

const sing = async () => {
  // If you want to make arrow function async this is the syntax.
  //   throw new Error("You can't sing my boi"); // This throws an actual error but we can do our work by just throwing an string most of the time that also rejects the promise.
  throw "You can't sing my boi"; // But this works perfectly fine when throwing an error.
  return "LA LA LA LA";
};

sing()
  .then((response) => {
    console.log(
      "Your promise returned by sing function was infact resolved with ",
      response
    );
  })
  .catch((error) => {
    console.log(
      "Your promise you got from sing function was rejected with ",
      error
    );
  });

setTimeout(function () {
  // Keeping it here just to see returning a new Error completely halts the execution or not no it doesn't.
  console.log("I will run 1 second later");
}, 1000);

// Another example of using the async keyword.

const login = async (username, password) => {
  // if (username === "" || password === "") throw "Missing Credentials"; // If a credential is missing but this way of doing it doesn't work so we do the thing in line 43.
  // The above way doesn't work but correct way of writing the above line is written below it takes advantage of default boolean value of a empty string is false.
  if (!username || !password) throw "Missing Credentials";
  if (password === "awesome") return "Welcome";
  throw "Invalid Password";
};

login("ankit", "awesome")
  .then((response) => {
    console.log(response, "You've successfully logged in");
  })
  .catch((error) => {
    console.log(error, "You've not been logged in");
  });

// Now we will see how await helps us the function below is a function that returns a promise and we have used it before as well.
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

// Now if i want to do the color change the best way till now we did it was by chaining .then() methods.

// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))

// But we can use the await keyword as well.
// We normally use await keyword inside functions declared with async keyword.
// The await keyword will pause the execution of the async function it's a part of waiting for the promise it's written in front of to be resolved or rejected.
// In simple terms await is just a better way or simpler way of writing dependent functions(in the sense that they should happen only in a certain order) than .then() chaining through returning promises.
// The await keyword makes your code so much more easier to read in the sense that we can just look and say okay this line will happen first and then this or this function will wait at this line till this promise is resolved and only then the function execution will move forward we did this before by making sure that the functions depended on eachother due to return of promises and .then() chaining internally it still works the same way i think just we don't have to hassle that much in syntax.
async function rainbow() {
  await delayedColorChange("red", 1000); // My function execution will pause here until this promise is resolved.
  console.log("This line won't run until the above promise has been resolved");
  await delayedColorChange("orange", 1000);
  console.log("This line won't run until the two promises above have not been resolved");
  await delayedColorChange("yellow", 1000);
  await delayedColorChange("green", 1000);
  await delayedColorChange("blue", 1000);
  await delayedColorChange("indigo", 1000);
  await delayedColorChange("violet", 1000);
  return "All Done!"; // Since it's a async function me returning this basically means i'm resolving this function with the value "All Done!"
}

// Now when i call rainbow function it will do the same thing as the code starting at line 68.

// rainbow().then((response) =>
//   console.log(response, " End of all the rainbow colors") // See since the rainbow colors are all done and when that function is resolved (Here we will get All Done!) we will print this line.
// ); 

// The same way of doing the above thing where we print "End of all the rainbow colors" after all the colors have been cycled through can also be done using await.

async function printAfterRainbow() { // Declaring a async function cause we can use await in a async function.
    let response = await rainbow(); // This await will wait for the promise returned by the rainbow() function (promise returned cause rainbow is a async function and they always return promise) to be resolved also you see a different way of catching the response provided by the promise this is a bit different than how we do it in .then()
    console.log(response," End of all the rainbow colors");
}

// printAfterRainbow();  // Function we can use to run the code above

// Another Example

const fakeRequest = (url) => {
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

async function makeTwoRequests() {
  let response1 = await fakeRequest("books.com/page1"); // This is how you catch the response of the resolved promise like in then we did .then((data1))
  console.log(response1);
  let response2 = await fakeRequest("books.com/page2")
  console.log(response2);
}

// makeTwoRequests();  // Function we can use to run the code above

// Coming to the async/await keywords we have only seen the cases where my promise is always resolved what happens if it's rejected.
// Normally when a promise is rejected it usually leads to an error unless you use .catch() or something.
// If await keyword is used with a promise and it is rejected in that case it generates an error which stops the execution of my async function in which the await keyword along with the rejected promise were present is halted so to deal with this we will use try/catch.

const fakeRequestErrorVersion = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 600) { // Making the value so that it's a error most of the time.
        reject("Connection Timeout :(");
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay);
  });
};


async function makeRequest() {
  console.log("This will run as it's before the rejected promise line");
  let response = await fakeRequestErrorVersion("books.com/page1"); // response will store something only when the promise was resolved incase of a rejected promise my this async function is halted right here and we may not want that.
  console.log("This will not run most of the time cause the above line will generate an error"); 
}

// makeRequest(); // Function we can use to run the code above

// Again just to jog your memory whatever code is written in try and if that code generates an error normally that would halt the execution of your code but if that error is caught in the catch statement your entire program won't come to a halt rather that error will be caught and we move forward as usual.

async function makeRequests () {
  try {
    let response1 = await fakeRequest("books.com/page1");
    console.log(response1);
    let response2 = await fakeRequestErrorVersion("books.com/page2"); // This will produce an error making me jump to my catch statement without stopping the execution of my async function completely.
  }
  catch(error){
    console.log("There was an rejected promise" , error);
  }
}

makeRequests();

// Just remember that async and await are completely built on promises async functions make returning promises easier and await function makes chaining .then() methods easier.