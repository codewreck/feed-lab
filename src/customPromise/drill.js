// Requirements
// - task1 and task2 are functions that may return a value or a Promise.
// - Execute task1 first.
// - Execute task2 only after task1 succeeds.
// - Pass task1's result into task2.
// - Return a Promise that fulfills with task2's result.
// - If either task throws or rejects, reject with that error. If task1 fails, never execute task2.

function runAfter(task1, task2) {
  return Promise.resolve(task1()).then((value) => task2(value));
}

Promise.resolve()
  .then(() => task1())
  .then((value) => task2(value));

//   Requirements
// 1. Execute primary() first.
// 2. If primary() succeeds, return its result. Do not execute backup().
// 3. If primary() throws or rejects, execute backup().
// 4. If backup() succeeds, return its result.
// 5. If backup() also throws or rejects, propagate the backup's error.
// 6. Both tasks may return synchronous values or Promises.
// 7. fallback() must always return a Promise.

// function fallback(primary, backup) {
//   // for simplicity as v1 assuming that the primary and secronday are promise functions
//   return primary().then(
//     (value) => value,
//     () => {
//       return backup();
//     },
//   );
// }

function fallback(primary, backup) {
  // for simplicity as v1 assuming that the primary and secronday are promise functions
  return Promise.resolve()
    .then(() => primary())
    .then(
      (value) => value,
      () => {
        return backup();
      },
    );
}

//   Requirements
// Requirements: Return a Promise that fulfills with undefined after approximately ms milliseconds. It must not block JavaScript execution.

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

// Requirements:
// - task is a function that may return a value, return a Promise, or throw synchronously.
// - Execute task until it succeeds or the attempt limit is reached.
// - Never exceed maxAttempts total executions.
// - Return a Promise that fulfills with the first successful result.
// - If every attempt fails, reject with the last failure reason.
// - Attempts must be sequential; no overlapping executions.

function retry(task, maxAttemps) {
  let attemptCount = 0;
  function attempt(resolve, reject) {
    attemptCount++;

    Promise.resolve()
      .then(() => task())
      .then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          if (attemptCount === maxAttemps) {
            reject(reason);
            return;
          } else {
            attempt(resolve, reject);
          }
        },
      );
  }
  return new Promise((resolve, reject) => {
    attempt(resolve, reject);
  });
}

function retryWithDelay(task, maxAttempts, delayMs) {
  let attemptCount = 0;
  function attempt(resolve, reject) {
    attemptCount++;

    Promise.resolve()
      .then(() => task())
      .then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          if (attemptCount === maxAttempts) {
            reject(reason);
            return;
          } else {
            setTimeout(() => attempt(resolve, reject), delayMs);
          }
        },
      );
  }
  return new Promise((resolve, reject) => {
    attempt(resolve, reject);
  });
}

// Drill 6 — timeout(task, ms)

// Requirements
// 1. task is a function that may return a Promise or a synchronous value.
// 2. Execute task() exactly once.
// 3. Return a Promise that:
//    - Fulfills with the task's result if it succeeds before the timeout.
//    - Rejects with the task's error if it fails before the timeout.
//    - Rejects with new Error("Timeout") if the time limit expires first.
// 4. Handle synchronous exceptions thrown by task().
// 5. Once the returned Promise settles, subsequent task or timer outcomes must not change it.
// 6. Do not attempt to cancel the underlying task when the timeout fires.

function timeout(task, timeout) {
  return new Promise((resolve, reject) => {
    let timerId = setTimeout(() => reject("Timeout"), timeout);

    // resolve(task());
    Promise.resolve()
      .then(() => task())
      .then(
        (val) => {
          clearTimeout(timerId);
          resolve(val);
        },
        (err) => {
          clearTimeout(timerId);
          reject(err);
        },
      );
  });
}

function runSequentiallyfd(tasks) {
  let results = [];
  let count = 0;

  function runNext(resolve, reject) {
    count++;
    tasks[count]().then(
      (value) => {
        results[count] = value;
        runNext(resolve, reject);
        if (count === tasks.length) {
          resolve(results);
        }
      },
      (reason) => {
        reject(reason);
      },
    );
  }

  return new Promise((resolve, reject) => {
    runNext(resolve, reject);
  });
}

function runSequentially(tasks) {
  if (tasks.length === 0) {
    return new Promise.resolve();
  }
  let runCount = 0;
  const results = [];
  function runNext(resolve, reject) {
    tasks[runCount]().then(
      (value) => {
        results[runCount] = value;
        if (runCount === tasks.length - 1) {
          resolve(results);
          return;
        }
        runCount++;
        runNext(resolve, reject);
      },
      (reason) => {
        reject(reason);
      },
    );
  }
  return new Promise((resolve, reject) => {
    runNext(resolve, reject);
  });
}

function runSequentially(tasks) {
  if (tasks.length === 0) {
    return Promise.resolve();
  }
  let runCount = 0;
  const results = [];
  function runNext(resolve, reject) {
    Promise.resolve()
      .then(() => tasks[runCount]())
      .then(
        (value) => {
          results[runCount] = value;
          if (runCount === tasks.length - 1) {
            resolve(results);
            return;
          }
          runCount++;
          runNext(resolve, reject);
        },
        (reason) => {
          reject(reason);
        },
      );
  }
  return new Promise((resolve, reject) => {
    runNext(resolve, reject);
  });
}

function mapAsyncLimit(tasks, size) {
  const results = [];
  let completed = 0;
  let nextQueueTask = 0;

  function runTask(i, resolve, reject) {
    if (i >= tasks.length) return;
    nextQueueTask++;

    tasks[i]().then(
      (value) => {
        results[i] = value;
        if (completed === tasks.length - 1) {
          resolve(results);
          return;
        }
        completed++;
        runTask(nextQueueTask, resolve, reject);
      },
      (reason) => reject(reason),
    );
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      runTask(i, resolve, reject);
    }
  });
}

function mapAsyncLimit(items, mapper, size) {
  const results = [];
  let completed = 0;
  let nextQueueTask = 0;
  let hasFailed = false;

  function runTask(i, resolve, reject) {
    if (i >= items.length || hasFailed) return;
    nextQueueTask++;

    Promise.resolve()
      .then(() => {
        if (hasFailed) {
          return;
        }
        return mapper(items[i]);
      })
      .then(
        (value) => {
          if (hasFailed) return;

          results[i] = value;
          if (completed === items.length - 1) {
            resolve(results);
            return;
          }
          completed++;
          !hasFailed && runTask(nextQueueTask, resolve, reject);
        },
        (reason) => {
          hasFailed = true;
          reject(reason);
        },
      );
  }

  return new Promise((resolve, reject) => {
    if (items.length == 0) {
      resolve([]);
      return;
    }
    for (let i = 0; i < size; i++) {
      runTask(i, resolve, reject);
    }
  });
}

// Drill 9 — memoizeAsync()
// Difficulty: Medium · Promise caching, closures, request deduplication
// This is particularly useful for frontend applications where multiple components might request the same API data simultaneously.

// Implement a function memoizeAsync(fn) that takes an asynchronous function and returns a memoized version of it.

function memoizeAsync(fn) {
  let cache = new Map();
  return function (...args) {
    const myarg = args[0];
    if (cache.has(myarg)) return cache.get(myarg);
    else {
      const a = new Promise((resolve, reject) => {
        resolve(fn.apply(this, args));
      }).then(null, (reason) => {
        cache.delete(myarg);
        throw reason;
      });
      cache.set(myarg, a);
      return a;
    }
  };
  // Your implementation
}
