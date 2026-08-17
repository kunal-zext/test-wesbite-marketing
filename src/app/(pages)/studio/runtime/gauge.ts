/**
 * Progress state for the metrics gyroscope, shared between the scroll layer
 * that computes it and the WebGL scene that draws it.
 *
 *   p  0 = first metric holding, 1 = last metric reached
 *
 * On `window` for the same reason as the assembly store: the writer (useMotion)
 * and the reader (the Gauge canvas) are separate "use client" entry points, and
 * a module-level binding shared across two client boundaries can be bundled
 * into both chunks — leaving each side with its own copy.
 *
 * Not React state: this changes every scrubbed frame.
 */

const KEY = "__zxGauge";

declare global {
  interface Window {
    [KEY]?: number;
  }
}

export function setGauge(p: number) {
  if (typeof window === "undefined") return;
  window[KEY] = p;
}

export function getGauge(): number {
  if (typeof window === "undefined") return 0;
  return window[KEY] ?? 0;
}
