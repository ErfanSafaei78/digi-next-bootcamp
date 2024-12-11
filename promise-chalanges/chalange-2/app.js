// Challenge 2
// Implement the awaitingPromise function. it takes array of promises and returns the correct value
// You may need to read about Array.prototype.forEach, Object.assign(), Object speard operator

// a reference from challenge 1 :))
function PromiseAll(promises) {
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
