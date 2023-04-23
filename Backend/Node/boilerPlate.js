// This code when ran like node FolderName it will create a folder by that folderName in the directory node was called upon and put three files index.html, app.css and app.js in that folder.

const fs = require("fs"); // This is basically equivalent to #include <filesystem.h>
// Now what the above line does is it make a fs object and stores it in the LHS variable above whose name is fs.
// console.log(fs);

const folderName = process.argv[2] || "Project"; // This will store the folderName entered in folderName if no folderName is entered a folder by the name Project will be created.

// fs.mkdir("Dogs", (err) => { // This is the async version of this function so it will run in the background and your program won't stop here until this directory creation isn't finished so the line console.log('Outside callback') will run first and then console.log("Inside callback") will run.
//   console.log("In the callback");
//   if (err) throw err;
// });

// console.log("Outside callback");

// But async method here might not be useful cause what if you want to create a folder and then put a file in it and if you use both the async functions what if the file is created first and then the folder it will lead to issues so we will use synchronus functions here so until a command is finished we won't move forward.

try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`, "");
  fs.writeFileSync(`${folderName}/app.css`,"");
  fs.writeFileSync(`${folderName}/app.js`,"");
} catch (e) {
  console.log("Something Went Wrong");
  console.log(e);
} 

// Just try doing node boilerPlate.js randomFolderName and you'll see it generates a boilerPlate folder of that name.
