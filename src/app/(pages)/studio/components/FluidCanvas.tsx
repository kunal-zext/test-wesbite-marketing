"use client";

import { useEffect, useRef, useState } from "react";
import { useFluid } from "../runtime/useFluid";

/**
 * Thin client wrapper, so the hero itself stays a server component. The colour
 * is read off the `.zx` root rather than passed as a prop, keeping the shader
 * in step with the CSS token.
 */
export default function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [accent, setAccent] = useState("#8fe0ff");

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".zx");
    if (!root) return;
    // --acc: the shader is lit in the same cyan the accent type, rails and
    // fills use across the page, so the hero and the footer open and close on
    // the page's own colour rather than on a second one.
    const acc = getComputedStyle(root).getPropertyValue("--acc").trim();
    if (acc) setAccent(acc);
  }, []);

  useFluid(ref, { accent });

  return <canvas className="zx-fluid" ref={ref} aria-hidden="true" />;
}
