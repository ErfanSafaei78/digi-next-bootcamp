/***** This Binding Challenges ******/

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

// Challenge 2
// Why the value of this in the inner regular function is undefined and it's pointing to window? try to figure it out
// Also, fix the code in a way that the regularFunction returns the obj.value instead of window.value !
const obj = {
  value: 42,
  getValue: function () {
    const arrowFunction = () => this.value;
    function regularFunction() {
      return this.value;
    }
    console.log("Arrow:", arrowFunction());
    //console.log("Regular:", regularFunction()); cuz regularFunction is a standalone regular function and not wrapped by an object
    console.log("Regular:", regularFunction.call(this));
  },
};

obj.getValue();

// Challenge 3
// Try to fix the code in a way that introduce function logs the someone.name value.
function introduce(language) {
  console.log(`Hi, I'm ${this.name}, and I love ${language}.`);
}

const someone = { name: "Bob" };
introduce.call(someone, "JavaScript"); // Only change this line

/***** Closure Challenges ******/

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

// Challenge 2
// Try to implement a function named secretValue which takes the initival value as ther parameter.
// It should has 2 methods named getSecret and setSecret and should work correctly by changing the secret and getting it.

function secretVault(initVal) {
  // implmenent here
  let secretValue = initVal;

  function setSecret(value) {
    secretValue = value;
  }

  function getSecret() {
    return secretValue;
  }

  return {
    setSecret,
    getSecret,
  };
}

const vault = secretVault("initial");
console.log(vault.getSecret()); // "initial"
vault.setSecret("new secret");
console.log(vault.getSecret()); // "new secret"

/********  Promise Challenges ********/

// Challenge 1
// Implement a function named PromiseAll, it should works as same as the Promise.all methods

function PromiseAll(promises) {
  // Your implementation

  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"));
    }

    if (promises.length === 0) {
      resolve([]);
    }

    const result = [];
    let resolvedCounter = 0;
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          resolvedCounter++;
          result[index] = value;
        })
        .catch((e) => {
          reject(
            new Error(`Promise Rejected in index ${index} with error: ${e}`)
          );
        })
        .finally(() => {
          if (resolvedCounter === promises.length) {
            resolve(result);
          }
        });
    });
  });
}

const promises = [
  Promise.resolve("value 1"),
  Promise.resolve("value 2"),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("value 3"), 3000);
  }),
  Promise.resolve("value 4"),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("value 5"), 1000);
  }),
];
PromiseAll(promises)
  .then((values) => console.log(values))
  .catch((e) => console.error(e)); // should log ['value 1', 'value 2', 'value 3', 'value 4', 'value 5']

// Challenge 2
// Implement the awaitingPromise function. it takes array of promises and returns the correct value
// You may need to read about Array.prototype.forEach, Object.assign(), Object speard operator
const promiseArray = [
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ res1: "reponse 1" });
      }, 100);
    }),

  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ res2: "reponse 2" });
      }, 100);
    }),

  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ res3: "reponse 3" });
      }, 100);
    }),
];

function awaitingPromise(promises) {
  // Implement here

  return PromiseAll(promises.map((item) => item())).then((res) => {
    const result = {};
    res.forEach((item) => Object.assign(result, item));
    return result;
  });
}

awaitingPromise(promiseArray).then((res) => {
  console.log(res); // res should be { res1: 'response 1', res2: 'response 2', res3: 'response 3' }
});

// Resource
// Read the following repository code and try to figure it out how does it work with promises
// https://github.com/Donaldcwl/browser-image-compression/blob/master/lib/utils.js
