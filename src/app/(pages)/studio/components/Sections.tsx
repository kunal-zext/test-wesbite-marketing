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
  SERVICES,
  STAGES,
  STATS,
  TICKER,
} from "../data";
import FluidCanvas from "./FluidCanvas";
import Plane from "./Plane";
import Faq from "./Faq";
import ScopeForm from "./ScopeForm";
import Gauge from "./Gauge";

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
                  /*
                   * Flat accent, not the site's gradient utility: the headline
                   * is split per character and each glyph gets its own
                   * transform for the reveal and idle drift. A transformed
                   * child is its own rendering context, so an ancestor's
                   * background-clip:text cannot clip through it — the gradient
                   * would paint nothing and the letters would render
                   * transparent.
                   */
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
        <p className="zx-manitail" data-r="up">
          Everything else is logistics. Most sites are designed by committee,
          approved by consensus, and forgotten by lunch. Ours get built by five
          people in one room with one opinion, and they get shipped with something
          no competitor has the
        </p>
      </div>
    </section>
  );
}

/*
 * The wall, tiled into shards.
 *
 * A crack drawn over a solid panel reads as a scratch — glass breaks into
 * pieces, so the surface has to *be* pieces from the start. These tile the
 * panel exactly (neighbours share vertices), so at rest they are seamless and
 * the wall looks whole; the break is the shards moving apart and their edges
 * darkening.
 *
 * The pattern is the one real glass makes: radials out from the impact,
 * crossed by roughly concentric rings, with every angle and radius jittered so
 * no two panes match. Seeded rather than random — this is a server component,
 * so the geometry ships as markup and Math.random would re-break the wall on
 * every build.
 */
/*
 * Twenty spokes across eight bands — 160 panes. The count is what makes these
 * read as particles rather than slabs: at half this, the outer ring alone was
 * wide enough that a single flying piece covered most of the screen.
 *
 * The bands also stop at 640 rather than running out to 780. The furthest
 * corner of the viewBox is 588 from the centre, so anything past that is a
 * gigantic pane covering ground that was never visible.
 */
const SECTORS = 20;
const RINGS = [0, 45, 95, 155, 225, 305, 395, 500, 640];

/*
 * Sutherland–Hodgman, clipping a pane to the panel rectangle.
 *
 * A radial tessellation has to overshoot the corners of the rectangle it
 * covers, so the outer panes always stuck out past the panel. An `overflow`
 * clip hid that, but a clip is exactly what these must not have — they are
 * supposed to fly off the screen. Cutting the geometry instead gives panes that
 * end flush with the panel edge, like glass in a frame, and leaves nothing to
 * clip at all.
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
        {/*
         * The panes are the wall's surface, not an overlay on it — the element
         * behind them is dark, so every pane that shifts opens a real gap.
         * Split into five sets, one per letter, interleaved around the circle
         * so the damage spreads across the whole pane rather than sweeping it.
         */}
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
        {/* Rides on the glass, so it goes when the glass does. A question the
            break answers: the manifesto above ends "…no competitor has the",
            the glass asks what was missing, and the word behind is both the
            answer and the end of that sentence. */}
        {/*
          * Instrument furniture on the pane — corner brackets, an impact
          * crosshair and two mono labels. The panel was a bare slab with a
          * sentence on it; the page already speaks in registration marks and
          * hairlines, so the glass reads as a specimen under test. Every piece
          * carries data-h="glassbit" and leaves on the same wave the panes do.
          */}
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
        {/* Reads as the rest of the dictionary entry, so it does not repeat the
            headword the shatter just uncovered. Driven by that shatter rather
            than the page's generic reveal, so it arrives with the word it
            defines instead of ahead of it. */}
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
          {SERVICES.map((s) => (
            <div
              className="zx-svc"
              key={s.num}
              data-h="svc"
              data-mag="1"
              data-label="open"
            >
              <div className="zx-svcfill" data-h="svcfill" aria-hidden="true" />
              <div className="zx-svcrow" data-h="svcrow">
                <span className="zx-svcnum">{s.num}</span>
                <span className="zx-svcname">{s.name}</span>
                <span className="zx-svcdesc" data-h="svcdesc">
                  {s.desc}
                </span>
                <span className="zx-svcarrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The metrics tape.
 *
 * No panel, no photographs, no illustration: the numbers are the section, set
 * at the same display scale as the page's other signature moments and run as a
 * single horizontal tape. Scroll slides the tape so each value takes the centre
 * of the viewport in turn; the centred value fills in solid accent while its
 * neighbours stand as hollow outlines either side, so the reader always sees
 * where they are in the run without a single piece of chrome.
 *
 * The values are aria-hidden as a group — they are a visual instrument — and
 * each copy slot carries the figure in a visually-hidden span instead, so a
 * screen reader hears "41 — Flagship builds" exactly once.
 */
export function Stats() {
  return (
    <section className="zx-metrics" data-h="metrics">
      <div className="zx-metricsinner">
        <SectionHead title="By the numbers" aside="Measured, not claimed." />

        <div className="zx-mreel" data-h="mreel">
          {/*
           * The instrument, in three dimensions this time: a gyroscope — the
           * thing an aircraft actually measures with, and the bridge to the
           * aeroplane two sections down. It wears the airframe's exact
           * materials, its outer gimbal turns a quarter-revolution per metric
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

        {/*
         * The wheel. Its centre sits off-canvas to the left, so only the right
         * arc is on screen. Each spoke is a zero-height arm from the centre out
         * to the rim, fixed at its own angle; the container is what rotates, so
         * every number inherits the turn and reads as tilted. Whichever number
         * reaches the marker is upright simply because its spoke angle and the
         * wheel angle cancel there — no counter-rotation involved.
         */}
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
                  {/* The glyph turns independently of its box. Where the arc
                      moves to the top of the section the whole wheel is offset
                      a quarter turn, and the digits have to come back upright
                      without taking the marker dot off the rim with them. */}
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
            num="03"
            title="How it works"
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

export function FaqSection() {
  return (
    <section className="zx-sec" id="faq">
      <div className="zx-faqgrid">
        <SectionHead num="04" title="Straight answers" />
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
      {/*
       * A rounded island rather than a full-bleed strip, with the hero's fluid
       * filling it edge to edge behind a legibility veil. The page opens on
       * that shader and closes on it — a bookend, not a fade to flat black.
       * The loop gates on an IntersectionObserver, so this second instance
       * costs nothing until the footer is on screen, by which point the
       * hero's has gone idle.
       */}
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

        {/* One hairline strip instead of three columns of sitemap — the finale
            belongs to the statement and the wordmark. */}
        <div className="zx-footnav">
          <nav className="zx-fnavgroup" aria-label="Footer">
            {FOOTER_LINKS.studio.map((l) => (
              <a className="zx-fnavlink" href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="zx-fnavgroup">
            {FOOTER_LINKS.elsewhere.map((l) => (
              <a className="zx-fnavlink" href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </div>
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
