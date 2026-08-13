/**
 * Pointer energy, shared between the hero shader and the headline drift.
 *
 * The shader already tracks how hard the pointer is pushing the fluid, ramping
 * 0..1 as it moves and decaying when it stops. The headline's 3D separation is
 * driven from the same number so the type reacts to the cursor in step with the
 * background rather than on a timer of its own.
 *
 * Held on `window` rather than in a module variable. The writer (FluidCanvas)
 * and the reader (StudioShell) are separate "use client" entry points, and a
 * module-level binding shared across two client boundaries can be bundled into
 * both chunks — giving each side its own copy, so the writes never reach the
 * reader. The global is the one instance both are guaranteed to see.
 *
 * Not React state on purpose: this changes every frame, and routing it through
 * a render would re-render the hero sixty times a second to move two elements.
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
