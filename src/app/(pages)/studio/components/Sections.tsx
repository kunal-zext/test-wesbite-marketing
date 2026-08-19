/**
 * Static sections of the Studio page.
 *
 * These are server components on purpose — they ship zero JavaScript. All the
 * motion attached to them is driven from `useMotion` via the `data-h` / `data-r`
 * hooks below, exactly as in the source design:
 *   data-r="up"    fade + rise on enter
 *   data-r="wipe"  clip-path reveal on enter
 *   data-h="..."   a named handle the motion layer queries for
 */

import {
  CONTACT,
  FOOTER_BAR,
  FOOTER_LINKS,
  HERO,
  INCLUDED,
  PILLARS,
  SERVICES,
  STAGES,
  STATS,
  TICKER,
  WORK,
} from "../data";
import FluidCanvas from "./FluidCanvas";
import Plane from "./Plane";
import Faq from "./Faq";
import ScopeForm from "./ScopeForm";
import Gauge from "./Gauge";
import { PILLAR_ART } from "./PillarArt";
import { BUILD_ART } from "./BuildArt";

function SectionHead({
  num,
  title,
  aside,
  asideProps,
}: {
  /** Omitted on sections that sit outside the numbered run. */
  num?: string;
  title: string;
  aside?: string;
  asideProps?: Record<string, string>;
}) {
  return (
    <div className="zx-shead">
      {num !== undefined && <span className="zx-snum">{num}</span>}
      <span>{title}</span>
      <span className="zx-sline" />
      {aside !== undefined && <span {...asideProps}>{aside}</span>}
    </div>
  );
}

