// Without promises the rainbow function

// const delayedColorChange = (newColor, delay, doNext) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;
//     doNext && doNext();
//   }, delay);
// };

// delayedColorChange("red", 1000, () => {
//   delayedColorChange("orange", 1000, () => {
//     delayedColorChange("yellow", 1000, () => {
//       delayedColorChange("green", 1000, () => {
//         delayedColorChange("blue", 1000, () => {
//           delayedColorChange("indigo", 1000, () => {
//             delayedColorChange("violet", 1000, () => {});
//           });
//         });
//       });
//     });
//   });
// });

const delayedColorChange = (newColor, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = newColor;
      resolve(); // Now if any .then() methods are waiting on this returned promise will be executed.
    }, delay);
  });
};

// delayedColorChange("red", 1000)
//   .then(() => {
//     return delayedColorChange("orange", 1000);
//   })
//   .then(() => {
//     return delayedColorChange("yellow", 1000);
//   })
//   .then(() => {
//     return delayedColorChange("green", 1000);
//   })
//   .then(() => {
//     return delayedColorChange("blue", 1000);
//   })
//   .then(() => {
//     return delayedColorChange("indigo", 1000);
//   })
//   .then(() => {
//     return delayedColorChange("violet", 1000);
//   });

// Since we can even use the inline return statement we can make that code even shorter

delayedColorChange("red", 1000)
  .then(() => delayedColorChange("orange", 1000))
  .then(() => delayedColorChange("yellow", 1000))
  .then(() => delayedColorChange("green", 1000))
  .then(() => delayedColorChange("blue", 1000))
  .then(() => delayedColorChange("indigo", 1000))
  .then(() => delayedColorChange("violet", 1000));
