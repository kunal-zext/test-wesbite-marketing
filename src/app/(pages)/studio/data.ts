/**
 * Every string on the Studio landing page. Copy lives here so the section
 * components stay pure layout and the marketing team can edit one file.
 */

export const NAV_LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
] as const;

export const HERO = {
  eyebrow: "Design & engineering",
  place: "Mumbai",
  /**
   * "You're one brief away from launch."
   *
   * Written for the booking, not for applause: the visitor is the subject, the
   * finish line is named, and the ask is reduced to a single thing they already
   * have. That makes the CTA below read as claiming something rather than
   * entering a funnel.
   *
   * The emphasis word sits mid-sentence with text after it, the position the
   * source design used. Each line is split per character for the intro reveal.
   */
  lines: [
    [{ text: "You're one" }],
    [{ text: "brief", em: true }, { text: " away" }],
    [{ text: "from launch." }],
  ],
  /**
   * Paired statements, one pair per line: mechanism, then claim, then the ask.
   * Broken this way the block keeps a rhythm a flat paragraph cannot, and each
   * pair gets its own beat in the reveal. Pairs wrap on narrow viewports, which
   * is why the gap between lines stays larger than the leading inside them.
   */
  lede: [
    [{ text: "AI agents do the heavy lifting. People with taste make the calls." }],
    [
      { text: "That's how we ship fast and cheap. We cut the process, " },
      { text: "not the corners", em: true },
      { text: "." },
    ],
    [{ text: "Send a brief. The first call starts the build.", cta: true }],
  ],
  cta: "Book a Free Consultation",
} as const;

export const TICKER = [
  "Two build slots open for Q4 2026",
  "Median engagement: 9 weeks",
  "Mumbai / remote / everywhere",
  "We answer in under 24h",
] as const;

/**
 * Three ways in, in the order a client meets them: start something, get it
 * found, or fix what exists. The section aside ("Build it. Rank it. Fix it.")
 * maps one-to-one onto these rows, so keep them in this order if either changes.
 */
export const SERVICES = [
  {
    num: "01",
    name: "Build from your brief",
    desc: "Hand us a brief or a company profile. We turn it into a fast, mobile-ready site in weeks, not months. An AI-accelerated build at a fraction of agency price.",
  },
  {
    num: "02",
    name: "SEO, AEO & GEO content",
    desc: "Ranked by Google. Cited by ChatGPT and Gemini. Content engineered for search engines, answer engines, and wherever your customers ask next.",
  },
  {
    num: "03",
    name: "Audit & revamp",
    desc: "Already have a site? We find what works, fix what doesn't, and tune it for speed, structure and search. No rebuild you don't need.",
  },
] as const;

/**
 * The metrics reel. `value` is a display string rather than a target to count
 * up to: the reel's own slide is the animation now, and a counter ticking
 * inside a tile that is itself sliding reads as two effects fighting over the
 * same glyphs. The label is split into a headline and a sentence because the
 * card beside the tile has room for both, and a bare label left it empty.
 */
export const STATS = [
  {
    value: "41",
    title: "Flagship builds",
    desc: "Shipped since 2019. Every one designed, built and launched in-house. No white-label, no handoff.",
  },
  {
    value: "0.9s",
    title: "Median LCP",
    desc: "Across every live client site. Motion-heavy pages that still load like static ones.",
  },
  {
    value: "17",
    title: "Honours, unbought",
    desc: "Awwwards and FWA recognition earned on the work itself, never on a submissions budget.",
  },
  {
    value: "4.9×",
    title: "Qualified demos",
    desc: "Median lift in qualified demo requests after launch, measured against the site we replaced.",
  },
] as const;

