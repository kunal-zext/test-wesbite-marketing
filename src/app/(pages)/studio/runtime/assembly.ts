/**
 * Assembly state for the section 04 aeroplane, shared between the scroll layer
 * that computes it and the WebGL scene that draws it.
 *
 *   k    1 = parts scattered, 0 = aircraft whole
 *   fly  0 = holding, 1 = fully departed
 *
 * On `window` for the same reason as the pointer store: the writer (StudioShell
 * via useMotion) and the reader (the Plane canvas) are separate "use client"
 * entry points, and a module-level binding shared across two client boundaries
 * can be bundled into both chunks — leaving each side with its own copy.
 *
 * Not React state: these change every frame, and a render per frame to move a
 * mesh would be absurd.
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
