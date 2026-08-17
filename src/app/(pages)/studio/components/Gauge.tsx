"use client";

import { useRef } from "react";
import { useGauge3D } from "../runtime/useGauge3D";

/**
 * Canvas host for the metrics gyroscope. All the geometry and animation lives
 * in useGauge3D; this only owns the element and its ref.
 */
export default function Gauge() {
  const ref = useRef<HTMLCanvasElement>(null);
  useGauge3D(ref);
  return <canvas className="zx-mxgauge3d" ref={ref} aria-hidden="true" />;
}
