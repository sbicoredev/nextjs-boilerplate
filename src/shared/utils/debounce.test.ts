import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { debounce } from "./debounce";

interface Ctx {
  id: string;
}

type CallRecord = {
  thisValue: Ctx;
  value: number;
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("debounce with cancel and flush", () => {
  it("invokes fn only after the delay has elapsed", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("invokes fn with the latest arguments", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced(2);
    debounced(3);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it("supports multiple arguments", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a", 1, { nested: true });

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith("a", 1, { nested: true });
  });

  it("resets the wait period on each call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);

    vi.advanceTimersByTime(90);
    expect(fn).not.toHaveBeenCalled();

    debounced(2);

    vi.advanceTimersByTime(90);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it("does not invoke multiple times for repeated calls", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced(2);
    debounced(3);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("preserves this from the call", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx: Ctx = { id: "ctx" };
    const debounced = debounce(fn, 100);

    debounced.call(ctx, 1);

    vi.advanceTimersByTime(100);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.thisValue).toBe(ctx);
    expect(calls[0]?.value).toBe(1);
  });

  it("uses the latest this context for the trailing call", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx1: Ctx = { id: "ctx1" };
    const ctx2: Ctx = { id: "ctx2" };

    const debounced = debounce(fn, 100);

    debounced.call(ctx1, 1);
    debounced.call(ctx2, 2);

    vi.advanceTimersByTime(100);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.thisValue).toBe(ctx2);
    expect(calls[0]?.value).toBe(2);
  });

  it("preserves this when used as an object method", () => {
    class Logger {
      logs: string[] = [];

      log = debounce(function (this: Logger, message: string) {
        this.logs.push(message);
      }, 100);
    }

    const logger = new Logger();

    logger.log("a");
    logger.log("b");

    vi.advanceTimersByTime(100);

    expect(logger.logs).toEqual(["b"]);
  });

  it("uses the current object state when the debounced call runs", () => {
    class Counter {
      value = 1;
      logs: number[] = [];

      save = debounce(function (this: Counter, amount: number) {
        this.logs.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.save(1);
    counter.value = 10;

    vi.advanceTimersByTime(100);

    expect(counter.logs).toEqual([11]);
  });

  it("cancel prevents a pending invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced.cancel();

    vi.advanceTimersByTime(200);

    expect(fn).not.toHaveBeenCalled();
  });

  it("cancel is safe when there is no pending invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced.cancel();

    expect(fn).not.toHaveBeenCalled();
  });

  it("allows new calls after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced.cancel();

    debounced(2);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it("flush invokes the pending call immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced.flush();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("flush uses the latest arguments and this context", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx1: Ctx = { id: "ctx1" };
    const ctx2: Ctx = { id: "ctx2" };

    const debounced = debounce(fn, 100);

    debounced.call(ctx1, 1);
    debounced.call(ctx2, 2);

    debounced.flush();

    expect(calls).toHaveLength(1);
    expect(calls[0]?.thisValue).toBe(ctx2);
    expect(calls[0]?.value).toBe(2);
  });

  it("flush does nothing when there is no pending invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced.flush();

    expect(fn).not.toHaveBeenCalled();
  });

  it("flush does nothing after the timer has already fired", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    debounced.flush();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("flush does nothing after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced.cancel();
    debounced.flush();

    vi.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();
  });

  it("cancel does nothing after flush", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced.flush();
    debounced.cancel();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("treats delay 0 as an async debounce, not synchronous invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 0);

    debounced(1);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("normalizes negative delay to 0", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, -100);

    debounced(1);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(fn).toHaveBeenCalledWith(1);
  });

  it("normalizes NaN delay to 0", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, Number.NaN);

    debounced(1);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(fn).toHaveBeenCalledWith(1);
  });

  it("normalizes Infinity delay to 0", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, Number.POSITIVE_INFINITY);

    debounced(1);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(fn).toHaveBeenCalledWith(1);
  });

  it("keeps state separate between debounced instances", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const debounced1 = debounce(fn1, 100);
    const debounced2 = debounce(fn2, 100);

    debounced1(1);
    debounced2(2);

    debounced1.cancel();

    vi.advanceTimersByTime(100);

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledWith(2);
  });

  it("clears internal state even if fn throws", () => {
    const fn = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("boom");
      })
      .mockImplementation(() => {
        // no-op for later calls
      });

    const debounced = debounce(fn, 100);

    debounced();

    expect(() => vi.advanceTimersByTime(100)).toThrow("boom");

    debounced();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
