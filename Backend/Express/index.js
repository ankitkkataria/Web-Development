const express = require("express");
const app = express(); // When express is called it returs an object that we're storing in app which will contain all the methods we will need for setting up servers and providing responses.
// console.log(app);

app.listen(3000, () => { // This just starts a server at port 3000 and starts listening for requests and whenever a server is started the method inside is called.
  console.log("Listening on port 3000");
});

app.use(() => { // app.use runs the method inside whenever we get a new request on the server that's listening for requests.
  console.log("We got a new request!!!");
});

// You can now run this file using node index.js and you'll see Listening on port 3000 that means your server has started and is listening on
// port 3000 this server is set up on your local machine now inorder to send requests to it open up chrome and type localhost:3000 and everytime
// you refresh that page you're basically sending a reqeust to this server and that's when the method inside app.use will run and you'll see your
// console print out We got a new request!!! 

