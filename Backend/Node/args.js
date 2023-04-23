console.log("HELLO FROM ARGS FILE!");
console.log(process.argv); // This sends back an array that contains first two enteries which contain information about file location after that if you enter any other things in arguments like node args.js firstArg secondArg these firstArg and secondArg will also be stored in this array that you get by using process.argv again process is a object just like document,window and other stuff.

// Now when making a command line tool you might want to use these args passed in.
// In our example we will just say hello to each argument just for a simple example.

for (let i = 2; i < process.argv.length; i++) { // Cause first two things are just locations we will skip them.
  console.log(`Hi there, ${process.argv[i]}`);
}

// Down below is another way of achieving the same thing as above.
// const args = process.argv.slice(2);
// for (let arg of args) {
//     console.log(`Hi there, ${arg}`)
// }

// console.log(process); // If you want to see what the process object looks like.

// This was just an example of how node may be used to build some command line tools this was an extremely simple example but this was kindof a hello world moment for building a command line tool actually it's much more complex.

