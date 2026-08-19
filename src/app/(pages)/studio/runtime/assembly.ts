/**
 * Assembly state for the aeroplane, shared between the scroll layer that
 * computes it and the WebGL scene that draws it.
 *
 *   k    1 = parts scattered, 0 = aircraft whole
 *   fly  0 = holding, 1 = fully departed
 *
 * On `window`, not a module binding: writer and reader are separate "use
 * client" entry points, and a shared module can be bundled into both chunks,
 * leaving each with its own copy. Not React state — these change every frame.
 */

const KEY = "__zxAssembly";

type Assembly = { k: number; fly: number };

declare global {
  interface Window {
    [KEY]?: Assembly;
  }
}

export function setAssembly(k: number, fly: number) {
  if (typeof window === "undefined") return;
  window[KEY] = { k, fly };
}

export function getAssembly(): Assembly {
  if (typeof window === "undefined") return { k: 1, fly: 0 };
  return window[KEY] ?? { k: 1, fly: 0 };
}
