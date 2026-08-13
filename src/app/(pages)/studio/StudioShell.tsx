"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { GREETINGS, NAV_LINKS } from "./data";
import { useCursor } from "./runtime/useCursor";
import { useMotion } from "./runtime/useMotion";

/**
 * Client boundary for the Studio page.
 *
 * Sections are passed in as `children` from the server component, so they stay
 * server-rendered and ship no JavaScript of their own — only this shell and the
 * handful of genuinely interactive widgets are client code.
 */
export default function StudioShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const [booted, setBooted] = useState(false);

  const lenis = useLenis();

  useCursor(rootRef, true);
  useMotion(rootRef, lenis, booted);

  /* Studio-local time, shown in the footer. */
  useEffect(() => {
    const nodes = () =>
      Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>("[data-h='clock']") ?? [],
      );
    const tick = () => {
      let s: string;
      try {
        s = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        });
      } catch {
        s = new Date().toLocaleTimeString("en-GB", { hour12: false });
      }
      nodes().forEach((n) => {
        n.textContent = n.dataset.suffix ? `${s} ${n.dataset.suffix}` : s;
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /*
   * Preloader. The original waited on four CDN scripts and could sit for five
   * seconds; here every dependency is bundled, so this only covers font
   * settling and is hard-capped at 1.2s. Content underneath is already painted,
   * so this never gates LCP for a visitor who scrolls past it.
   */
  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /*
     * FIRST holds the opening greeting a beat longer than the rest so the run
     * reads as deliberate rather than as a flicker; WORD is the beat for each
     * one after it. CAP is the hard ceiling if fonts stall — the content
     * underneath is already painted, so none of this gates LCP for a visitor
     * who scrolls straight past.
     */
    const FIRST = 520;
    const WORD = 150;
    const CAP = 2600;

    const words = Array.from(pre.querySelectorAll<HTMLElement>(".zx-preword"));
    let ready = false;
    let timer = 0;
    void (document.fonts?.ready ?? Promise.resolve()).then(() => {
      ready = true;
    });

    const finish = () => {
      document.body.style.overflow = "";
      setBooted(true);
      const screen = screenRef.current;
      if (reduced || !screen) {
        pre.style.display = "none";
        return;
      }
      // Leaves upward; the curve under it becomes the trailing edge.
      screen.style.transition = "transform 1.05s cubic-bezier(.76,0,.24,1)";
      screen.style.transform = "translateY(-110%)";
      timer = window.setTimeout(() => {
        pre.style.display = "none";
      }, 1150);
    };

    if (reduced) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    const show = (n: number) =>
      words.forEach((w, i) => {
        w.dataset.on = i === n ? "1" : "0";
      });

    let i = 0;
    const next = () => {
      i += 1;
      if (i < words.length) {
        show(i);
        timer = window.setTimeout(next, WORD);
        return;
      }
      // Last greeting is up. Hold it until the fonts land, or until the cap.
      const settle = () => {
        if (ready || performance.now() - t0 > CAP) finish();
        else timer = window.setTimeout(settle, 60);
      };
      timer = window.setTimeout(settle, WORD);
    };
    show(0);
    timer = window.setTimeout(next, FIRST);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  /* In-page anchors ride the shared Lenis instance. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const onClick = (e: MouseEvent) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const target = el.querySelector<HTMLElement>(
        `#${CSS.escape(a.getAttribute("href")!.slice(1))}`,
      );
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.6 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    links.forEach((a) => a.addEventListener("click", onClick));
    return () => links.forEach((a) => a.removeEventListener("click", onClick));
  }, [lenis]);

  return (
    <div ref={rootRef} className="zx" data-cursor="on">
      <div className="zx-grain" aria-hidden="true" />

      <div className="zx-cursor" data-h="cursor" aria-hidden="true">
        <div className="zx-cring" data-h="cring" />
        <div className="zx-cdot" data-h="cdot" />
        <div className="zx-clabel" data-h="clabel" />
      </div>

      <div className="zx-pre" ref={preRef} aria-hidden="true">
        <div className="zx-prescreen" ref={screenRef}>
          <div className="zx-prewords">
            {GREETINGS.map((g, i) => (
              <span className="zx-preword" key={g} data-on={i === 0 ? "1" : "0"}>
                {g}
                <i className="zx-predot" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <header className="zx-nav" data-h="nav">
        <a className="zx-navlogo" href="#top" data-mag="1" data-label="top">
          {/* The mark stands alone here, so it carries the accessible name. */}
          <img
            className="zx-navmark"
            src="/assets/Logo.svg"
            alt="Zext Digital"
            width={200}
            height={136}
            fetchPriority="high"
            draggable={false}
          />
        </a>
        <nav className="zx-navlinks">
          {NAV_LINKS.map((l) => (
            <a key={l.href} className="zx-navlink" href={l.href} data-mag="1">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="zx-navtools">
          <a
            className="zx-btn zx-btn--acc zx-btn--sm zx-navcta"
            href="#contact"
            data-mag="2"
            data-label="go"
          >
            <span>Start a project</span>
            <span className="zx-btnarrow zx-btnarrow--diag" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </header>

      {children}
    </div>
  );
}
