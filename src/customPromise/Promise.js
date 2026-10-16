class CustomPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      if (value === this) {
        reject(new TypeError("Chaining cycle detected"));
        return;
      }

      if (value && typeof value.then === "function") {
        value.then(
          (value) => resolve(value),
          (reason) => reject(reason),
        );
        return;
      }
      this.state = "fulfilled";
      this.value = value;
      this.flush();
    };
    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.reason = reason;
      this.flush();
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      // if the original promise executor runs into some error we reject the original promise itself
      reject(err);
    }
  }
  runHandlers({ onFullFilled, onRejected, resolveNext, rejectNext }) {
    try {
      if (this.state === "fulfilled") {
        if (onFullFilled) {
          const result = onFullFilled(this.value);
          resolveNext(result);
        } else {
          resolveNext(this.value);
        }
      } else {
        // this.state === 'rejected case
        if (onRejected) {
          const result = onRejected(this.reason);
          resolveNext(result);
        } else {
          rejectNext(this.reason);
        }
      }
    } catch (err) {
      rejectNext(err);
    }
  }
  then(onFullFilled, onRejected) {
    return new CustomPromise((resolveNext, rejectNext) => {
      if (this.state === "pending") {
        this.callbacks.push({
          onFullFilled,
          onRejected,
          resolveNext,
          rejectNext,
        });
      } else {
        queueMicrotask(() => {
          this.runHandlers({
            onFullFilled,
            onRejected,
            resolveNext,
            rejectNext,
          });
        });
        // run directly the mircotask as the original promise is already fullfilled or rejected
      }
    });
  }

  flush() {
    if (this.state === "pending") return;
    const waitings = this.callbacks;
    this.callbacks = [];

    waitings.forEach(
      ({ onFullFilled, onRejected, resolveNext, rejectNext }) => {
        queueMicrotask(() => {
          this.runHandlers({
            onFullFilled,
            onRejected,
            resolveNext,
            rejectNext,
          });
        });
      },
    );
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        if (onFinally) {
          const result = onFinally();
          if (result && typeof result.then === "function") {
            return result.then(() => value);
          }
        }
        return value;
      },
      (reason) => {
        if (onFinally) {
          const result = onFinally();
          if (result && typeof result.then === "function") {
            return result.then((res) => {
              throw reason;
            });
          }
          throw reason;
        } else {
          throw reason;
        }
      },
    );
  }
}