export const STAGES = [
  {
    title: "Brief",
    text: "Send a brief or a company profile. No workshops, no discovery phase. That is the entire intake.",
    tags: ["Brief", "Company profile", "One call"],
    art: "radial-gradient(60% 60% at 35% 35%,rgba(167,139,250,.5),transparent 65%),radial-gradient(55% 55% at 70% 70%,rgba(140,82,255,.4),transparent 65%)",
  },
  {
    title: "Draft",
    text: "Agents turn it into structure, copy and layout within a day. You see something real immediately.",
    tags: ["Structure", "Copy", "Layout"],
    art: "conic-gradient(from 140deg at 50% 50%,rgba(140,82,255,.5),rgba(143,224,255,.35),rgba(106,124,255,.5),rgba(140,82,255,.5))",
  },
  {
    title: "Direct",
    text: "People with taste cut, sharpen and art-direct it. This is the half a machine cannot do for you.",
    tags: ["Art direction", "Editing", "Judgement"],
    art: "radial-gradient(50% 50% at 50% 50%,rgba(143,224,255,.45),transparent 62%),radial-gradient(70% 70% at 30% 75%,rgba(140,82,255,.45),transparent 65%)",
  },
  {
    title: "Build",
    text: "Production code on real content, with the performance budget enforced from the first component.",
    tags: ["Next.js", "Performance", "Accessible"],
    art: "linear-gradient(135deg,rgba(106,124,255,.45),transparent 60%),radial-gradient(60% 60% at 75% 40%,rgba(167,139,250,.5),transparent 65%)",
  },
  {
    title: "Launch",
    text: "Live in weeks. Then we measure what actually happened and cut whatever did not earn its place.",
    tags: ["Deploy", "Measure", "Tune"],
    art: "radial-gradient(45% 45% at 55% 45%,rgba(184,169,255,.55),transparent 60%),conic-gradient(from 30deg at 50% 50%,rgba(140,82,255,.4),transparent,rgba(143,224,255,.4),transparent)",
  },
] as const;

export const FAQS = [
  {
    q: "What does a project actually cost?",
    a: "Most engagements land between €45k and €160k. A focused marketing site with a real identity system starts around €45k; a flagship build with custom WebGL, a CMS and a nine-week runway sits in the middle. We quote fixed scope, fixed price, and we don't bill by the hour, which only rewards slowness.",
  },
  {
    q: "How long does it take?",
    a: "Nine weeks is our median, kickoff to live. We've done six when the content was ready and fourteen when it wasn't. The single biggest variable is how fast you can make decisions, and we'll tell you upfront which three people need to be in the room.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Happily, and it's usually the best outcome. We'll pair with your engineers from week one, work in your repo, follow your conventions, and run a handover week at the end so nothing about the build is a mystery. Roughly half our projects run this way.",
  },
  {
    q: "Isn't all this motion bad for performance and accessibility?",
    a: "It is when it's decoration. Every effect here is GPU-composited, pauses when offscreen, caps its own pixel ratio, and disappears entirely under prefers-reduced-motion. This page ships a 0.9s LCP and passes WCAG AA. Motion is a budget line like any other. We just spend it well.",
  },
  {
    q: "What if we hate the first direction?",
    a: "Then we killed it early and cheaply, which is the point of showing you moving work in week three. You get three art-direction passes inside the fixed fee. In seven years nobody has needed a fourth, but if you do, we'll keep going until it's right.",
  },
] as const;

export const PROJECT_TYPES = [
  "New marketing site",
  "Rebrand + site",
  "Product / web app",
  "WebGL / experiment",
  "Genuinely not sure",
] as const;

export const TIMELINES = ["Yesterday", "Next quarter", "This year, no rush"] as const;

/*
 * The hero, the ticker and the footer clock all say Mumbai; the address said
 * Lisbon, left over from the demo content. Deliberately no street line — a
 * placeholder street would be a lie printed under a heading that says "Here".
 * Fill in the real one, and replace the phone, which is still a Portuguese
 * placeholder number.
 */
export const CONTACT = {
  email: "hello@zext.digital",
  address: ["Mumbai, India", "Remote, everywhere else"],
} as const;

export const FOOTER_LINKS = {
  studio: [
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Start a project" },
  ],
  elsewhere: [
    { href: "#top", label: "Instagram" },
    { href: "#top", label: "Are.na" },
    { href: "#top", label: "GitHub" },
    { href: "#top", label: "LinkedIn" },
  ],
} as const;

/* "Lda." was the Portuguese demo entity — set the real registered name here. */
export const FOOTER_BAR = [
  "© 2026 Zext Digital",
  "Built in-house. Obviously.",
  "Two slots left for Q4",
] as const;

/** Budget slider bounds, in thousands of euro. */
export const BUDGET = { min: 25, max: 250, start: 75, step: 5 } as const;

/*
 * Preloader greetings. Mumbai first among the non-English ones — नमस्कार is the
 * Marathi greeting, not the Hindi नमस्ते.
 */
export const GREETINGS = [
  "Hello",
  "नमस्कार",
  "Bonjour",
  "Hola",
  "你好",
  "مرحبا",
  "Olá",
  "Hallo",
] as const;
