"use client";

import { useEffect, useRef } from "react";

/**
 * Draggable footer sticker. Once released it keeps its momentum, spins down and
 * eases back to its anchor — a spring settle rather than a snap.
 */
export default function Sticker() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dragging = false;
    let px = 0;
    let py = 0;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let rot = 0;
    let vr = 0;
    let raf = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      el.dataset.drag = "1";
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      x += dx;
      y += dy;
      vx = dx;
      vy = dy;
      vr = dx * 0.35;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.dataset.drag = "0";
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);

    const loop = () => {
      if (!dragging) {
        vx *= 0.92;
        vy *= 0.92;
        vr *= 0.9;
        x += vx;
        y += vy;
        x += -x * 0.045;
        y += -y * 0.045;
        rot += vr;
        rot += -rot * 0.05;
      } else {
        rot += vr * 0.25;
        vr *= 0.8;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${rot.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <button
      className="zx-sticker"
      ref={ref}
      type="button"
      data-label="drag"
      aria-label="Zext Digital"
      data-drag="0"
    >
      <img
        src="/assets/Logo.svg"
        alt=""
        width={200}
        height={136}
        loading="lazy"
        draggable={false}
      />
    </button>
  );
}
