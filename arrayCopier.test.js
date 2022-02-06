const arrayCopier = require('./arrayCopier');

//ArrayCopier test plan located in the AC Test Plan.pdf file attached within the replit

//Correctness test suite
describe('1. arrayCopier test suite', () => {//As each value has a unique output all values are tested to confirm accuracy 
  test(' 1.1 Confirm old arrays with numbers is equal ', () => {
    var oldArray = [1,5]
    var newArray = arrayCopier(oldArray)
    newArray[0] = 7
    expect(oldArray).toEqual([1,5]);//This test case uses .toEqual from the Jest framework as arrays are mutable data types there for .toBe would not accurately compare
  });

  test(' 1.2 Confirm new array with numbers is not equal to old array ', () => {
    var oldArray = [1,90]
    var newArray = arrayCopier(oldArray)
    newArray[0] = 55
    expect(oldArray).not.toEqual(newArray);//This assertion was intentional to pass the test case, check the arrayCopier.js file explaining the error in the code 
  });

  test(' 1.3 Confirm old arrays with strings is equal ', () => {
    var oldArray = ['stars', 'moon', 'sun']
    var newArray = arrayCopier(oldArray)
    newArray[2] = "pluto"
    expect(oldArray).toEqual(['stars', 'moon', 'sun']);
  });

  test(' 1.4 Confirm new array with strings is not equal to old array ', () => {
    var oldArray = ['flame', 'candle', 'wax']
    var newArray = arrayCopier(oldArray)
    newArray[0] = "match"
    expect(oldArray).not.toEqual(newArray);
  });
});


//Reliability test suite
describe('2. Testing accuracy of array ', () => {
  test('2.1 Arrays accuracy with strings input ', () => {
    var oldArray = ['hello', 'hi']
    expect(oldArray).toStrictEqual(['hello', 'hi']);
  });//toStrictEqual from the Jest framework simultaneously checks inputs are equal to output and of the same data type, in this case I want to check oldArray is always an array data type and accurate
  test('2.2 Arrays accuracy with integer input', () => {
    var oldArray = [7000, 3]
    expect(oldArray).toStrictEqual([7000, 3]);
  });
});

//Robustness test suite
describe('3. ArrayCopier Error guessing ', () => {
  
  test('3.1 Checks old arrays with different data types is equal', () => {
    var oldArray = [[2,6,6], 'jest', false, [1,5,5]]
    var newArray = arrayCopier(oldArray)
    newArray[2] = 'framework'
    expect(oldArray).toEqual([[2,6,6], 'jest', false, [1,5,5]]);
    //expect(oldArray).not.toEqual(newArray);
  });

  test('3.2 Checks new array with different data types is not equal to old array', () => {
    var oldArray = [[2,6,6], 'jest', false, [1,5,5]]
    var newArray = arrayCopier(oldArray)
    newArray[3] = true
    expect(oldArray).not.toEqual(newArray);
  });//Test cases 3.1 and 3.2 pass as the requirements in arrayCopier.js file do not clarify if other data types can be passed so through assumption I have accepted them in tests

  test(' 3.3 Multidimensional old arrays are equal ', () => {
    var oldArray = [[8,9,3], [4,2,1], [5,7,8]]
    var newArray = arrayCopier(oldArray)
    newArray[1] = [1,1,1]
    expect(oldArray).toEqual([[8,9,3], [4,2,1], [5,7,8]]);
  });

  test(' 3.4 Multidimensional new array is not equal to old array ', () => {
    var oldArray = [[0,9,0], [1,1,1], [5,5,1]]
    var newArray = arrayCopier(oldArray)
    newArray[2] = [2,2,2]
    expect(oldArray).not.toEqual(newArray);
  });

  test.each([ 
      [{value: 22}, TypeError('Invalid data type detected')],
      [ true, TypeError('Invalid data type detected')], 
      [ null, TypeError('Invalid data type detected')],
      [undefined, TypeError('Invalid data type detected')],
      [150.001, TypeError('Invalid data type detected')],
      [ , TypeError('Invalid data type detected')],
    ])(' 3.5 Other data types and no argument give error ', (a, expected) => {
      expect(() => arrayCopier(a)).toThrow(expected);//This test case initially failed to fix it I added an if statement to the arrayCopier function within the arrayCopier.js file if(Array.isArray(myArray) == false) { throw new TypeError('Invalid data type detected'); } as error is an appropriate output in htese cases, furthur explanation for use of .isArray() JavaScript method is commented in the arrayCopier.js file
  });//The test.each syntax is based of the Jest framework, enabling all tests to be ran individually. Initally I had stacked four expect statements(assertions .toThrow). In doing so only one test title would show in my shell, signifying only one test has been ran instead of passing all four individual tests, this format reduces dublication in my testing by nesting them
  
  test(' 3.6 Confirm old array with varied lengths of multidimensional arrays is equal', () => {
    var oldArray = [[7,7,7,7], [5, 5, 1], [1,9], [1], []]
    var newArray = arrayCopier(oldArray)
    newArray[0] = 'changed'
    expect(oldArray).toEqual([[7,7,7,7], [5, 5, 1], [1,9], [1], []]);
    expect(oldArray).not.toEqual(newArray);
  });

  test(' 3.7 Confirm new array with varied lengths of multidimensional arrays is not equal to old array', () => {
    var oldArray = [[], [5, 5], [0, 9, 9], [0, 0, 0,0]]
    var newArray = arrayCopier(oldArray)
    newArray[6] = 'changed'
    expect(oldArray).not.toEqual(newArray);
  });

//Commented test below fails, uncomment to test, the test case shows how I'd approach further robustness tests testing when an an integer within a multidimensional test is changed

  // test(' 3.8 Check old array is equal when more than one item is changed in multidimensional-array', () => {
  //   var oldArray = [[8,9,3], [4,2,1], [5,7,8]]
  //   var newArray = arrayCopier(oldArray)
  //   newArray[0][1] = 88
  //   expect(oldArray).toEqual([[8,9,3], [4,2,1], [5,7,8]]);
  // });

  // test(' 3.9 Check new array is not equal to old array when more than one item is changed in multidimensional-array', () => {
  //   var oldArray = [[8,9,3], [4,2,1], [5,7,8]]
  //   var newArray = arrayCopier(oldArray)
  //   newArray[1][0] = 23//Aim would be for the outbut of newArray to equal [[8,9,3], [23,2,1], [5,7,8]]
  //   expect(oldArray).not.toEqual(newArray);
  // });
  
});

//Please check the AC Test Plan .pdf file that I attached to this replit to give an in depth insight to my testing approach

//To furthur confirm completeness I used https://htmlpreview.github.io/ and added the github URL of this replitgenerated in Version control
