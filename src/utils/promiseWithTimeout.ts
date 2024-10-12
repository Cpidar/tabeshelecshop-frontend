export function PromiseWithTimeout<T> (millis: number, promise: Promise<T>): Promise<T | unknown> {
    let timeoutPid;
    const timeout = new Promise((resolve, reject) =>
        timeoutPid = setTimeout(
            () => reject(`Timed out after ${millis} ms.`),
            millis));
    return Promise.race([
        promise,
        timeout
    ]).finally(() => {
        if (timeoutPid) {
            clearTimeout(timeoutPid);
        }
    });
  };