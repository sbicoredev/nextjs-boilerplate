// biome-ignore lint/suspicious/noExplicitAny: explain
type AnyFunction = (...args: any[]) => any;

/**
 * A function returned by {@link debounce}.
 *
 * It has the same parameters as the original function, but its invocation is
 * delayed until after the configured debounce delay has elapsed since the last
 * call. It also exposes control methods for canceling or flushing a pending
 * invocation.
 *
 * @template T - The type of the original debounced function.
 */
type DebouncedFunction<T extends AnyFunction> = ((
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void) & {
  /**
   * Cancels any pending debounced invocation.
   * If no invocation is pending, this method does nothing.
   *
   * @returns {void}
   */
  cancel: () => void;

  /**
   * Immediately invokes the pending debounced invocation, if one exists.
   * If no invocation is pending, this method does nothing.
   *
   * @returns {void}
   */
  flush: () => void;
};

/**
 * Creates a debounced function that delays invoking `fn` until after `delay`
 * milliseconds have elapsed since the last time the debounced function was
 * called.
 *
 * Each call to the returned function resets the debounce timer. When the timer
 * completes, `fn` is invoked once with the latest arguments and the latest
 * `this` context.
 *
 * The returned function also exposes two control methods:
 *
 * - `cancel()` prevents a pending invocation.
 * - `flush()` immediately runs a pending invocation.
 *
 * @template T - The type of the function to debounce.
 *
 * @param fn - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 *
 * Non-finite values such as `NaN` and `Infinity`, as well as negative values,
 * are normalized to `0`. A delay of `0` still schedules the invocation
 * asynchronously using `setTimeout`.
 *
 * @returns {DebouncedFunction<T>} A debounced version of `fn` with `cancel`
 * and `flush` methods.
 *
 * @remarks
 * - The debounced function preserves the `this` context from the latest call.
 * - Only the latest arguments are used for the pending invocation.
 * - Repeated calls within the debounce window do not queue multiple calls.
 * - If `fn` throws synchronously, the error propagates from the timer callback
 *   or from `flush()`.
 * - If `fn` returns a promise, this utility does not await, resolve, or catch
 *   that promise.
 *
 * @example
 * Basic usage:
 *
 * ```ts
 * const log = debounce((value: string) => {
 *   console.log(value);
 * }, 200);
 *
 * log("a");
 * log("b");
 * log("c");
 *
 * // After 200ms of inactivity, logs: "c"
 * ```
 *
 * @example
 * Preserving `this`:
 *
 * ```ts
 * class Search {
 *   query = "";
 *
 *   update = debounce(function (this: Search, value: string) {
 *     this.query = value;
 *     console.log(this.query);
 *   }, 250);
 * }
 *
 * const search = new Search();
 *
 * search.update("hello");
 * search.update("world");
 *
 * // After 250ms, logs: "world"
 * ```
 *
 * @example
 * Canceling a pending invocation:
 *
 * ```ts
 * const save = debounce(() => {
 *   console.log("Saving...");
 * }, 500);
 *
 * save();
 * save.cancel();
 *
 * // "Saving..." is never logged.
 * ```
 *
 * @example
 * Flushing a pending invocation immediately:
 *
 * ```ts
 * const save = debounce(() => {
 *   console.log("Saving...");
 * }, 500);
 *
 * save();
 * save.flush();
 *
 * // "Saving..." is logged immediately.
 * ```
 */
export function debounce<T extends AnyFunction>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: ThisParameterType<T> | undefined;

  const wait = Number.isFinite(delay) ? Math.max(0, delay) : 0;

  const invoke = () => {
    const args = lastArgs;
    const thisArg = lastThis;

    timeoutId = null;
    lastArgs = null;
    lastThis = undefined;

    if (args) {
      Reflect.apply(fn, thisArg, args);
    }
  };

  const debounced: DebouncedFunction<T> = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    lastArgs = args;
    lastThis = this;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(invoke, wait);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    lastArgs = null;
    lastThis = undefined;
  };

  debounced.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      invoke();
    }
  };

  return debounced;
}
