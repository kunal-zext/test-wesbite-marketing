/**
 * Every string on the Studio landing page. Copy lives here so the section
 * components stay pure layout and the marketing team can edit one file.
 */

/*
 * Listed in the order the page presents them, so the nav reads as a map.
 * A { href: "#work", label: "Work" } entry belongs between Process and FAQ,
 * but only once WORK below has entries — a nav link to a section that renders
 * nothing scrolls the reader to the wrong place.
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

/**
 * The four things a good website does. Each is a lead claim plus the reason,
 * split so the claim can carry the card and the reason can sit under it.
 */
export const PILLARS = [
  {
    num: "01",
    title: "It loads fast.",
    desc: "A quick site keeps visitors around long enough to explore, so we build yours to open fast on any connection.",
  },
  {
    num: "02",
    title: "It works on phones.",
    desc: "That is where most of your visitors are, so yours is easy to read and tap on a small screen.",
  },
  {
    num: "03",
    title: "It ranks on Google.",
    desc: "Clear structure and strong content help the right people find you in search.",
  },
  {
    num: "04",
    title: "It shows up in AI answers.",
    desc: "Tools like ChatGPT and Gemini now answer questions directly, so we write yours to be found and cited there too.",
  },
] as const;

/**
 * What actually lands in your hands, in the order the engagement produces it.
 *
 * Deliverables, deliberately — not benefits. PILLARS above already argues what
 * a good website *does*; this section used to repeat those same four claims in
 * different words, which read to a visitor as the page stuttering rather than
 * as a second beat. Framed as deliverables it answers the pillars instead of
 * echoing them: there is the claim, and here is the thing you receive.
 *
 * Every line here is a commitment STAGES or FAQS already makes elsewhere on
 * the page — nothing new is promised in this list.
 */
export const INCLUDED = [
  {
    title: "Design & art direction",
    desc: "Layouts, type and motion made for your business, art-directed by people rather than assembled from a template.",
  },
  {
    title: "Words & structure",
    desc: "Copy written and pages organised as part of the build, so nothing ships full of placeholder text.",
  },
  {
    title: "Production code",
    desc: "Built in Next.js against a performance budget enforced from the first component, and accessible by default.",
  },
  {
    title: "Search groundwork",
    desc: "Metadata, structured data and clean markup in place at launch, so Google and AI answer engines can read it from day one.",
  },
  {
    title: "Launch & handover",
    desc: "We deploy it, hand over the keys and run a handover week, so nothing about the build stays a mystery to your team.",
  },
  {
    title: "Post-launch tuning",
    desc: "We measure what actually happened after go-live and cut whatever did not earn its place.",
  },
] as const;

/**
 * Selected work — empty, so the section does not render.
 *
 * There is nothing publishable to show yet, and a page that invents case
 * studies to fill the gap is worse than a page with one fewer section. The
 * section builds itself from this array and returns null while it is empty, so
 * nothing about the running order has to be touched to keep it hidden.
 *
 * To bring it back, add entries in this shape:
 *
 *   { name: "Manufacturing site rebuild",
 *     sector: "Industrial · Mumbai",
 *     result: "A twelve-year-old site rebuilt around what buyers search for." }
 *
 * `result` is a sentence rather than a number on purpose: quote a figure only
 * where the client has agreed it may be published. Re-adding the section also
 * means putting its nav link back below and renumbering the three sections
 * that follow it — see the running order in page.tsx.
 */
export const WORK: ReadonlyArray<{
  name: string;
  sector: string;
  result: string;
}> = [];

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

/**
 * Supplied by the studio, and kept verbatim.
 *
 * They map onto SERVICES rather than wandering: the first answers "Build from
 * your brief", the last answers "Audit & revamp", and the AEO/GEO one explains
 * the middle offer in plain words. The ordering runs from the objection a
 * first-time client raises soonest to the one they raise last.
 */
export const FAQS = [
  {
    q: "What if I don't have a website yet?",
    a: "That is the most common way clients start with us. You bring a business brief or a company profile, and we articulate it into a finished website. You do not need anything built already.",
  },
  {
    q: "How long does a website take to build?",
    a: "Because our build is AI accelerated, most sites go live in weeks rather than months. The exact timeline depends on the number of pages and the content involved, which we confirm on the first call.",
  },
  {
    q: "What is AEO and GEO content?",
    a: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) mean writing your website so AI tools like ChatGPT and Gemini can find, understand and cite it, not just traditional Google search. It is how you stay visible as more people ask AI instead of searching.",
  },
  {
    q: "Where is Zext Digital based?",
    a: "We are based in Mumbai and work with clients across India.",
  },
  {
    q: "Is an AI built website cheaper?",
    a: "Yes. Building with AI cuts the time and manual work a traditional agency spends, and we pass that saving on, so you get comparable quality for less. The exact price depends on what your site needs, which we confirm on the first call.",
  },
  {
    q: "Can you fix our existing website instead of rebuilding it?",
    a: "Often, yes. That is what an audit tells us. Sometimes a revamp of your current site is enough, sometimes a rebuild makes more sense. We will be straight with you about which.",
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
