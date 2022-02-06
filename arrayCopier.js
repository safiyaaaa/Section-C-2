// Arrays are a mutable datatype which basically means it can be changed without fundamentally changing what array we are referring to

// Imagine an array is a box. When we change things in the array all we are doing is taking things in and out of the box.

// Try running this code
var a = [1,2,3]
var b = [1,2,3]
//var b = a
b[0] = 4
//From research I fixed this error by instansiating b by doing so I created a separate memory to a, previously var b = a refers to the same place in memory. The operator = should not be used as it only works on immutable data types eg. strings, integers where as an array is a mutable data type

// You might expect the below to output [1,2,3], [4,2,3]
console.log(a, b)

// But it actually ouputs [4,2,3], [4,2,3]
// This is because when we create array b we aren't creating a new box we are just getting array b to point to the same box as array a. This means when we change array a or b with change the other one as well.

// Assignment

function arrayCopier(myArray) {
  if(Array.isArray(myArray) == false) {
    throw new TypeError('Invalid data type detected');
  }//isArray() JavaScript method checks whether an object is an array or not, if it is it returns true if the value is an array otherwise returns false
  let newArray = []
  for (let i=0; i<myArray.length; i++) {
    newArray.push(myArray[i])
  }
  return newArray
}


// Write a series of tests to check the functionality of this code

// We don't expect you to fix bugs but can you please include any tests that might fail and explain in comments why the tests are failing and how you would go about fixing the code

module.exports = arrayCopier

