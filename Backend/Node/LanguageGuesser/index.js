import { createRequire } from "module";
const require = createRequire(import.meta.url);
// The above two lines of code are needed in order to be able to use both import and require in the same file.
// Also before this step inorder to be able to use import here you should add a line  "type": "module" in the package.json file.
import { franc } from "franc";
const langs = require("langs");
const colors = require("colors");

const input = process.argv[2];
const langCode = franc(input); // This will give me the code for the language provided to me in the input.

if (langCode === "und") {
  console.log(
    "Sorry,Couldn't figure out what language you entered! Try again with more sample text"
      .red
  );
} else {
  const language = langs.where("3", langCode);
  console.log(`We think the language you entered is ${language.name}`.green);
}
