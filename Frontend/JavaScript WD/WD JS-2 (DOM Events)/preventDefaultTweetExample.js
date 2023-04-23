const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');
tweetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // const usernameInputObject = document.querySelectorAll('input')[0];
    // const tweetInputObject = document.querySelectorAll('input')[1];
    const usernameInputObject = tweetForm.elements.username; // This is a better way of selecting inputs from a form as the form itself contains a elements object each element in the form is either a input or button top to down.
    const tweetInputObject = tweetForm.elements.tweet;
    addTweet(usernameInputObject.value, tweetInputObject.value)
    usernameInputObject.value = '';
    tweetInputObject.value = '';
});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li'); // Creates <li></li>
    const bTag = document.createElement('b'); // Creates <b></b>
    bTag.append(username) // Puts username string in between bold tags :- <b>usernameString</b>
    newTweet.append(bTag); // Puts this entire bold tag element in between li tags :- <li><b>usernameString</b></li>
    newTweet.append(`- ${tweet}`) // Puts the tweetString text in this li again we could also have used innerText as well <li><b>usernameString</b>newTweetString(This contains the actual tweet here)</li>
    tweetsContainer.append(newTweet); // Putting the entire li we have formed uptil now in between ul tags <ul><li><b>usernameString</b>newTweetString(This contains the actual tweet here)</li></ul>
}

