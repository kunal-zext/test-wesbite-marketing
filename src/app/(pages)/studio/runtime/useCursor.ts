"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

/**
 * Custom cursor: a fast dot, a lagging ring, a contextual label, plus magnetic
 * pull on anything tagged `data-mag`.
 *
 * All of it runs off a single rAF loop that writes transforms directly to the
 * DOM. Driving this through React state would mean a re-render per pointer
 * frame; here the components never re-render at all.
 *
 * Disabled outright on touch/coarse pointers and under reduced motion.
 */
export function useCursor(root: React.RefObject<HTMLElement | null>, on: boolean) {
  useEffect(() => {
    const el = root.current;
    if (!el || !on) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cursor = el.querySelector<HTMLElement>("[data-h='cursor']");
    const dot = el.querySelector<HTMLElement>("[data-h='cdot']");
    const ring = el.querySelector<HTMLElement>("[data-h='cring']");
    const label = el.querySelector<HTMLElement>("[data-h='clabel']");
    if (!cursor) return;

    const st = {
      x: innerWidth / 2,
      y: innerHeight / 2,
      rx: innerWidth / 2,
      ry: innerHeight / 2,
      dx: innerWidth / 2,
      dy: innerHeight / 2,
      s: 1,
    };
    let shown = false;

    const onPointer = (e: PointerEvent) => {
      st.x = e.clientX;
      st.y = e.clientY;
      if (!shown) {
        shown = true;
        cursor.style.opacity = "1";
      }
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const showLabel = (text: string | null) => {
      if (!label || !text) return;
      label.textContent = text;
      label.style.opacity = "1";
      label.style.transform = "translate(26px,14px) scale(1)";
    };
    const hideLabel = () => {
      if (!label) return;
      label.style.opacity = "0";
      label.style.transform = "translate(26px,14px) scale(.6)";
    };

    // Magnetic targets ease toward the pointer while it is over them.
    const mags = Array.from(el.querySelectorAll<HTMLElement>("[data-mag]"));
    const magState = new Map<
      HTMLElement,
      { x: number; y: number; tx: number; ty: number }
    >();
    const cleanups: Array<() => void> = [];

    mags.forEach((m) => {
      magState.set(m, { x: 0, y: 0, tx: 0, ty: 0 });
      const strength = m.getAttribute("data-mag") === "2" ? 0.42 : 0.22;
      const move = (e: PointerEvent) => {
        const r = m.getBoundingClientRect();
        const s = magState.get(m)!;
        s.tx = (e.clientX - (r.left + r.width / 2)) * strength;
        s.ty = (e.clientY - (r.top + r.height / 2)) * strength;
      };
      const enter = () => {
        st.s = 1.9;
        showLabel(m.getAttribute("data-label"));
      };
      const leave = () => {
        st.s = 1;
        const s = magState.get(m)!;
        s.tx = 0;
        s.ty = 0;
        hideLabel();
      };
      m.addEventListener("pointermove", move);
      m.addEventListener("pointerenter", enter);
      m.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        m.removeEventListener("pointermove", move);
        m.removeEventListener("pointerenter", enter);
        m.removeEventListener("pointerleave", leave);
      });
    });

    // Elements that only want the label, without the magnetic pull.
    Array.from(
      el.querySelectorAll<HTMLElement>("[data-label]:not([data-mag])"),
    ).forEach((m) => {
      const enter = () => {
        st.s = 1.9;
        showLabel(m.getAttribute("data-label"));
      };
      const leave = () => {
        st.s = 1;
        hideLabel();
      };
      m.addEventListener("pointerenter", enter);
      m.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        m.removeEventListener("pointerenter", enter);
        m.removeEventListener("pointerleave", leave);
      });
    });

    if (label) {
      label.style.transition = `opacity .35s,transform .5s ${EASE}`;
    }

    let scale = 1;
    let raf = 0;
    const loop = () => {
      st.dx += (st.x - st.dx) * 0.9;
      st.dy += (st.y - st.dy) * 0.9;
      st.rx += (st.x - st.rx) * 0.14;
      st.ry += (st.y - st.ry) * 0.14;
      scale += (st.s - scale) * 0.12;
      if (dot) dot.style.transform = `translate3d(${st.dx}px,${st.dy}px,0)`;
      if (ring) {
        ring.style.transform = `translate3d(${st.rx}px,${st.ry}px,0) scale(${scale.toFixed(3)})`;
      }
      if (label) {
        label.style.left = `${st.rx}px`;
        label.style.top = `${st.ry}px`;
      }
      mags.forEach((m) => {
        const s = magState.get(m)!;
        s.x += (s.tx - s.x) * 0.16;
        s.y += (s.ty - s.y) * 0.16;
        if (Math.abs(s.x) > 0.02 || Math.abs(s.y) > 0.02) {
          m.style.transform = `translate3d(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px,0)`;
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      cleanups.forEach((fn) => fn());
    };
  }, [root, on]);
}
