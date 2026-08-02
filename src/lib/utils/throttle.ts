// biome-ignore lint/suspicious/noExplicitAny: explain
type AnyFunction = (...args: any[]) => any;

type ThrottledFunction<T extends AnyFunction> = ((
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
  flush: () => void;
};

/**
 * Creates a throttled version of `fn` that invokes at most once per `delay` milliseconds.
 *
 * The throttled function runs immediately on the leading edge. If it is called
 * again while the throttle window is active, a trailing invocation is scheduled
 * for the end of the window. The trailing invocation uses the latest arguments
 * and the latest `this` context.
 *
 * @template T - The type of the function being throttled.
 *
 * @param fn - The function to throttle.
 * @param delay - The minimum time in milliseconds between invocations.
 *
 * @returns A throttled function that also exposes `cancel` and `flush` methods.
 *
 * @remarks
 * - The first call is invoked immediately.
 * - Subsequent calls within the throttle window do not invoke `fn` immediately.
 * - If calls occur during the throttle window, the trailing call uses the most
 *   recent arguments and `this` value.
 * - `cancel()` prevents any pending trailing invocation.
 * - `flush()` immediately invokes any pending trailing invocation.
 *
 * @example
 * Basic usage:
 * ```ts
 * const onScroll = throttle(function (this: Window) {
 *   console.log(this.scrollY);
 * }, 200);
 *
 * window.addEventListener("scroll", onScroll);
 *
 * // Cancel any pending trailing call.
 * onScroll.cancel();
 *
 * // Immediately run the pending trailing call, if one exists.
 * onScroll.flush();
 * ```
 */
export function throttle<T extends AnyFunction>(
  fn: T,
  delay: number
): ThrottledFunction<T> {
  let lastCall = Number.NEGATIVE_INFINITY;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: ThisParameterType<T> | undefined;

  const wait = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  const invoke = (now: number) => {
    const args = lastArgs;
    if (!args) {
      return;
    }

    const thisArg = lastThis;

    lastArgs = null;
    lastThis = undefined;
    lastCall = now;

    (fn as AnyFunction).apply(thisArg, args);
  };

  const throttled = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    lastArgs = args;
    lastThis = this;
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    if (remaining <= 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      invoke(now);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        invoke(Date.now());
      }, remaining);
    }
  } as ThrottledFunction<T>;

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = undefined;
  };

  throttled.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      invoke(Date.now());
    }
  };

  return throttled;
}