export function Hero() {
  return (
    <section className="zx-hero" id="top" data-h="hero">
      <FluidCanvas />
      <div className="zx-herofade" aria-hidden="true" />

      <div className="zx-heroinner">
        <div className="zx-eyebrow" data-r="up">
          <span className="zx-livedot" aria-hidden="true" />
          <span>{HERO.eyebrow}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{HERO.place}</span>
        </div>

        <h1 className="zx-h1">
          {HERO.lines.map((line, i) => (
            <span className="zx-h1line" data-h="h1line" key={i}>
              {line.map((part, j) =>
                "em" in part && part.em ? (
                  /* Flat accent, not the gradient utility: each glyph is
                     transformed for the reveal, and a transformed child breaks
                     an ancestor's background-clip:text. */
                  <em key={j}>{part.text}</em>
                ) : (
                  <span key={j}>{part.text}</span>
                ),
              )}
            </span>
          ))}
        </h1>

        <div className="zx-herobottom">
          <div className="zx-lede">
            {HERO.lede.map((line, i) => (
              <p
                className={
                  "cta" in line[0] && line[0].cta
                    ? "zx-ledeline zx-ledeline--cta"
                    : "zx-ledeline"
                }
                data-r="up"
                key={i}
              >
                {line.map((part, j) =>
                  "em" in part && part.em ? (
                    <em className="zx-serif" key={j}>
                      {part.text}
                    </em>
                  ) : (
                    part.text
                  ),
                )}
              </p>
            ))}
          </div>
          <div className="zx-herobtns" data-r="up">
            <a
              className="zx-btn zx-btn--acc"
              href="#contact"
              data-mag="2"
              data-label="let's go"
            >
              <span>{HERO.cta}</span>
              <span className="zx-btnarrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="zx-btn zx-btn--ghost"
              href="#process"
              data-mag="2"
              data-label="view"
            >
              <span>See the process</span>
              <span className="zx-btnarrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="zx-ticker">
        <div className="zx-tickertrack">
          {[0, 1].map((copy) => (
            <div
              className="zx-tickergroup"
              key={copy}
              aria-hidden={copy === 1 || undefined}
            >
              {TICKER.map((t) => (
                <span key={t} style={{ display: "contents" }}>
                  <span>{t}</span>
                  <span className="zx-star">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="zx-scrollhint" data-h="scrollhint" aria-hidden="true">
        <span>Scroll</span>
        <span className="zx-scrollline" />
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="zx-sec zx-manisec" id="studio" data-r="wipe">
      <div className="zx-inner">
        <SectionHead num="01" title="Manifesto" />
        <p className="zx-mani" data-h="mani">
          We don&rsquo;t sell websites. We sell the{" "}
          <em className="zx-serif hero-title-gradient-animated">
            eleven seconds
          </em>{" "}
          after someone lands, when they stop, lean in, and decide
          you&rsquo;re serious.
        </p>
        {/* Ends suspended, not truncated: the ellipsis is the cue that the
            sentence continues, and the shattering wall two sections down
            supplies its missing noun. Keep the two in step. */}
        <p className="zx-manitail" data-r="up">
          Everything else is logistics. Most sites are designed by committee,
          approved by consensus, and forgotten by lunch. Ours get built by five
          people in one room with one opinion, and they get shipped with
          something no competitor has the&hellip;
        </p>
      </div>
    </section>
  );
}

/*
 * The wall, tiled into shards.
 *
 * The surface *is* pieces from the start: panes tile the panel exactly
 * (neighbours share vertices), so at rest it looks whole and the break is
 * simply the panes moving apart. Radials out from the impact crossed by
 * concentric rings, every angle and radius jittered so no two match. Seeded,
 * not random — this is a server component, so the geometry ships as markup.
 *
 * 20 spokes x 8 bands = 160 panes; fewer and a single flying piece covers
 * most of the screen. Bands stop at 640 because the viewBox's furthest
 * corner is 588 from the centre.
 */
const SECTORS = 20;
const RINGS = [0, 45, 95, 155, 225, 305, 395, 500, 640];

/*
 * Sutherland–Hodgman, clipping a pane to the panel rectangle.
 *
 * A radial tessellation overshoots the corners it covers. Cutting the geometry
 * leaves panes flush with the panel edge, so the group needs no `overflow`
 * clip — which it must not have, since the panes fly off screen.
 */
type Pt = [number, number];
function clipToPanel(pts: Pt[], x1: number, y1: number): Pt[] {
  const inside = [
    (p: Pt) => p[0] >= 0,
    (p: Pt) => p[0] <= x1,
    (p: Pt) => p[1] >= 0,
    (p: Pt) => p[1] <= y1,
  ];
  const cut = [
    (a: Pt, b: Pt): Pt => [0, a[1] + ((b[1] - a[1]) * (0 - a[0])) / (b[0] - a[0])],
    (a: Pt, b: Pt): Pt => [x1, a[1] + ((b[1] - a[1]) * (x1 - a[0])) / (b[0] - a[0])],
    (a: Pt, b: Pt): Pt => [a[0] + ((b[0] - a[0]) * (0 - a[1])) / (b[1] - a[1]), 0],
    (a: Pt, b: Pt): Pt => [a[0] + ((b[0] - a[0]) * (y1 - a[1])) / (b[1] - a[1]), y1],
  ];
  let out = pts;
  for (let e = 0; e < 4 && out.length; e++) {
    const inp = out;
    out = [];
    for (let i = 0; i < inp.length; i++) {
      const cur = inp[i];
      const prev = inp[(i + inp.length - 1) % inp.length];
      const ci = inside[e](cur);
      const pi = inside[e](prev);
      if (ci) {
        if (!pi) out.push(cut[e](prev, cur));
        out.push(cur);
      } else if (pi) {
        out.push(cut[e](prev, cur));
      }
    }
  }
  return out;
}

function shatter() {
  const cx = 500;
  const cy = 310;
  let s = 20260812 >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

  const angles: number[] = [];
  for (let i = 0; i < SECTORS; i++) {
    angles.push((i / SECTORS) * Math.PI * 2 + (rnd() - 0.5) * 0.24);
  }
  angles.push(angles[0] + Math.PI * 2);

  // One radius per ring per spoke, so the rings buckle instead of being circles.
  const rad = RINGS.map((r) => angles.map(() => r * (0.8 + rnd() * 0.4)));
  rad.forEach((row) => {
    row[row.length - 1] = row[0]; // close the loop on the shared spoke
  });

  const pt = (ri: number, ai: number) =>
    [
      cx + Math.cos(angles[ai]) * rad[ri][ai],
      cy + Math.sin(angles[ai]) * rad[ri][ai],
    ] as const;

  const out: { pts: string; sector: number }[] = [];
  for (let ri = 0; ri < RINGS.length - 1; ri++) {
    for (let ai = 0; ai < SECTORS; ai++) {
      const quad: Pt[] =
        ri === 0
          ? [[cx, cy], [...pt(1, ai)] as Pt, [...pt(1, ai + 1)] as Pt]
          : [
              [...pt(ri, ai)] as Pt,
              [...pt(ri, ai + 1)] as Pt,
              [...pt(ri + 1, ai + 1)] as Pt,
              [...pt(ri + 1, ai)] as Pt,
            ];
      const clipped = clipToPanel(quad, 1000, 620);
      // Rings past the corners leave nothing behind once cut.
      if (clipped.length < 3) continue;
      out.push({
        pts: clipped.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
        sector: ai,
      });
    }
  }
  return out;
}

const SHARDS = shatter();

export function Nerve() {
  return (
    <section className="zx-nerve" data-h="nerve">
      {/* The wall the letters land on, and break. */}
      <div className="zx-nervewall" data-h="nervewall">
        {/* Five sets interleaved around the circle, so the break spreads
            across the whole pane rather than sweeping it. */}
        <svg
          className="zx-shatter"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((g) => (
            <g className="zx-shardset" data-h="shardset" key={g}>
              {SHARDS.filter((s) => s.sector % 5 === g).map((s, i) => (
                <polygon className="zx-shard" key={i} points={s.pts} />
              ))}
            </g>
          ))}
        </svg>
        <div className="zx-nervewordclip">
          <div className="zx-nerveword" data-h="nerveword">
            Nerve
          </div>
        </div>
        {/* Instrument furniture — brackets, crosshair, mono labels — so the
            pane reads as a specimen under test. Every piece is data-h
            "glassbit" and leaves on the same wave as the panes. */}
        <div className="zx-glassui" aria-hidden="true">
          <span className="zx-gcorner zx-gcorner--tl" data-h="glassbit" />
          <span className="zx-gcorner zx-gcorner--tr" data-h="glassbit" />
          <span className="zx-gcorner zx-gcorner--bl" data-h="glassbit" />
          <span className="zx-gcorner zx-gcorner--br" data-h="glassbit" />
          <span className="zx-glabel zx-glabel--tl" data-h="glassbit">
            Pane 01 / tempered
          </span>
          <span className="zx-glabel zx-glabel--br" data-h="glassbit">
            Impact / centre
          </span>
          <span className="zx-gcross" data-h="glassbit" />
          <span className="zx-grule zx-grule--l" data-h="glassbit" />
          <span className="zx-grule zx-grule--r" data-h="glassbit" />
        </div>
        <div className="zx-glasstext" data-h="glasstext">
          {/* Inner block on purpose: the splitter puts real space nodes between
              the words, and a flex container drops whitespace-only children. */}
          <span className="zx-glasstextin">
            What was your last agency missing?
          </span>
        </div>
      </div>
      <div className="zx-nervedefwrap">
        {/* The rest of the dictionary entry. Driven by the shatter, not the
            generic reveal, so it arrives with the word it defines. */}
        <div className="zx-nervedef" data-h="nervedef">
          noun: the thing your last agency didn&rsquo;t have
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="zx-sec zx-sec--alt" data-r="wipe">
      <div className="zx-inner">
        <SectionHead num="02" title="What we do" aside="Build it. Rank it. Fix it." />
        <div className="zx-svcwrap">
          {/* Statements, not links — there are no per-service pages. The wipe
              is emphasis only; add a cursor label, data-mag or an arrow here
              only once these have an href. */}
          {SERVICES.map((s) => (
            <div className="zx-svc" key={s.num} data-h="svc">
              <div className="zx-svcfill" data-h="svcfill" aria-hidden="true" />
              <div className="zx-svcrow" data-h="svcrow">
                <span className="zx-svcnum">{s.num}</span>
                <span className="zx-svcname">{s.name}</span>
                <span className="zx-svcdesc" data-h="svcdesc">
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * The metrics tape. Scroll slides it so each value takes the centre in turn:
 * the centred one fills solid, its neighbours stand as hollow outlines.
 *
 * The tape is aria-hidden as a visual instrument; each copy slot repeats the
 * figure in a visually-hidden span, so a screen reader hears it once.
 */
/*
 * Four claims as a deck the reader throws. The section pins; each card owns a
 * 1/N slice of it, flinging itself off screen while the ones behind promote
 * forward. A plain grid until useMotion stacks it, so it reads with no JS.
 */
export function Pillar() {
  return (
    <section className="zx-pillars" id="pillars" data-h="pil">
      <div className="zx-pilpin" data-h="pilpin">
        <div className="zx-pilhead">
          <SectionHead
            num="03"
            title="What makes a website work"
            aside={`01 / 0${PILLARS.length}`}
            asideProps={{ "data-h": "pilcount" }}
          />
          <p className="zx-plede">
            A website earns its keep when it does a few things well. Whether we
            build yours from a brief or improve one you already have, we make
            sure it does all four.
          </p>
        </div>

        <div className="zx-pdeck" data-h="pdeck">
          {PILLARS.map((p, i) => (
            <article
              className="zx-pcard"
              data-h="pcard"
              key={p.num}
              style={{ "--d": i } as React.CSSProperties}
            >
              <span className="zx-pnum">{p.num}</span>
              <div className="zx-pcopy">
                <h3 className="zx-ptitle">{p.title}</h3>
                <p className="zx-pdesc">{p.desc}</p>
              </div>
              <div className="zx-part" aria-hidden="true">
                {PILLAR_ART[i]}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * What you get. Six plates fly in from alternating sides and slam into a
 * stack as the reader scrolls — the claim made physically.
 *
 * Sits after the process and answers it: those are the steps, this is what
 * they hand you. Keep it to deliverables; restating the pillars above makes
 * two consecutive sections say the same thing.
 *
 * A plain list of plates with no JS, so the stack is simply already built.
 */
export function Build() {
  return (
    <section className="zx-build" id="included" data-h="bld">
      <div className="zx-bldpin" data-h="bldpin">
        <SectionHead
          num="05"
          title="What you get"
          aside={`01 / 0${INCLUDED.length}`}
          asideProps={{ "data-h": "bldcount" }}
        />
        <p className="zx-bldlede">
          Every engagement hands over the same six things.
        </p>
        {/* Hands the reader over from the process section. */}
        <p className="zx-bldsub">
          Whatever the brief, those five steps end in the same handover. Fixed
          scope, nothing itemised back to you later.
        </p>

        <div className="zx-bldstack" data-h="bldstack">
          {INCLUDED.map((item, i) => (
            /* The bay is the recess the plate lands in; its ghost keeps the
               row legible before the plate arrives. The ghost is decorative —
               the plate carries the real text. */
            <div className="zx-bldbay" data-h="bldbay" key={item.title}>
              <span className="zx-bldghost" aria-hidden="true">
                <span className="zx-bldnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="zx-bldtitle">{item.title}</span>
                <span />
                <span className="zx-bldart">{BUILD_ART[i]}</span>
                <span className="zx-bldpip" />
              </span>
              <article className="zx-bldslab" data-h="bldslab">
                <span className="zx-bldnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="zx-bldtitle">{item.title}</h3>
                <p className="zx-blddesc">{item.desc}</p>
                <span className="zx-bldart" aria-hidden="true">
                  {BUILD_ART[i]}
                </span>
                <span className="zx-bldpip" aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="zx-metrics" data-h="metrics">
      <div className="zx-metricsinner">
        <SectionHead
          num="06"
          title="By the numbers"
          aside="Measured, not claimed."
        />

        <div className="zx-mreel" data-h="mreel">
          {/*
           * The instrument, in three dimensions this time: a gyroscope — the
           * thing an aircraft actually measures with, and a callback to the
           * aeroplane the reader watched assemble back in the process section.
           * It wears that airframe's exact materials, so the machine the page
           * built earlier is now the machine measuring itself. Its outer
           * gimbal turns a quarter-revolution per metric
           * with the scroll, and the inner rings precess on their own time so
           * it stays alive between readings.
           */}
          <div className="zx-mxgaugebox" aria-hidden>
            <Gauge />
          </div>

          <div className="zx-mxtape" data-h="mxtape" aria-hidden>
            {STATS.map((s) => (
              <span className="zx-mxval" data-h="mxval" key={s.title}>
                {s.value}
                {/*
                 * The ink. A solid copy of the same glyphs over the outline,
                 * revealed bottom-up by a clip that tracks scroll — the number
                 * pours full as it arrives instead of switching on.
                 */}
                <span className="zx-mxvalfill" data-h="mxfill">
                  {s.value}
                </span>
              </span>
            ))}
          </div>

          <div className="zx-mxinfo">
            {STATS.map((s) => (
              <div className="zx-mslot" data-h="mslot" key={s.title}>
                <div className="zx-mtitle">
                  <span className="zx-msr">{s.value}: </span>
                  {s.title}
                </div>
                <p className="zx-mdesc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export function Signal() {
  return (
    <section className="zx-sig" id="process" data-h="sig">
      <div className="zx-sigpin" data-h="sigpin">
        <div className="zx-sigglow" data-h="sigglow" aria-hidden="true" />

        {/* The wheel, centred off-canvas so only its right arc shows. Spokes
            are zero-height arms fixed at their own angle; the container turns,
            so a number is upright exactly where its angle cancels the wheel's. */}
        <div className="zx-wheel" aria-hidden="true">
          <div className="zx-wheelarc" />
          <div className="zx-wheelspin" data-h="wheel">
            {STAGES.map((s, i) => (
              <div
                className="zx-spoke"
                key={s.title}
                style={{ "--a": `${i * 30}deg` } as React.CSSProperties}
              >
                <span className="zx-spokenum" data-h="spokenum">
                  {/* Turns independently of its box, so the digits can come
                      back upright without moving the marker dot off the rim. */}
                  <span className="zx-spokedigit">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="zx-siginner">
          <SectionHead
            num="04"
            title="How we work"
            aside="Five steps. Weeks, not months."
          />

          <div className="zx-sigsteps">
            {STAGES.map((s, i) => (
              <div className="zx-sigstep" key={s.title} data-h="sigstep">
                <h3 className="zx-sigtitle">{s.title}</h3>
                <p className="zx-sigtext">{s.text}</p>
                <div className="zx-sigtags">
                  {s.tags.map((t) => (
                    <span className="zx-sigtag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*
         * The steps visualised: parts scattered at Brief, converging through
         * Draft and Direct, whole at Build, gone at Launch. The motion layer
         * writes two custom properties onto this and the parts do the rest.
         */}
        <div className="zx-sigform" data-h="sigform">
          <Plane />
        </div>
      </div>
    </section>
  );
}

/*
 * Selected work: evidence, placed between the deliverables and the metrics so
 * the argument runs claim → method → deliverable → evidence → measurement.
 *
 * Renders nothing while WORK is empty, which is how it ships. Filling WORK
 * brings it back at 06 and shifts Stats, FAQ and Contact down one.
 */
export function Work() {
  if (!WORK.length) return null;
  return (
    <section className="zx-sec zx-sec--alt" id="work" data-r="wipe">
      <div className="zx-inner">
        <SectionHead num="06" title="Selected work" />
        <div className="zx-workgrid">
          {WORK.map((w) => (
            <article className="zx-workcard" key={w.name} data-r="up">
              <span className="zx-worksector">{w.sector}</span>
              <h3 className="zx-workname">{w.name}</h3>
              <p className="zx-workresult">{w.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="zx-sec" id="faq">
      <div className="zx-faqgrid">
        {/* One block, so the grid's gap separates it from the accordion
            rather than the heading from its own lede. */}
        <div className="zx-faqhead">
          <SectionHead num="07" title="Questions" />
          <p className="zx-faqlede">Things people ask us.</p>
          {/* The last thing before the form — somewhere to go for a reader
              whose question is not on the list. */}
          <p className="zx-faqask">
            Not the one you had in mind? Send a brief and we will answer it on
            the first call.
          </p>
          <a className="zx-faqcta" href="#contact" data-mag="1" data-label="go">
            Start a project
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <Faq />
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="zx-sec zx-form" id="contact">
      <div className="zx-forminner">
        <ScopeForm />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="zx-foot" data-h="foot">
      {/* A rounded island carrying the hero's shader behind a legibility
          veil, so the page closes on what it opened with. The loop gates on
          an IntersectionObserver, so this second canvas idles until seen. */}
      <div className="zx-footpanel">
        <div className="zx-footfluid" aria-hidden="true">
          <FluidCanvas />
          {/* Frost first, tint second: the blur is masked so the top half of
              the island reads as glass while the floor stays liquid. */}
          <div className="zx-footfluidblur" />
          <div className="zx-footfluidfade" />
        </div>

        <div className="zx-footinner">
        <div className="zx-footlead">
          <div className="zx-footline">
            <span>You read the whole thing.</span>{' '}
            <em className="zx-serif">Now send the brief.</em>
          </div>
          <div className="zx-footcta">
            <a
              className="zx-btn zx-btn--acc"
              href="#contact"
              data-mag="2"
              data-label="let's go"
            >
              <span>{HERO.cta}</span>
              <span className="zx-btnarrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="zx-footmail"
              href={`mailto:${CONTACT.email}`}
              data-mag="2"
              data-label="say hi"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        {/* One hairline strip; see .zx-footnav. */}
        <div className="zx-footnav">
          <nav className="zx-fnavgroup" aria-label="Footer">
            {FOOTER_LINKS.studio.map((l) => (
              <a className="zx-fnavlink" href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </nav>
          {/* Offsite: noreferrer as well as noopener. */}
          <nav className="zx-fnavgroup" aria-label="Elsewhere">
            {FOOTER_LINKS.elsewhere.map((l) => (
              <a
                className="zx-fnavlink"
                href={l.href}
                key={l.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="zx-fnavgroup zx-fnavmeta">
            <span>{CONTACT.address[0]}</span>
            <span className="zx-footclock" data-h="clock" data-suffix="IST">
              --:--:--
            </span>
          </div>
        </div>

          <div className="zx-footbar">
            {FOOTER_BAR.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
