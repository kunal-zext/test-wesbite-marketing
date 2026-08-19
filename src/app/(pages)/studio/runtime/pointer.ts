/**
 * Pointer energy, shared between the hero shader and the headline drift.
 *
 * The shader ramps this 0..1 as the pointer pushes the fluid and decays it
 * when it stops; the headline's 3D separation reads the same number, so the
 * type reacts in step with the background rather than on its own timer.
 *
 * On `window`, not a module binding: writer and reader are separate "use
 * client" entry points, and a shared module can be bundled into both chunks,
 * leaving each with its own copy. Not React state — this changes every frame.
 */

const KEY = "__zxPointerPower";

declare global {
  interface Window {
    [KEY]?: number;
  }
}

export function setPointerPower(v: number) {
  if (typeof window === "undefined") return;
  window[KEY] = v;
}

export function getPointerPower(): number {
  if (typeof window === "undefined") return 0;
  return window[KEY] ?? 0;
}
