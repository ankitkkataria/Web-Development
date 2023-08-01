// In this file we will learn about how to selectively render something in a component.
// First way just a simple game if you get same number you show you win otherwise you show you lose.
// export default function DoubleDice() {
//   const num1 = Math.floor(Math.random() * 3) + 1;
//   const num2 = Math.floor(Math.random() * 3) + 1;
//   const res = num1 === num2 ? You Win! : You Lose :(; // If condition is true first thing is returned otherwise the second thing is returned.
//   return (
//     <div>
//       <h3>{res}</h3> {/* If you have to always so something like above h3 you can do it this way.*/}
//       <p>Num1: {num1}</p>
//       <p>Num2: {num2}</p>
//     </div>
//   );
// }

// Second way
// export default function DoubleDice() {
//   const num1 = Math.floor(Math.random() * 3) + 1;
//   const num2 = Math.floor(Math.random() * 3) + 1;
//   return (
//     <div>
//       <h3>{num1 === num2 ? You Win! : You Lose :(}</h3> {/* If you have to always so something like above h3 you can do it this way.*/}
//       <p>Num1: {num1}</p>
//       <p>Num2: {num2}</p>
//     </div>
//   );
// }

// See till above you always wanted to show something like either win or lose message but if you want to so you won only in the case that you won in case you lost you wanna show nothing you might try doing this.
// export default function DoubleDice() {
//   const num1 = Math.floor(Math.random() * 3) + 1;
//   const num2 = Math.floor(Math.random() * 3) + 1;
//   return (
//     <div>
//       <h3>{num1 === num2 ? You Win! : ""}</h3> {/* Rendering a empty string in h3 if we lose. */}
//       <p>Num1: {num1}</p>
//       <p>Num2: {num2}</p>
//     </div>
//   );
// } // See this method will surely work but the problem is you will render a lot of unnecessary empty h3s and that can easily start to clutter everything.

// So one way to save your self from cluttering is to render is intead of always rendering a h3 and hiding the h3 by passing in a empty string rather than that just render the h3 itself only in the case that your condition is true.
// export default function DoubleDice() {
//   const num1 = Math.floor(Math.random() * 3) + 1;
//   const num2 = Math.floor(Math.random() * 3) + 1;
//   return (
//     <div>
//       {num1 === num2 ? <h3>You Win!:</h3> : null} {/* I render a h3 only in the case this condition happens to be true otherwise I render nothing */}
//       <p>Num1: {num1}</p>
//       <p>Num2: {num2}</p>
//     </div>
//   );
// }

// Other way of achieving the same thing we did above is using the shortcircuiting property of &&.
export default function DoubleDice() {
  const num1 = Math.floor(Math.random() * 3) + 1;
  const num2 = Math.floor(Math.random() * 3) + 1;
  return (
    <div>
      {num1 === num2 && <h3>You Win!</h3>} 
      {/* If the condition is not true the h3 statement will never be executed otherwise it will be executed. */}
      <p>Num1: {num1}</p>
      <p>Num2: {num2}</p>
    </div>
  );
}
