// Challenge 1
// Try to implement the createCounter function in a way that every function call should return the +1 value of the previous value.
// Alos, it should takes the initial value as the parameter. E.G: if the initial value is 10, first function call would be 10, the second would be 11, and so on.
function createCounter(initialValue) {
  // implement here
  let counter = initialValue;

  return () => {
    counter++;
    return counter;
  };
}
const counter = createCounter(0);
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3