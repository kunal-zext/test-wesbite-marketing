"use client";

import { useRef } from "react";
import { usePlane3D } from "../runtime/usePlane3D";

/**
 * Canvas host for the section 04 aeroplane. All the geometry and animation
 * lives in usePlane3D; this only owns the element and its ref.
 */
export default function Plane() {
  const ref = useRef<HTMLCanvasElement>(null);
  usePlane3D(ref);
  return <canvas className="zx-planecanvas" ref={ref} aria-hidden="true" />;
}
