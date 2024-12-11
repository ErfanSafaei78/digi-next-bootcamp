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
