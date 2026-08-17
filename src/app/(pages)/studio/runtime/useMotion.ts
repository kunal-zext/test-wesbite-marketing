"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { getPointerPower } from "./pointer";
import { setAssembly } from "./assembly";
import { setGauge } from "./gauge";

/**
 * Splits every text node under `root` into per-character inline-blocks so GSAP
 * can stagger them. Marked with a data flag so a re-run is a no-op.
 */
function splitChars(root: HTMLElement | null): HTMLElement[] {
  if (!root || root.dataset.zxSplit) return [];
  root.dataset.zxSplit = "1";
  const chars: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const txt = n.textContent ?? "";
        if (!txt.trim()) return;
        const frag = document.createDocumentFragment();
        // Wrap each word so characters never break mid-word on wrap.
        txt.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const word = document.createElement("span");
          word.style.display = "inline-block";
          word.style.whiteSpace = "nowrap";
          part.split("").forEach((ch) => {
            const s = document.createElement("span");
            s.textContent = ch;
            s.style.display = "inline-block";
            s.style.willChange = "transform,opacity,filter";
            word.appendChild(s);
            chars.push(s);
          });
          frag.appendChild(word);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        walk(n);
      }
    });
  };
  walk(root);
  return chars;
}

/** Splits into whole words rather than characters, for the manifesto scrub. */
function splitWords(root: HTMLElement | null): HTMLElement[] {
  if (!root || root.dataset.zxSplit) return [];
  root.dataset.zxSplit = "1";
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (n.textContent ?? "").split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const s = document.createElement("span");
          s.textContent = p;
          s.style.display = "inline-block";
          frag.appendChild(s);
          words.push(s);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        walk(n);
      }
    });
  };
  walk(root);
  return words;
}

/**
 * Every scroll-driven effect on the page.
 *
 * GSAP and ScrollTrigger are imported dynamically so they stay out of the
 * initial bundle; if the import fails or the visitor prefers reduced motion,
 * `showAll()` reveals every `data-r` element and the page degrades to a normal
 * static document.
 *
 * ScrollTrigger is driven by the app-wide Lenis instance from LayoutWrapper —
 * we only forward its scroll events. Creating a second Lenis here (as the
 * original artifact did) would fight the existing one for the wheel.
 */
