"use client";

import { useEffect, useRef } from "react";

/**
 * A boxy tracked utility robot in the studio's kit — navy hull, cyan-lit
 * binocular eyes on a segmented neck, articulated arms, tank treads.
 *
 * Inspired by the archetype only (box body, binocular unit, treads — all
 * generic robot vocabulary far older than any one film); the proportions,
 * palette and details are this site's own, so the character is ours to ship.
 *
 * Rendered for volume rather than as flat marks: every part carries a
 * directional light story — key light high left, ambient navy, and the same
 * purple rim from below that the aeroplane wears. Cylinders (treads, neck,
 * lens barrels) get cylindrical gradients; boxes get a lit top face; parts
 * that meet cast soft occlusion on each other. That layering, not any single
 * effect, is what makes it read as a thing instead of a drawing.
 */
export type Emote =
  | "idle"
  | "happy"
  | "sad"
  | "curious"
  | "down"
  | "wave"
  | "drive";

export default function Bot({
  emote,
  speaking = false,
  pw = 1,
  cheer = false,
}: {
  emote: Emote;
  speaking?: boolean;
  pw?: number;
  cheer?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const unitRef = useRef<SVGGElement>(null);

  // Pointer study: the eye unit tilts toward the cursor, pupils lead.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const svg = svgRef.current;
        const unit = unitRef.current;
        if (!svg || !unit) return;
        const r = svg.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.35);
        const tilt = Math.max(-10, Math.min(10, dx / 55));
        const nod = Math.max(-6, Math.min(8, dy / 60));
        unit.style.transform = `rotate(${tilt.toFixed(2)}deg) translateY(${nod.toFixed(1)}px)`;
        const d = Math.hypot(dx, dy) || 1;
        const m = Math.min(4.5, d / 60);
        const pt = `translate(${((dx / d) * m).toFixed(2)}px, ${((dy / d) * m).toFixed(2)}px)`;
        svg.querySelectorAll<SVGGElement>(".zxbot-pupil").forEach((g) => {
          g.style.transform = pt;
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="zxbot"
      viewBox="0 0 360 380"
      data-emote={emote}
      data-speak={speaking ? "1" : "0"}
      data-cheer={cheer ? "1" : "0"}
      style={{ "--pw": pw } as React.CSSProperties}
      aria-hidden="true"
    >
      <defs>
        {/* front faces: key light from high left */}
        <linearGradient id="zxbot-hull" x1="0.15" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#3a4787" />
          <stop offset="0.45" stopColor="#212b58" />
          <stop offset="1" stopColor="#131938" />
        </linearGradient>
        {/* lit top faces */}
        <linearGradient id="zxbot-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#55639f" />
          <stop offset="1" stopColor="#2b3568" />
        </linearGradient>
        {/* cylinders: dark - light - dark across the barrel */}
        <linearGradient id="zxbot-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d1226" />
          <stop offset="0.35" stopColor="#2e3a74" />
          <stop offset="0.55" stopColor="#39468a" />
          <stop offset="1" stopColor="#0d1226" />
        </linearGradient>
        <linearGradient id="zxbot-cylv" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10152c" />
          <stop offset="0.5" stopColor="#2c3568" />
          <stop offset="1" stopColor="#10152c" />
        </linearGradient>
        {/* tread rubber */}
        <linearGradient id="zxbot-rubber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#191d30" />
          <stop offset="0.5" stopColor="#0b0e1c" />
          <stop offset="1" stopColor="#05060c" />
        </linearGradient>
        {/* purple rim, up from below — the aeroplane's signature */}
        <linearGradient id="zxbot-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="0.55" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="1" stopColor="rgba(140,82,255,0.65)" />
        </linearGradient>
        {/* lens barrel: deep at centre, lit at the mouth */}
        <radialGradient id="zxbot-barrel">
          <stop offset="0" stopColor="#05070f" />
          <stop offset="0.72" stopColor="#0a0e1e" />
          <stop offset="0.92" stopColor="#232c58" />
          <stop offset="1" stopColor="#39468a" />
        </radialGradient>
        <radialGradient id="zxbot-iris">
          <stop offset="0" stopColor="#eafaff" />
          <stop offset="0.35" stopColor="#8fe0ff" />
          <stop offset="1" stopColor="#2d7fb0" />
        </radialGradient>
        {/* soft occlusion pool where parts meet */}
        <radialGradient id="zxbot-ao">
          <stop offset="0" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="zxbot-glowfloor">
          <stop offset="0" stopColor="rgba(140,82,255,0.25)" />
          <stop offset="1" stopColor="rgba(140,82,255,0)" />
        </radialGradient>
      </defs>

      {/* ground: purple bounce light, then the contact shadow */}
      <ellipse fill="url(#zxbot-glowfloor)" cx="180" cy="348" rx="150" ry="26" />
      <ellipse className="zxbot-shadow" cx="180" cy="352" rx="104" ry="12" />

      <g className="zxbot-rig">
        {/* ---- treads ---------------------------------------------------- */}
        <g className="zxbot-treads">
          {/* rubber loops with a lit crown */}
          <rect x="66" y="292" width="102" height="52" rx="26" fill="url(#zxbot-rubber)" />
          <rect x="192" y="292" width="102" height="52" rx="26" fill="url(#zxbot-rubber)" />
          <rect x="66" y="292" width="102" height="52" rx="26" fill="none" stroke="url(#zxbot-rim)" strokeWidth="1.6" />
          <rect x="192" y="292" width="102" height="52" rx="26" fill="none" stroke="url(#zxbot-rim)" strokeWidth="1.6" />
          {/* top-of-tread highlight: light catching the upper run */}
          <path d="M84 296 h66" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M210 296 h66" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* rolling links */}
          <rect className="zxbot-links" x="72" y="298" width="90" height="40" rx="20" />
          <rect className="zxbot-links" x="198" y="298" width="90" height="40" rx="20" />
          {/* hubs: shaded discs with an axle glint */}
          {[92, 117, 142, 218, 243, 268].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="318" r="8.5" fill="url(#zxbot-cylv)" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
              <circle cx={cx - 2} cy="316" r="2.6" fill="rgba(143,224,255,0.55)" />
            </g>
          ))}
        </g>

        {/* body sits ON the treads: occlusion pooling between them */}
        <ellipse fill="url(#zxbot-ao)" cx="180" cy="300" rx="92" ry="14" />

        {/* ---- body: a lit box, not a rectangle -------------------------- */}
        <g className="zxbot-bodyg">
          {/* top face first, tucked behind the front */}
          <path d="M104 176 L256 176 L246 165 L114 165 Z" fill="url(#zxbot-top)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          {/* front face */}
          <rect x="92" y="176" width="176" height="126" rx="18" fill="url(#zxbot-hull)" />
          <rect x="92" y="176" width="176" height="126" rx="18" fill="none" stroke="url(#zxbot-rim)" strokeWidth="1.8" />
          {/* inner panel, recessed: dark upper lip sells the inset */}
          <rect x="106" y="190" width="148" height="98" rx="12" fill="rgba(0,0,0,0.22)" />
          <rect x="106" y="190" width="148" height="98" rx="12" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <path d="M112 192 h136" stroke="rgba(0,0,0,0.45)" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* hatch seam + vents, shadow line under each */}
          <line x1="106" y1="238" x2="254" y2="238" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
          <line x1="106" y1="239.5" x2="254" y2="239.5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <g strokeLinecap="round">
            <line x1="122" y1="256" x2="152" y2="256" stroke="rgba(0,0,0,0.5)" strokeWidth="3" />
            <line x1="122" y1="266" x2="152" y2="266" stroke="rgba(0,0,0,0.5)" strokeWidth="3" />
            <line x1="122" y1="254.5" x2="152" y2="254.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="122" y1="264.5" x2="152" y2="264.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </g>
          {/* corner screws */}
          {[
            [100, 184],
            [260, 184],
            [100, 294],
            [260, 294],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="rgba(255,255,255,0.18)" />
          ))}
          {/* chest light in a recessed well */}
          <circle cx="228" cy="262" r="9" fill="rgba(0,0,0,0.5)" />
          <circle className="zxbot-light" cx="228" cy="262" r="5.5" />
        </g>

        {/* ---- arms (in front of the hull, so a raised wave stays visible) ------------------------------------ */}
        <g className="zxbot-arm zxbot-arm--l">
          <rect x="52" y="206" width="52" height="16" rx="8" fill="url(#zxbot-cyl)" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <rect x="38" y="200" width="20" height="28" rx="5" fill="url(#zxbot-hull)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
          <line x1="44" y1="206" x2="44" y2="222" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
        </g>
        <g className="zxbot-arm zxbot-arm--r">
          <rect x="256" y="206" width="52" height="16" rx="8" fill="url(#zxbot-cyl)" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <rect x="302" y="200" width="20" height="28" rx="5" fill="url(#zxbot-hull)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
          <line x1="316" y1="206" x2="316" y2="222" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
        </g>

        {/* ---- neck: two shaded cylinders with a joint --------------------- */}
        <g className="zxbot-neck">
          <ellipse fill="url(#zxbot-ao)" cx="180" cy="176" rx="26" ry="7" />
          <rect x="171" y="148" width="18" height="34" rx="9" fill="url(#zxbot-cylv)" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <rect x="173.5" y="124" width="13" height="30" rx="6.5" fill="url(#zxbot-cylv)" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <circle cx="180" cy="150" r="5" fill="url(#zxbot-hull)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        {/* ---- the eye unit: two lens barrels ------------------------------ */}
        <g className="zxbot-unit" ref={unitRef}>
          {/* occlusion under the unit, on the neck */}
          <ellipse fill="url(#zxbot-ao)" cx="180" cy="132" rx="34" ry="8" />

          <g className="zxbot-eye zxbot-eye--l">
            <rect className="zxbot-housing" x="84" y="64" width="88" height="66" rx="33" fill="url(#zxbot-hull)" />
            <rect x="84" y="64" width="88" height="66" rx="33" fill="none" stroke="url(#zxbot-rim)" strokeWidth="1.8" />
            {/* housing top sheen */}
            <path d="M104 70 q24 -7 48 0" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* the barrel: rim, throat, glass */}
            <circle cx="128" cy="97" r="26" fill="url(#zxbot-cyl)" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
            <circle cx="128" cy="97" r="21" fill="url(#zxbot-barrel)" />
            <g className="zxbot-pupil">
              <circle className="zxbot-iris" cx="128" cy="97" r="9.5" fill="url(#zxbot-iris)" />
              <circle className="zxbot-catch" cx="132" cy="93" r="2.8" />
              <circle cx="124" cy="101" r="1.4" fill="rgba(255,255,255,0.5)" />
            </g>
            {/* glass: a curved reflection across the lens mouth */}
            <path d="M112 86 a21 21 0 0 1 24 -6 a26 26 0 0 0 -24 6" fill="rgba(255,255,255,0.14)" />
            <rect className="zxbot-lid" x="84" y="64" width="88" height="66" rx="33" />
            <path className="zxbot-happy" d="M114 102 q14 -16 28 0" />
          </g>

          <g className="zxbot-eye zxbot-eye--r">
            <rect className="zxbot-housing" x="188" y="64" width="88" height="66" rx="33" fill="url(#zxbot-hull)" />
            <rect x="188" y="64" width="88" height="66" rx="33" fill="none" stroke="url(#zxbot-rim)" strokeWidth="1.8" />
            <path d="M208 70 q24 -7 48 0" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="232" cy="97" r="26" fill="url(#zxbot-cyl)" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
            <circle cx="232" cy="97" r="21" fill="url(#zxbot-barrel)" />
            <g className="zxbot-pupil">
              <circle className="zxbot-iris" cx="232" cy="97" r="9.5" fill="url(#zxbot-iris)" />
              <circle className="zxbot-catch" cx="236" cy="93" r="2.8" />
              <circle cx="228" cy="101" r="1.4" fill="rgba(255,255,255,0.5)" />
            </g>
            <path d="M216 86 a21 21 0 0 1 24 -6 a26 26 0 0 0 -24 6" fill="rgba(255,255,255,0.14)" />
            <rect className="zxbot-lid" x="188" y="64" width="88" height="66" rx="33" />
            <path className="zxbot-happy" d="M218 102 q14 -16 28 0" />
          </g>

          {/* bridge joining the binoculars, with its own top light */}
          <rect className="zxbot-bridge" x="168" y="86" width="24" height="22" rx="8" fill="url(#zxbot-cylv)" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <path d="M172 88 h16" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}
