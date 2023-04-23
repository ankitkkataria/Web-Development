const tvShowForm = document.querySelector("#tvShowForm");

// What happens when you submit the form we could have easily made it so on every change you make to the input it listens for that even and shows you new images but we don't want to abuse the API.
tvShowForm.addEventListener("submit", async function (eventObj) {
  // We have to make this function async cause we are making a request that returns a promise and we will have to wait till it gets resolved.
  eventObj.preventDefault();
  // There are two ways of accessing the input value using form.elements here using name or ID.
  // const inputByUser = tvShowForm.elements.tvSearchName.value;
  const inputByUser = tvShowForm.elements.tvSearchID.value;
  // console.log(inputByUser);
  // const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${inputByUser}`); // One simple way of getting the results using string template literal other version is written below like we did headers cause this way when multiple key=value&key2=value&..... is there gets cluncky so just like headers we can pass in query string info too using a object and passing in all the query string key,value in another object like shown below.
  const queryStringData = { params: { q: inputByUser } }; // Other params can be added similarly by just adding comma like { params: { q: inputByUser , year : 1997 , genre : comedy} };
  // console.log(response); // Check this response you'll find in the response.data it returns a array contains JS objects of all the shows by the name you search for.
  const response = await axios.get(
    "http://api.tvmaze.com/search/shows",
    queryStringData // This query string data will automatically be appended when the get request is sent.
  );
  //   console.log(response); // Just checking if it works or not.
  // Since the response.data is an array of JS object literals containing shows information we can send this array to a seperate functionn and display all the images.
  displayAllTvShowImages(response.data);
});

// Displays all the images of all the TV shows you got with that query.
const displayAllTvShowImages = (tvShowsArray) => {
  clearPreviousQueryImages(); // If a new request is made first remove all the old images present in the body.
  for (let currTvShow of tvShowsArray) {
    console.log(currTvShow);
    if (currTvShow.show.image) {
      // This if statement is cause the API doesn't contain images for some shows so there it won't have the value for this property and we won't get inside this if condition.
      const currTvShowImgSrc = currTvShow.show.image.medium;
      const newImg = document.createElement("img");
      console.log(currTvShowImgSrc);
      newImg.src = currTvShowImgSrc;
      document.body.append(newImg);
      // For every image that's being shown on my page right now i've added a eventListner to it which says when i'm clicked upon take me to the link of this tv show on tvmaze.com site.
      newImg.addEventListener('click',function(){
        // console.log(currTvShow.show.url);
        window.open(currTvShow.show.url); // Before doing this i was doing window.location = currTvShow.show.url that would take my current window to the newPage and i would lose all my search results doing it this way opens a new tab to open the link.
      })
    }
  }
};

// Clears all the images from the body if any are presently shown if no images are shown like when you make your first request this function does nothing.
const clearPreviousQueryImages = () => {
  const allImgELements = document.querySelectorAll("body img");
  //console.log(allImgELements);
  for (let currImgElement of allImgELements) {
    currImgElement.remove();
  }
};