export function useMotion(
  root: React.RefObject<HTMLElement | null>,
  lenis: Lenis | undefined,
  ready: boolean,
) {
  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (h: string) => el.querySelector<HTMLElement>(`[data-h="${h}"]`);
    const qa = (h: string) =>
      Array.from(el.querySelectorAll<HTMLElement>(`[data-h="${h}"]`));

    const showAll = () => {
      el.querySelectorAll<HTMLElement>("[data-r]").forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "none";
        n.style.clipPath = "none";
      });
    };

    let disposed = false;
    const cleanups: Array<() => void> = [];

    void (async () => {
      let gsap: typeof import("gsap").gsap;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      try {
        const [g, st] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap = g.gsap;
        ScrollTrigger = st.ScrollTrigger;
      } catch {
        showAll();
        return;
      }
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      if (lenis) {
        const update = () => ScrollTrigger.update();
        lenis.on("scroll", update);
        cleanups.push(() => lenis.off("scroll", update));
      }

      /* ---- hero intro ------------------------------------------------ */
      const heroLines = qa("h1line");
      heroLines.forEach((line) => {
        // A clipping wrapper lets the characters rise out of nothing.
        const parent = line.parentElement!;
        const wrap = document.createElement("span");
        wrap.style.display = "block";
        wrap.style.overflow = "hidden";
        wrap.style.paddingBottom = ".06em";
        parent.insertBefore(wrap, line);
        wrap.appendChild(line);
      });
      const heroChars = heroLines.flatMap((l) => splitChars(l));

      if (reduced) {
        showAll();
      } else {
        gsap.set(heroChars, { yPercent: 118, opacity: 0, filter: "blur(14px)" });
        gsap.to(heroChars, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.35,
          ease: "expo.out",
          stagger: { each: 0.021, from: "start" },
          onComplete: () => {
            gsap.set(heroChars, { clearProps: "filter,opacity" });
            startDrift();
          },
        });
        const rest = el.querySelectorAll('[data-h="hero"] [data-r="up"]');
        gsap.set(rest, { y: 26, opacity: 0 });
        gsap.to(rest, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          delay: 0.35,
        });
      }

      /* ---- hero idle drift + accent ghosts --------------------------- */
      function startDrift() {
        if (reduced || !heroChars.length) return;
        const accent = getComputedStyle(el!).getPropertyValue("--acc").trim();
        const ghosts: HTMLElement[] = [];
        heroLines.forEach((line) => {
          const ghost = line.cloneNode(true) as HTMLElement;
          ghost.setAttribute("aria-hidden", "true");
          ghost.style.cssText +=
            ";position:absolute;left:0;top:0;width:100%;opacity:.24;mix-blend-mode:screen;pointer-events:none";
          ghost.style.color = accent;
          ghost.querySelectorAll("em").forEach((e) => {
            (e as HTMLElement).style.color = "inherit";
          });
          const parent = line.parentElement!;
          parent.style.position = "relative";
          parent.appendChild(ghost);
          ghosts.push(ghost);
        });

        let raf = 0;
        const loop = (time: number) => {
          const k = time * 0.00055;
          /*
           * Pointer energy from the shader. At rest the letters barely breathe;
           * as the cursor moves it multiplies the drift ~3x and the ghost
           * separation ~5x, which is what makes the headline read as layered
           * rather than flat. Without this term the ghosts sit a fixed 1.2px
           * apart and the effect is invisible.
           */
          const p = getPointerPower();
          for (let i = 0; i < heroChars.length; i++) {
            const n =
              Math.sin(k * 1.7 + i * 0.34) * Math.sin(k * 1.05 + i * 0.17 + 1.3);
            heroChars[i].style.transform =
              `translate3d(0,${(n * (2.2 + p * 4.5)).toFixed(2)}px,0) rotate(${(n * (0.35 + p * 0.9)).toFixed(2)}deg)`;
          }
          const off = Math.sin(k * 1.3) * (1.2 + p * 5);
          ghosts.forEach((gh, i) => {
            gh.style.transform = `translate3d(${(off * (i % 2 ? -1 : 1)).toFixed(2)}px,${(off * 0.4).toFixed(2)}px,0)`;
          });
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanups.push(() => cancelAnimationFrame(raf));
      }

      if (reduced) {
        initStats(true);
        initSignal(true);
        ScrollTrigger.refresh();
        return;
      }

      /* ---- generic reveals ------------------------------------------- */
      el.querySelectorAll<HTMLElement>('[data-r="up"]').forEach((n) => {
        if (n.closest('[data-h="hero"]')) return;
        gsap.set(n, { y: 34, opacity: 0 });
        ScrollTrigger.create({
          trigger: n,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(n, { y: 0, opacity: 1, duration: 1.15, ease: "expo.out" }),
        });
      });
      el.querySelectorAll<HTMLElement>('[data-r="wipe"]').forEach((n) => {
        gsap.set(n, { clipPath: "inset(0% 0% 100% 0%)" });
        ScrollTrigger.create({
          trigger: n,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(n, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.35,
              ease: "expo.out",
            }),
        });
      });

      /* ---- nav hides on the way down --------------------------------- */
      const nav = q("nav");
      if (nav) {
        let lastY = 0;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const y = self.scroll();
            nav.style.transform =
              y > 260 && y > lastY ? "translateY(-110%)" : "translateY(0)";
            lastY = y;
          },
        });
      }

      const hint = q("scrollhint");
      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: q("hero"),
            start: "top top",
            end: "+=300",
            scrub: true,
          },
        });
      }

      /* ---- scroll-velocity skew -------------------------------------- */
      const skewers = Array.from(
        el.querySelectorAll<HTMLElement>(
          '[data-h="skew"], [data-h="card"], [data-h="svc"]',
        ),
      );
      if (skewers.length) {
        let target = 0;
        let current = 0;
        let lastUpdate = 0;

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const v = Math.max(-70, Math.min(70, self.getVelocity() / 90));
            target = v * 0.12;
            lastUpdate = performance.now();
          },
        });

        /*
         * ScrollTrigger only reports velocity while the scroll is moving, so
         * easing the skew inside onUpdate leaves it frozen at whatever the last
         * sample was — an anchor jump or End key would permanently shear the
         * section. Decaying on our own rAF guarantees it always returns to flat.
         */
        let skewRaf = 0;
        const settle = () => {
          if (performance.now() - lastUpdate > 90) target = 0;
          if (target !== 0 || current !== 0) {
            current += (target - current) * 0.12;
            if (Math.abs(current) < 0.01) current = 0;
            gsap.set(skewers, { skewY: current });
          }
          skewRaf = requestAnimationFrame(settle);
        };
        skewRaf = requestAnimationFrame(settle);
        cleanups.push(() => cancelAnimationFrame(skewRaf));
      }

      /* ---- manifesto reads in as you scroll -------------------------- */
      const mani = q("mani");
      if (mani) {
        const words = splitWords(mani);
        gsap.set(words, { opacity: 0.11 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: mani,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        });
      }

      /* ---- the giant NERVE ------------------------------------------- */
      const nerve = q('nerveword');
      if (nerve) {
        /*
         * The word is not animated in — it is behind the glass the whole time,
         * and the scroll's only job is to take the glass off it.
         *
         * That is a simpler idea than throwing letters at the panel, and it
         * removes the problem that kept coming back: a letter in front of the
         * glass has to read against both the panes and whatever is behind
         * them, and no single colour does. Hidden, it has nothing to fight.
         *
         * The panes go in order of distance from the centre, so the break
         * radiates and the word is uncovered from the middle out rather than
         * side to side.
         */
        const panes = Array.from(
          el.querySelectorAll<SVGPolygonElement>('.zx-shard'),
        );
        const sec = q('nerve');

        if (panes.length) {
          const SPREAD = 4; // how much of the run the wave takes to cross
          const CRACK = 0.32;
          const FLY = 1.15;

          const info = panes.map((p) => {
            const b = p.getBBox();
            const dx = b.x + b.width / 2 - 500;
            const dy = b.y + b.height / 2 - 310;
            const d = Math.hypot(dx, dy) || 1;
            return { p, ux: dx / d, uy: dy / d, d };
          });
          const far = Math.max(...info.map((i) => i.d));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec ?? nerve,
              pin: sec ?? undefined,
              start: 'center center',
              end: '+=150%',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          info.forEach(({ p, ux, uy, d }, n) => {
            // Jittered so the wave is a spreading fracture, not a clean ring.
            const at = (d / far + (n % 7) * 0.014) * SPREAD;

            tl.to(
              p,
              {
                x: ux * (3 + Math.min(9, d / 60)),
                y: uy * (3 + Math.min(9, d / 60)),
                rotation: (n % 2 ? 1 : -1) * (0.6 + (n % 5) * 0.22),
                // Light seams on dark glass: the crack is the highlight, and
                // it is what makes a departing pane visible at all.
                stroke: 'rgba(255,255,255,0.5)',
                transformOrigin: '50% 50%',
                duration: CRACK,
                ease: 'power3.out',
              },
              at,
            );

            // Far enough to clear the viewport, not just the panel.
            const fling = 420 + d * 2.4;
            tl.to(
              p,
              {
                x: ux * fling,
                y: uy * fling,
                rotation: (n % 2 ? 1 : -1) * (16 + (n % 7) * 7),
                duration: FLY,
                // Accelerating away, not easing into place.
                ease: 'power2.in',
              },
              at + CRACK,
            );
            // Fades only at the tail, or the piece is gone before it has
            // travelled anywhere worth seeing.
            tl.to(
              p,
              { opacity: 0, duration: FLY * 0.3, ease: 'none' },
              at + CRACK + FLY * 0.7,
            );
          });

          /*
           * The sentence printed on the glass leaves with it, character by
           * character, on the same distance-from-centre wave. Measured off the
           * live layout rather than the viewBox — the text is DOM, so its
           * characters are in page pixels, not the SVG's coordinate space.
           */
          const glassText = q('glasstext');
          const wallEl = q('nervewall');
          if (glassText && wallEl) {
            // The sentence, character by character, plus every piece of
            // instrument furniture — all of it is printed on the same pane.
            const tc = [...splitChars(glassText), ...qa('glassbit')];
            const wr = wallEl.getBoundingClientRect();
            const wx = wr.left + wr.width / 2;
            const wy = wr.top + wr.height / 2;
            const reach = Math.hypot(wr.width / 2, wr.height / 2) || 1;

            tc.forEach((c, n) => {
              const r = c.getBoundingClientRect();
              const dx = r.left + r.width / 2 - wx;
              const dy = r.top + r.height / 2 - wy;
              const d = Math.hypot(dx, dy) || 1;
              const at = (d / reach + (n % 5) * 0.02) * SPREAD;
              tl.to(
                c,
                {
                  x: (dx / d) * (760 + d * 2.2),
                  y: (dy / d) * (620 + d * 2.2),
                  rotation: (n % 2 ? 1 : -1) * (20 + (n % 6) * 8),
                  duration: FLY,
                  ease: 'power2.in',
                },
                at + CRACK,
              );
              tl.to(
                c,
                { opacity: 0, duration: FLY * 0.3, ease: 'none' },
                at + CRACK + FLY * 0.7,
              );
            });
          }

          // The definition lands last, once the word it defines is uncovered.
          const def = q('nervedef');
          if (def) {
            gsap.set(def, { opacity: 0, y: 16 });
            tl.to(
              def,
              { opacity: 1, y: 0, duration: FLY * 0.8, ease: 'power2.out' },
              SPREAD * 0.86,
            );
          }
        }


        gsap.fromTo(
          nerve,
          { letterSpacing: "0.02em" },
          {
            letterSpacing: "-0.075em",
            ease: "none",
            scrollTrigger: {
              trigger: nerve,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      initStats(false);
      initSignal(false);


      ScrollTrigger.refresh();
      // Web fonts settling can change section heights after first paint.
      const refresh = setTimeout(() => ScrollTrigger.refresh(), 900);
      cleanups.push(() => clearTimeout(refresh));

      /* ---- metrics tape ----------------------------------------------- */
      /*
       * A horizontal tape of display-scale values slides so that each takes
       * the centre of the viewport in turn; the centred one fills solid while
       * its neighbours stand as outlines. The copy below travels vertically
       * with the same progress figure, so the two tracks read as one machine.
       *
       * The timeline alternates a move with a hold rather than running one
       * continuous sweep — the hold is what makes it read as a value arriving,
       * being shown, and then leaving.
       */
      function initStats(instant: boolean) {
        const reel = q("mreel");
        const sec = q("metrics");
        const tape = q("mxtape");
        if (!reel || !tape) return;

        const vals = qa("mxval");
        const fills = qa("mxfill");
        const slots = qa("mslot");
        const n = vals.length;
        if (!n) return;

        // Smoothstep on proximity to centre: the pour eases in and out
        // instead of moving at a constant rate, which is what makes it read
        // as liquid finding its level rather than a wiper blade.
        const near = (i: number, p: number) => {
          const t = Math.min(Math.max(1 - Math.abs(i - p), 0), 1);
          return t * t * (3 - 2 * t);
        };

        /*
         * Centred by measurement, not percentages: the values differ in width
         * ("0.9s" against "17"), so the distance between their centres is
         * irregular and only the layout knows it. Measured with the tape's
         * transform cleared, because getBoundingClientRect reports transformed
         * space and the offsets have to be in the tape's own.
         */
        let centers: number[] = [];
        const measure = () => {
          // Scale is part of the presentation, not the layout — cleared before
          // measuring so a value caught mid-breath doesn't skew its centre.
          gsap.set(tape, { x: 0 });
          gsap.set(vals, { scale: 1 });
          const left = tape.getBoundingClientRect().left;
          centers = vals.map((v) => {
            const r = v.getBoundingClientRect();
            return r.left - left + r.width / 2;
          });
        };

        const at = { p: 0 };
        const place = (p: number) => {
          if (!centers.length) return;
          // The tape position interpolates between neighbouring centres, so
          // irregular gaps still hand over at a constant reading pace.
          const i0 = Math.min(Math.floor(p), n - 1);
          const f = p - i0;
          const c =
            i0 >= n - 1
              ? centers[n - 1]
              : centers[i0] + (centers[i0 + 1] - centers[i0]) * f;
          gsap.set(tape, { x: reel.clientWidth / 2 - c });

          const active = Math.round(p);
          vals.forEach((v, i) => {
            v.dataset.on = i === active ? "1" : "0";
            const f = near(i, p);
            // The whole glyph breathes with its fill — rooted at the baseline
            // so it grows upward the way the ink pours upward.
            gsap.set(v, {
              scale: 0.94 + 0.06 * f,
              transformOrigin: "50% 85%",
            });
          });
          // The pour: clip tracks proximity, revealed from the baseline up.
          fills.forEach((el, i) => {
            el.style.clipPath = `inset(${((1 - near(i, p)) * 100).toFixed(2)}% 0 0 0)`;
          });
          // The gyroscope reads this from its own frame loop, the same way
          // the aeroplane reads the assembly store.
          setGauge(n > 1 ? p / (n - 1) : 1);
          /*
           * The copy travels and fades. A title and a paragraph crossing the
           * same slot in opposite directions is legible for neither, so each
           * slot is gone well before the next arrives — hence the 1.8, which
           * empties the box around the half-way point of a handover.
           */
          slots.forEach((item, i) => {
            gsap.set(item, {
              yPercent: (i - p) * 100,
              opacity: Math.max(0, 1 - Math.abs(i - p) * 1.8),
            });
          });
        };

        measure();
        place(0);
        /*
         * The vw-driven type re-rasterises on resize, so the centres move.
         * Re-measured on every refresh and re-placed at the current progress,
         * which keeps the active value centred through the resize.
         */
        const remeasure = () => {
          measure();
          place(at.p);
        };
        ScrollTrigger.addEventListener("refresh", remeasure);
        cleanups.push(() =>
          ScrollTrigger.removeEventListener("refresh", remeasure),
        );

        if (instant || n < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec ?? reel,
            pin: sec ?? undefined,
            start: "center center",
            /*
             * Roughly three quarters of a screen per handover, measured off the
             * viewport rather than written as a percentage: ScrollTrigger
             * resolves "+=100%" against the trigger's own height, and this
             * section is taller than the viewport, which stretched the pin to
             * about five screens for four values.
             */
            end: () => "+=" + (n - 1) * window.innerHeight * 0.88,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        const advance = () => place(at.p);
        /*
         * An opening hold, so the first value gets the same dwell as the rest.
         * Without it the timeline starts on a move: the section finishes
         * pinning and the reel immediately begins handing over, which means the
         * first metric is only ever read on the way in and never at rest.
         */
        tl.to(at, { p: 0, duration: 0.6, onUpdate: advance });
        for (let i = 1; i < n; i++) {
          tl.to(at, {
            p: i,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: advance,
          }).to(at, { p: i, duration: 0.6, onUpdate: advance });
        }
      }

      function initSignal(instant: boolean) {
        const sec = q("sig");
        const pin = q("sigpin");
        const steps = qa("sigstep");
        const nums = qa("spokenum");
        const forms = qa("sigform");
        const wheel = q("wheel");
        const glow = q("sigglow");
        if (!steps.length) return;

        const SPOKE = 30;
        const last = steps.length - 1;

        const setStep = (idx: number, prog: number) => {
          steps.forEach((s, i) => {
            const on = i === idx;
            s.dataset.on = on ? "1" : "0";
            /*
             * Deliberately no opacity here. The steps box clips, so a step
             * parked off it is already invisible, and fading one while it
             * travels is what stops the movement reading — halfway through a
             * swap both the outgoing and the incoming have to be fully painted
             * for the eye to follow them past the edge.
             */
            s.style.filter = on ? "blur(0px)" : "blur(5px)";
            // Steps already passed leave through the top, steps still to come
            // wait below. --slide is a percentage of the step's own height.
            s.style.transform = on
              ? "translateY(0)"
              : `translateY(calc(var(--slide) * ${i < idx ? -1 : 1}))`;
            s.style.pointerEvents = on ? "auto" : "none";
          });
          nums.forEach((n, i) => {
            n.dataset.on = i === idx ? "1" : "0";
          });
          /*
           * The aeroplane. Assembly runs from Brief to Build and the flight
           * belongs to Launch alone.
           *
           * Both gates are derived from where the steps actually change hands
           * rather than from an even division of the scrub. The step index above
           * rounds, so step n takes over at (n - 0.5) / last, not at n / last —
           * gating the flight on the latter started it a half step early, with
           * the aircraft already banking away while the copy still read BUILD.
           *
           * So: whole by the time Build lands, held there for that step, and
           * away on Launch. Published to the shared store rather than written to
           * the DOM, because the WebGL scene reads it every frame.
           */
          if (forms.length && last > 0) {
            const flyGate = (last - 0.5) / last;
            const buildGate = Math.max(0.2, (last - 1.5) / last);
            const built = Math.min(1, prog / buildGate);
            const fly = Math.min(
              1,
              Math.max(0, (prog - flyGate) / (1 - flyGate)),
            );
            setAssembly(1 - built, fly);
          }
          // Turned backwards so step 0 sits at the marker and later steps
          // arrive there in order.
          if (wheel) {
            wheel.style.setProperty(
              "--rot",
              `${(-prog * last * SPOKE).toFixed(2)}deg`,
            );
          }
          if (glow) {
            glow.style.transform = `translate(-50%,-50%) scale(${(
              0.5 +
              prog * 0.75
            ).toFixed(3)})`;
          }
        };

        setStep(0, 0);
        if (instant) return;

        ScrollTrigger.create({
          trigger: sec,
          pin,
          start: "top top",
          end: `+=${steps.length * 62}%`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Nearest step, so the highlight lands as a number passes the mark.
            const idx = Math.max(0, Math.min(last, Math.round(p * last)));
            setStep(idx, p);
          },
        });
      }

      cleanups.push(() => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger && el.contains(t.trigger as Node)) t.kill();
          else if (!t.trigger) t.kill();
        });
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, [root, lenis, ready]);
}
