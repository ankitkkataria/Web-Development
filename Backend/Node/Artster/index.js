const figlet = require("figlet");
const colors = require("colors");
figlet("Ankit Kataria!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data.cyan); // .cyan what it will do is whatever is console.logged by this line here it will change it's color to cyan color.
});
