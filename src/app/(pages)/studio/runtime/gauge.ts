/**
 * Progress state for the metrics gyroscope, shared between the scroll layer
 * that computes it and the WebGL scene that draws it.
 *
 *   p  0 = first metric holding, 1 = last metric reached
 *
 * On `window` and not React state, for the reasons in assembly.ts.
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
