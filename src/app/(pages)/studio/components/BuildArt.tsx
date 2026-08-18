/**
 * One glyph per deliverable, for the plates in "What you get".
 *
 * The section was the only major one on the page carrying no artefact — the
 * pillars have their diagrams, the process has the aeroplane, the metrics have
 * the gyroscope — and it read as a list of sentences rather than as a set of
 * things you receive. These give each plate an object to be identified by.
 *
 * Drawn in the page's technical-drawing idiom: thin strokes, no fills, plenty
 * of air, and every one built on the same 48-unit square so they optically
 * match in a stack. They paint in `currentColor`, so the plate decides the
 * colour — dim while it waits, accent once it lands — without this file
 * knowing anything about the section's state.
 *
 * Server components. No hooks, no client bundle: they ship as markup.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <g {...S}>{children}</g>
    </svg>
  );
}

export const BUILD_ART = [
  /* 01 Design & art direction — a bezier with its control handle out. */
  <Frame key="design">
    <path d="M7 38C15 15 31 13 41 23" />
    <path d="M7 38 18 21" opacity=".5" />
    <circle cx="7" cy="38" r="2.6" />
    <circle cx="18" cy="21" r="2" opacity=".7" />
    <circle cx="41" cy="23" r="2.6" />
  </Frame>,

  /* 02 Words & structure — a heading with body set under it. */
  <Frame key="words">
    <path d="M9 13h17" strokeWidth="3.4" />
    <path d="M9 23h30M9 30h30M9 37h19" />
  </Frame>,

  /* 03 Production code — brackets around a slash. */
  <Frame key="code">
    <path d="M18 14 8 24l10 10" />
    <path d="M30 14l10 10-10 10" />
    <path d="M27 12 21 36" opacity=".55" />
  </Frame>,

  /* 04 Search groundwork — a lens with the crosshair of a registration mark. */
  <Frame key="search">
    <circle cx="21" cy="21" r="11" />
    <path d="M29.5 29.5 40 40" />
    <path d="M10 21h22M21 10v22" opacity=".45" />
  </Frame>,

  /* 05 Launch & handover — it leaves the tray it was built in. */
  <Frame key="launch">
    <path d="M10 31v7h28v-7" />
    <path d="M24 31V10" />
    <path d="m17 17 7-7 7 7" />
  </Frame>,

  /* 06 Post-launch tuning — two faders, set to different marks. */
  <Frame key="tune">
    <path d="M9 17h30M9 31h30" />
    <circle cx="19" cy="17" r="4" />
    <circle cx="31" cy="31" r="4" />
  </Frame>,
];
