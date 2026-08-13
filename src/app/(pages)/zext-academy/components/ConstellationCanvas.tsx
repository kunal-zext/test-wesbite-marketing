"use client";

import { useEffect, useRef } from "react";

/**
 * Animated particle network behind the hero. Links use brand cyan (`secondary`),
 * nodes use brand violet (`primary`). Sizes to its positioned parent; renders a
 * single static frame when the user prefers reduced motion.
 */
export function ConstellationCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MAXD = 130;
    let W = 0;
    let H = 0;
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    let raf = 0;

    const size = () => {
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
      const count = Math.min(Math.floor((W * H) / 16000), 70);
      pts = [];
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    };

    const links = () => {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p = pts[i];
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < MAXD) {
            ctx.strokeStyle = `rgba(143,224,255,${0.13 * (1 - d / MAXD)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(140,82,255,.55)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      links();
      raf = requestAnimationFrame(draw);
    };

    const render = () => {
      size();
      if (reduce) {
        ctx.clearRect(0, 0, W, H);
        links();
      } else {
        draw();
      }
    };

    render();

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        cancelAnimationFrame(raf);
        render();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
