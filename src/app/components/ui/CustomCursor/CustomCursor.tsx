"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.14;

const isInteractiveTarget = (el: Element | null): boolean => {
  if (!el || !(el instanceof Element)) return false;
  const hit = el.closest(
    [
      "a[href]",
      "button:not([disabled])",
      '[role="button"]',
      "input:not([type='hidden'])",
      "textarea",
      "select",
      "summary",
      "[data-cursor-hover]",
    ].join(","),
  );
  if (hit) return true;
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    if (node instanceof HTMLElement && node.classList.contains("cursor-pointer")) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const innerRef = useRef({ x: 0, y: 0 });
  const outerRef = useRef({ x: 0, y: 0 });
  const innerEl = useRef<HTMLDivElement>(null);
  const outerEl = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const applyEnabled = () => {
      const on = mq.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("custom-cursor-active", on);
    };
    applyEnabled();
    mq.addEventListener("change", applyEnabled);
    return () => {
      mq.removeEventListener("change", applyEnabled);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      outerRef.current.x = lerp(outerRef.current.x, innerRef.current.x, LERP);
      outerRef.current.y = lerp(outerRef.current.y, innerRef.current.y, LERP);

      const ix = innerRef.current.x;
      const iy = innerRef.current.y;
      const ox = outerRef.current.x;
      const oy = outerRef.current.y;

      if (innerEl.current) {
        innerEl.current.style.transform = `translate3d(${ix}px, ${iy}px, 0) translate(-50%, -50%)`;
      }
      if (outerEl.current) {
        outerEl.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      innerRef.current.x = e.clientX;
      innerRef.current.y = e.clientY;
      setVisible(true);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(isInteractiveTarget(target));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10050] overflow-hidden"
      aria-hidden
    >
      <div
        ref={outerEl}
        className="pointer-events-none fixed left-0 top-0 will-change-transform rounded-full box-border"
        style={{
          opacity: visible ? 1 : 0,
          transition:
            "opacity 0.2s ease, width 0.25s ease, height 0.25s ease, border-color 0.2s ease, box-shadow 0.25s ease",
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          /* Hover uses theme cyan/blue (globals @theme), not green */
          border: hovering
            ? "1px solid rgba(143, 224, 255, 0.9)"
            : "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: hovering
            ? "0 0 22px rgba(140, 82, 255, 0.35)"
            : "0 0 12px rgba(255, 255, 255, 0.06)",
        }}
      />
      <div
        ref={innerEl}
        className="pointer-events-none fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease",
          backgroundColor: hovering ? "rgb(200, 244, 255)" : "rgb(255, 255, 255)",
          boxShadow: hovering
            ? "0 0 10px rgba(143, 224, 255, 0.55)"
            : "0 0 4px rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
