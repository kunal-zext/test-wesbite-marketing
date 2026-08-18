/**
 * A diagram per claim.
 *
 * Drawn, not fetched, and derived from the claim rather than decorating it:
 * a page that paints instantly, a phone being tapped, a result climbing to
 * the top of a search list, an answer that cites you. All four share one
 * vocabulary — a framed panel with content inside — so the deck reads as four
 * views of the same website rather than four unrelated icons.
 *
 * Every mark is deterministic (no random, no dates), so these render
 * identically on the server and the client. They animate only on the card at
 * the front of the deck; see the paused/running rule in studio.css.
 */

/** 01 — a page that paints in one go, its loader already full. */
function Fast() {
  return (
    <svg viewBox="0 0 170 124" role="presentation">
      <rect
        className="zx-pa-frame"
        x="1"
        y="1"
        width="168"
        height="122"
        rx="12"
      />
      <line className="zx-pa-rule" x1="1" y1="27" x2="169" y2="27" />
      {[13, 24, 35].map((cx) => (
        <circle key={cx} className="zx-pa-dot" cx={cx} cy="14" r="3" />
      ))}
      {/* the loader, already done */}
      <rect className="zx-pa-track" x="52" y="11" width="105" height="6" rx="3" />
      <rect
        className="zx-pa-fill"
        x="52"
        y="11"
        width="105"
        height="6"
        rx="3"
      />
      {/* content snapping in */}
      <rect className="zx-pa-blk" data-i="0" x="16" y="42" width="72" height="10" rx="5" />
      <rect className="zx-pa-blk" data-i="1" x="16" y="60" width="138" height="7" rx="3.5" />
      <rect className="zx-pa-blk" data-i="2" x="16" y="74" width="120" height="7" rx="3.5" />
      <rect className="zx-pa-blk" data-i="3" x="16" y="94" width="46" height="16" rx="8" />
    </svg>
  );
}

/** 02 — a phone, with a thumb tap landing on the button. */
function Phone() {
  return (
    <svg viewBox="0 0 170 124" role="presentation">
      <rect
        className="zx-pa-frame"
        x="55"
        y="4"
        width="60"
        height="116"
        rx="12"
      />
      <rect className="zx-pa-notch" x="76" y="10" width="18" height="4" rx="2" />
      <rect className="zx-pa-blk" data-i="0" x="63" y="24" width="34" height="8" rx="4" />
      <rect className="zx-pa-blk" data-i="1" x="63" y="38" width="44" height="5" rx="2.5" />
      <rect className="zx-pa-blk" data-i="2" x="63" y="48" width="38" height="5" rx="2.5" />
      <rect className="zx-pa-blk" data-i="3" x="63" y="62" width="44" height="20" rx="6" />
      {/* the tap */}
      <circle className="zx-pa-ripple" cx="85" cy="72" r="12" />
      <circle className="zx-pa-tip" cx="85" cy="72" r="5" />
    </svg>
  );
}

/** 03 — a search list, with one result climbing into the top slot. */
function Rank() {
  return (
    <svg viewBox="0 0 170 124" role="presentation">
      {/* the search field */}
      <rect
        className="zx-pa-frame"
        x="8"
        y="6"
        width="154"
        height="24"
        rx="12"
      />
      <circle className="zx-pa-lens" cx="26" cy="18" r="6" />
      <line className="zx-pa-lens" x1="30.5" y1="22.5" x2="35" y2="27" />
      <rect className="zx-pa-blk" data-i="0" x="44" y="15" width="62" height="6" rx="3" />
      {/* results — the first is ours, and it rises into place */}
      <g className="zx-pa-win">
        <rect x="8" y="42" width="154" height="24" rx="8" />
        <rect className="zx-pa-mark" x="8" y="42" width="3" height="24" rx="1.5" />
        <rect className="zx-pa-blk" data-i="1" x="22" y="48" width="76" height="6" rx="3" />
        <rect className="zx-pa-blk" data-i="2" x="22" y="58" width="52" height="4" rx="2" />
      </g>
      {[74, 96].map((y, i) => (
        <g key={y} className="zx-pa-row">
          <rect className="zx-pa-blk" data-i={i + 3} x="22" y={y} width="64" height="6" rx="3" />
          <rect className="zx-pa-blk" data-i={i + 3} x="22" y={y + 10} width="44" height="4" rx="2" />
        </g>
      ))}
    </svg>
  );
}

/** 04 — an answer panel, with the citation that names you. */
function Cited() {
  return (
    <svg viewBox="0 0 170 124" role="presentation">
      <rect
        className="zx-pa-frame"
        x="8"
        y="10"
        width="154"
        height="104"
        rx="12"
      />
      {/* the prompt */}
      <rect className="zx-pa-ask" x="76" y="22" width="72" height="16" rx="8" />
      {/* the answer */}
      <rect className="zx-pa-blk" data-i="0" x="22" y="50" width="112" height="6" rx="3" />
      <rect className="zx-pa-blk" data-i="1" x="22" y="62" width="96" height="6" rx="3" />
      <rect className="zx-pa-blk" data-i="2" x="22" y="74" width="70" height="6" rx="3" />
      {/* the citation */}
      <rect className="zx-pa-cite" x="22" y="90" width="58" height="16" rx="8" />
      <circle className="zx-pa-citedot" cx="32" cy="98" r="3" />
      <rect className="zx-pa-citebar" x="40" y="95.5" width="30" height="5" rx="2.5" />
    </svg>
  );
}

/** Indexed to PILLARS order. */
export const PILLAR_ART = [
  <Fast key="fast" />,
  <Phone key="phone" />,
  <Rank key="rank" />,
  <Cited key="cited" />,
];
