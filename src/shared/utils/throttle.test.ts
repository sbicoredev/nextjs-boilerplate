import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { throttle } from "./throttle";

interface Ctx {
  id: string;
}

type CallRecord = {
  thisValue: Ctx;
  value: number;
};

beforeEach(() => {
  // The throttle implementation uses Date.now(),
  // so we fake both timers and Date.
  vi.useFakeTimers({
    now: 1000,
    toFake: ["setTimeout", "clearTimeout", "Date"],
  });
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("throttle (this-preserving version)", () => {
  it("invokes immediately and preserves this on the leading call", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx: Ctx = { id: "ctx" };
    const throttled = throttle(fn, 100);

    throttled.call(ctx, 1);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.thisValue).toBe(ctx);
    expect(calls[0]?.value).toBe(1);
  });

  it("uses the latest this and args for the trailing call", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx1: Ctx = { id: "ctx1" };
    const ctx2: Ctx = { id: "ctx2" };

    const throttled = throttle(fn, 100);

    throttled.call(ctx1, 1);
    throttled.call(ctx2, 2);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.thisValue).toBe(ctx1);
    expect(calls[0]?.value).toBe(1);

    vi.advanceTimersByTime(100);

    expect(calls).toHaveLength(2);
    expect(calls[1]?.thisValue).toBe(ctx2);
    expect(calls[1]?.value).toBe(2);
  });

  it("does not invoke multiple trailing times for repeated calls", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx: Ctx = { id: "ctx" };
    const throttled = throttle(fn, 100);

    throttled.call(ctx, 1);
    throttled.call(ctx, 2);
    throttled.call(ctx, 3);
    throttled.call(ctx, 4);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.value).toBe(1);

    vi.advanceTimersByTime(100);

    expect(calls).toHaveLength(2);
    expect(calls[1]?.value).toBe(4);

    vi.advanceTimersByTime(200);

    expect(calls).toHaveLength(2);
  });

  it("preserves this when the throttled function is called as a method", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(5);

    expect(counter.calls).toEqual([15]);
  });

  it("preserves this for trailing method calls", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(1);
    counter.add(2);

    expect(counter.calls).toEqual([11]);

    vi.advanceTimersByTime(100);

    expect(counter.calls).toEqual([11, 12]);
  });

  it("uses the current object state when the trailing call runs", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(1);
    counter.add(2);

    // Mutate state before the trailing invocation runs.
    counter.value = 30;

    vi.advanceTimersByTime(100);

    // Leading call used value = 10.
    // Trailing call used value = 30.
    expect(counter.calls).toEqual([11, 32]);
  });

  it("cancel prevents the pending trailing call", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(1);
    counter.add(2);

    counter.add.cancel();

    vi.advanceTimersByTime(200);

    expect(counter.calls).toEqual([11]);
  });

  it("flush invokes the pending trailing call immediately", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(1);
    counter.add(2);

    counter.add.flush();

    expect(counter.calls).toEqual([11, 12]);

    // The pending timer should have been cleared.
    vi.advanceTimersByTime(200);

    expect(counter.calls).toEqual([11, 12]);
  });

  it("flush does nothing when no trailing call is pending", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    counter.add(1);
    counter.add.flush();

    expect(counter.calls).toEqual([11]);
  });

  it("allows a new leading call after the throttle window has elapsed", () => {
    const calls: CallRecord[] = [];

    function fn(this: Ctx, value: number) {
      calls.push({ thisValue: this, value });
    }

    const ctx: Ctx = { id: "ctx" };
    const throttled = throttle(fn, 100);

    // t = 1000
    throttled.call(ctx, 1);

    // Still within the same throttle window.
    throttled.call(ctx, 2);

    // Trailing call happens at t = 1100.
    vi.advanceTimersByTime(100);

    expect(calls).toHaveLength(2);
    expect(calls[0]?.value).toBe(1);
    expect(calls[1]?.value).toBe(2);

    // Move past the next throttle window.
    // Last trailing call happened at t = 1100,
    // so t = 1200 is the next eligible leading time.
    vi.advanceTimersByTime(100);

    throttled.call(ctx, 3);

    expect(calls).toHaveLength(3);
    expect(calls[2]?.thisValue).toBe(ctx);
    expect(calls[2]?.value).toBe(3);
  });

  it("can be called again after cancel once the throttle window has elapsed", () => {
    class Counter {
      value = 10;
      calls: number[] = [];

      add = throttle(function (this: Counter, amount: number) {
        this.calls.push(this.value + amount);
      }, 100);
    }

    const counter = new Counter();

    // t = 1000
    counter.add(1);
    counter.add(2);

    counter.add.cancel();

    // Advance beyond the throttle window.
    vi.advanceTimersByTime(200);

    counter.add(3);

    expect(counter.calls).toEqual([11, 13]);
  });
});
