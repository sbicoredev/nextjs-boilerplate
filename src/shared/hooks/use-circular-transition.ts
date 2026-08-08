"use client";

import { useCallback, useRef } from "react";

export function useCircularTransition<T, E extends string>(cb: (arg: E) => T) {
  const isTransitioningRef = useRef(false);

  const startTransition = useCallback(
    (coords: { x: number; y: number }, callback: () => void) => {
      // biome-ignore lint/suspicious/noUnnecessaryConditions: explain
      if (isTransitioningRef.current) {
        return;
      }
      isTransitioningRef.current = true;

      // Set CSS variables for the circular reveal animation
      const x = (coords.x / window.innerWidth) * 100;
      const y = (coords.y / window.innerHeight) * 100;

      // Set the CSS variables on document element
      document.documentElement.style.setProperty("--x", `${x}%`);
      document.documentElement.style.setProperty("--y", `${y}%`);

      // Check if View Transitions API is supported
      if ("startViewTransition" in document) {
        const transition = (
          document as Document & {
            startViewTransition: (callback: () => void) => {
              finished: Promise<void>;
            };
          }
        ).startViewTransition(() => {
          callback();
        });

        transition.finished.finally(() => {
          isTransitioningRef.current = false;
        });
      } else {
        // Fallback for browsers without View Transitions API
        callback();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 400);
      }
    },
    []
  );

  const trigger = useCallback(
    (e: React.MouseEvent, value: E) => {
      startTransition({ x: e.clientX, y: e.clientY }, () => {
        cb(value);
      });
    },
    [cb, startTransition]
  );

  const isTransitioning = useCallback(() => isTransitioningRef.current, []);

  return {
    startTransition,
    trigger,
    isTransitioning,
  };
}
