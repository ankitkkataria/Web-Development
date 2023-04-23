// function random(maxNum){ // This is our first function that returns a random number from 1 to maxNum.
//     return Math.floor(Math.random()*maxNum)+1;
// }

// for(let i = 0 ; i < 1000 ; i++){ // Printing 1000 random numbers between 1 to 100.
//     // console.log(random(100));
// }

// function concatinateString(str,numTimes){
//     let res = "";
//     for(let i = 0 ; i < numTimes ; i++)
//         res = res + str; // res += str;
//     return res;
// }

// let newString = concatinateString("yo boi ",5);
// console.log(newString);

// let sum = function (x, y) {
//   return x + y;
// };


const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

// let total = 0;
// for (let price of prices) {
//     total += price
// }
// console.log(total)

let total = 0;
total = prices.reduce(function(acc, price){
    console.log("The acc is ");
    console.log(acc);
    console.log("The price is ");
    console.log(price);
    return acc + price
})

// const total = prices.reduce((total, price) => total + price)

// const minPrice = prices.reduce((min, price) => {
//     if (price < min) {
//         return price;
//     }
//     return min;
// })

// const movies = [
//     {
//         title: 'Amadeus',
//         score: 99,
//         year: 1984
//     },
//     {
//         title: 'Sharknado',
//         score: 35,
//         year: 2013
//     },
//     {
//         title: '13 Going On 30',
//         score: 70,
//         year: 2004
//     },
//     {
//         title: 'Stand By Me',
//         score: 85,
//         year: 1986
//     },
//     {
//         title: 'Waterworld',
//         score: 62,
//         year: 1995
//     },
//     {
//         title: 'Jingle All The Way',
//         score: 71,
//         year: 1996
//     },
//     {
//         title: 'Parasite',
//         score: 95,
//         year: 2019
//     },
//     {
//         title: 'Notting Hill',
//         score: 77,
//         year: 1999
//     },
//     {
//         title: 'Alien',
//         score: 90,
//         year: 1979
//     }
// ]

// const highestRated = movies.reduce((bestMovie, currMovie) => {
//     if (currMovie.score > bestMovie.score) {
//         return currMovie;
//     }
//     return bestMovie;
// })


// // We can provide an initial value as the 2nd arg to reduce:
// const evens = [2, 4, 6, 8];
// evens.reduce((sum, num) => sum + num) //20
// evens.reduce((sum, num) => sum + num, 100) //120
