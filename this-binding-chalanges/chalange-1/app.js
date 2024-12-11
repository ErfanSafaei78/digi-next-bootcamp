// Challenge 1
// What is the output? Fix it so it prints "Hello, my name is Alice".
// Try to use call, bind, or apply methods to call the greetFunction
const person = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// const greetFunction = person.greet; -> Hello, my name is
const greetFunction = person.greet.bind(person);

greetFunction();
