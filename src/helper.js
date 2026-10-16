// trailing;
export function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = undefined;
      fn.apply(this, args);

      // in debounce the call happens when the window closes that's why we do timerId = undefined first and then execute the fucntion
    }, delay);
  };
}

// trailing + leading

export function debounceLeadingTrailing(fn, delay) {
  let timerId;

  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
      }, delay);
      fn.apply(this, args);
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        timerId = undefined;
        fn.apply(this, args);
      }, delay);
    }
  };
}

// trailing + leading + maxwait

export function godLevelDebounce(fn, delay, maxDelay) {
  let timerId;
  let maxTimerId;
  let latestThis, latestArgs;
  let hasTrailing = false;

  return function (...args) {
    latestThis = this;
    latestArgs = args;
    if (!maxTimerId) {
      maxTimerId = setTimeout(() => {
        maxTimerId = undefined;
        if (hasTrailing) {
          hasTrailing = false;
          fn.apply(latestThis, latestArgs);
        }
        // now since the maxDelay won we have to reset the delay
      }, maxDelay);
    }
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
        // Why here? If this timer finishes, no additional call arrived during the quiet period.
        // The burst is over, so its max timer has no remaining purpose.
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
      }, delay);
      fn.apply(this, args);
    } else {
      hasTrailing = true;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        timerId = undefined;
        hasTrailing = false;
        fn.apply(this, args);
        // now since the delay won we have to reset the maxDelay
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
      }, delay);
    }
  };
}

// case 1
// delay = 300 ms
// maxWait = 1000 ms

// 0 ms:    search("cat") → executes immediately
// 300 ms:  quiet period ends
// 1000 ms: nothing executes

export function learningGodLevelDebouncing(fn, delay, maxDelay) {
  let timerId, maxTimerId, latestArgs, latestThis;
  return function (...args) {
    latestArgs = args;
    latestThis = this;
    if (!maxTimerId) {
      maxTimerId = setTimeout(() => {
        maxTimerId = undefined;
      }, maxDelay);
    }
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
      }, delay);
      fn.apply(latestThis, latestArgs);
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        timerId = undefined; // i have fired
        clearTimeout(maxTimerId); // Don’t let the other callback fire.
        maxTimerId = undefined; // Remember that it’s cancelled.
        fn.apply(latestThis, latestArgs);
      }, delay);
    }
  };
}

// Now case 3: max timer wins:

export function learningGodLevelDebouncingddsd(fn, delay, maxDelay) {
  let timerId, maxTimerId, latestArgs, latestThis;
  let hasTrailing = true;
  return function (...args) {
    latestArgs = args;
    latestThis = this;
    if (!maxTimerId) {
      maxTimerId = setTimeout(() => {
        maxTimerId = undefined; // i ve fired

        // ----
        if (hasTrailing) {
          hasTrailing = false;
          fn.apply(latestThis, latestArgs);
        }
        // ----
      }, maxDelay);
    }
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
      }, delay);
      fn.apply(latestThis, latestArgs);
    } else {
      hasTrailing = true;
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        timerId = undefined; // i have fired
        clearTimeout(maxTimerId); // Don’t let the other callback fire.
        maxTimerId = undefined; // Remember that it’s cancelled.
        fn.apply(latestThis, latestArgs);
      }, delay);
    }
  };
}

export function finalDebounce(fn, delay, maxWait) {
  let timerId, maxTimerId, latestArgs, latestThis;
  let hasPendingCall = false; // hasTrailing

  const finalMaxWait = () => {
    maxTimerId = setTimeout(() => {
      maxTimerId = undefined;
      finalMaxWait();
      if (hasPendingCall) {
        hasPendingCall = false;
        fn.apply(latestThis, latestArgs);
      }
    }, maxWait);
  };

  return function (...args) {
    latestArgs = args;
    latestThis = this;
    if (!maxTimerId) {
      finalMaxWait();
    }

    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
      }, delay);
      fn.apply(latestThis, latestArgs);
    } else {
      hasPendingCall = true;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        timerId = undefined;
        clearTimeout(maxTimerId);
        maxTimerId = undefined;
        if (hasPendingCall) {
          hasPendingCall = false;
          fn.apply(latestThis, latestArgs);
        }
      }, delay);
    }
  };
}
