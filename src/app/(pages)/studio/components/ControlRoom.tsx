"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The control room.
 *
 * A studio that sells design engineering should end the page by proving it
 * rather than claiming it — so the footer exposes what the page is actually
 * doing on your machine: frame rate, viewport, pixel ratio, scroll depth, the
 * GPU behind the WebGL work above, and whether motion is being honoured.
 *
 * Everything here is read, never invented. If a value cannot be obtained the
 * cell says so instead of showing a plausible number, because the whole point
 * of the panel is that it is real.
 *
 * The sampler only runs while the footer is on screen. A permanent rAF loop to
 * animate a number nobody is looking at would undercut the claim it is making.
 */

function Cell({
  k,
  v,
  wide,
  accent,
}: {
  k: string;
  v: string;
  wide?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={wide ? "zx-crcell zx-crcell--wide" : "zx-crcell"}>
      <dt className="zx-crk">{k}</dt>
      <dd className={accent ? "zx-crv zx-crv--acc" : "zx-crv"}>{v}</dd>
    </div>
  );
}

export default function ControlRoom() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState({ fps: "—", viewport: "—", scroll: "—" });
  const [rig, setRig] = useState({ dpr: "—", motion: "—", gpu: "reading…" });

  /* Fixed readings: the machine, taken once. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let gpu = "unavailable";
    try {
      const probe = document.createElement("canvas");
      const gl =
        probe.getContext("webgl2") ??
        (probe.getContext("webgl") as WebGLRenderingContext | null);
      if (gl) {
        /*
         * Most browsers mask the real adapter behind this extension now, and
         * some drop it entirely — falling back to the version string keeps the
         * cell honest rather than blank.
         */
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        const raw = dbg
          ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
          : gl.getParameter(gl.VERSION);
        if (raw) gpu = String(raw);
      }
    } catch {
      /* keep "unavailable" */
    }

    setRig({
      dpr: (window.devicePixelRatio || 1).toFixed(2),
      motion: reduced ? "reduced" : "full",
      // Adapter strings run long; the head of one identifies the GPU.
      gpu: gpu.replace(/^ANGLE \(|\)$/g, "").slice(0, 40),
    });
  }, []);

  /* Live readings, only while the panel is actually in view. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let frames = 0;
    let mark = 0;
    let running = false;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      frames += 1;
      const span = t - mark;
      if (span < 500) return;

      const doc = document.documentElement;
      const travel = doc.scrollHeight - window.innerHeight;
      setLive({
        fps: String(Math.min(240, Math.round((frames * 1000) / span))),
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        scroll: `${Math.round(travel > 0 ? (window.scrollY / travel) * 100 : 100)}%`,
      });
      frames = 0;
      mark = t;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        if (on && !running) {
          running = true;
          frames = 0;
          mark = performance.now();
          raf = requestAnimationFrame(tick);
        } else if (!on && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="zx-cr" ref={rootRef}>
      <div className="zx-crhead">
        <span className="zx-crtitle">Control room</span>
        <span className="zx-crrule" aria-hidden="true" />
        <span className="zx-crnote">Live, from your machine</span>
      </div>

      <dl className="zx-crgrid">
        <Cell k="Frame rate" v={live.fps} accent />
        <Cell k="Viewport" v={live.viewport} />
        <Cell k="Pixel ratio" v={rig.dpr} />
        <Cell k="Scroll depth" v={live.scroll} />
        <Cell k="Renderer" v={rig.gpu} wide />
        <Cell k="Motion" v={rig.motion} />
        {/* Filled by the shell's clock, same as the address block. */}
        <div className="zx-crcell">
          <dt className="zx-crk">Studio time</dt>
          <dd className="zx-crv" data-h="clock" data-suffix="IST">
            --:--:--
          </dd>
        </div>
        <Cell k="Availability" v="Two slots — Q4" accent />
      </dl>
    </div>
  );
}
