// Axios is a library for making HTTP requests it's built upon the fetch API method itself but since it's not part of native JS we have to include it look at axios.html file and you'll find a newly added script.
// Anytime i use the word JSON Object that's just me saying JSON string that has been converted to a JS object literal.
// axios.get("https://swapi.dev/api/people/1/") // It again returns a promise but unlike fetch where we had to then again call response.json() and also wait for that promise to be resoloved here the response itself contains the JSON object to access it just do response.data;
//   .then((response) => {
//     console.log("Response", response);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });

const getStarWarsPerson = async (id) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(id, response.data); // This will show you the JSON Object you wanted.
  } catch (error) {
    console.log("There was an error in fetching data in getStarWarsPerson",error
    );
  }
};

// If you open the console now you'll see that your requests are not coming in the order you're calling them so if you want that just put all this in a function and use the await keyword when calling getStarWarsPerson() that way until one request is completed the next won't happen right now they are all being called simultanously and we get them in random order depending on which request happened quickly.
for (let i = 1; i <= 50; i++) {
  if (i !== 17)
    // Cause 17th person doesn't exist for some reason.
    getStarWarsPerson(i);
}
