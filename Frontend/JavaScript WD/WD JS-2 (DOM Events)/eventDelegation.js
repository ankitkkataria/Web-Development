// Goal :- See your job is to make sure that when a li whether that be on the page before you started adding new tweets or if it comes after it should be deleted as soon as you click on it.

// To do the above thing the for loop below is not enough bcz it only looks at the li's that are on the page before we started adding new li's as tweets or it only looks at li's that were present in the past it can't add a eventListner to new tweets that will be added later.
// const allLis = document.querySelector('li');
// for(let li of allLis) {
//     li.addEventListener('click',function(){
//         li.remove();
//     })
// }

const tweetForm = document.querySelector("#tweetForm");
const tweetsContainer = document.querySelector("#tweets");
tweetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = "";
  tweetInput.value = "";
});

const addTweet = (username, tweet) => {
  const newTweet = document.createElement("li");
  // newTweet.addEventListener('click',function(){  // One simple way of doing what we want is as and when we create a new li just add a event listener right then and there obviously this just takes care of all the future li's for the past one you'd still have to keep the loop.
  //     newTweet.remove();
  // })
  const bTag = document.createElement("b");
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(`- ${tweet}`);
  tweetsContainer.append(newTweet);
};

// Event Delegation :- In simple terms it means putting a eventListner on a parent and then being able to check what child that event occurred on using the eventObject.target property and then taking an action appropriately.
//                     So, Event Delegation can be used when you know the parent of something won't be changing but the childrern may be changing so you put a event Listener on that and check using event.Nodename on what child that event happened and then use event.target to access it.
//                     It is possible to put a event listener on the body itself and then check what element was clicked on and go in depth but it's really impractical so people don't use it.
tweetsContainer.addEventListener("click", function (e) {
  // Here i'm adding a eventListner to the unordered list(ul) itself and then i'm using the eventObject.target to check if the click actually happend on a li in that case just go ahead and remove the li.
  if (e.target.nodeName === "LI") { // e.target.nodeName gives you a capitalized string that tells you what was the element in the parent that was actually clicked.
    e.target.remove(); // This is so we don't remove paragraphs or any other elements that might be present in the parent element.
  }
  // e.target.nodeName === 'LI' && e.target.remove();
});
