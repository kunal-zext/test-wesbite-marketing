"use client";

import { useEffect, useRef, useState } from "react";
import { useFluid } from "../runtime/useFluid";

/**
 * Thin client wrapper so the hero section itself can stay a server component.
 *
 * The colour is read off the `.zx` root rather than passed down as a prop, so
 * the hero section itself ships no client JS and the shader stays in step with
 * the CSS token.
 */
export default function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [accent, setAccent] = useState("#8c52ff");

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".zx");
    if (!root) return;
    // --brand, not --acc: the hero is lit in brand primary, while the accent
    // type and fills across the page use brand secondary.
    const acc = getComputedStyle(root).getPropertyValue("--brand").trim();
    if (acc) setAccent(acc);
  }, []);

  useFluid(ref, { accent });

  return <canvas className="zx-fluid" ref={ref} aria-hidden="true" />;
}
