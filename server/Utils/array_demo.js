const array = [1, 2, 3, 4, 5, 6]; // 0,1,2,3,4,5

function multipleByTwo(x) {
  return x * 2;
}


// MAP FUNCTION
let twoFer = [];
for (let i=0; i < array.length, i+=1) {
    const arrayElemenetTimesTwo = multiplyByTwo(array[i])
    twoFer.push(arrayElementTimesTwo);
}
console.log(twoFer);
// [2, 4, 6, 8, 10, 12]

// FILTER FUNCTION
let newFer = [];
for (let i=0; i < array.length, i+=1) {
    if(array[i]%3 === 0) {
        newFer.push(arrayElementTimesTwo);
    }
}