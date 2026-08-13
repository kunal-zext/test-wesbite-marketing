/**
 * Every string on the Studio landing page. Copy lives here so the section
 * components stay pure layout and the marketing team can edit one file.
 */

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
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
  "Two build slots open — Q4 2026",
  "Median engagement: 9 weeks",
  "Mumbai / remote / everywhere",
  "We answer in under 24h",
] as const;

export const CLIENTS = [
  "Obscura",
  "Kraal Labs",
  "Pale Blue",
  "Vossberg",
  "Meridian",
  "Heliotrope",
  "Atrium",
  "Northwind",
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

export const STATS = [
  { to: 41, dec: 0, suffix: "", label: "Flagship builds shipped since 2019" },
  { to: 0.9, dec: 1, suffix: "s", label: "Median LCP across every live client site" },
  { to: 17, dec: 0, suffix: "", label: "Awwwards & FWA honours, unbought" },
  { to: 4.9, dec: 1, suffix: "×", label: "Median lift in qualified demo requests" },
] as const;

/**
 * Case-study artwork is pure CSS in the original — layered gradients rather
 * than images, which is why the gallery has no network cost at all. Kept as-is.
 */
export const CASES = [
  {
    num: "01",
    title: "Obscura",
    desc: "A fragrance house rebuilt as a scent engine — you pick a mood, the site composes the bottle.",
    meta: ["WebGL", "Next.js", "2026"],
    art: "radial-gradient(80% 120% at 20% 15%,rgba(143,224,255,.34),transparent 55%),conic-gradient(from 200deg at 62% 58%,#1a1c1f,#2b2f34,#0e0f11,#232629,#1a1c1f)",
    veils: [
      "repeating-linear-gradient(115deg,rgba(255,255,255,.045) 0 1px,transparent 1px 7px)",
    ],
    veilBlend: true,
  },
  {
    num: "02",
    title: "Kraal Labs",
    desc: "A robotics site that moves the way their arms do. Every transition is a real kinematic curve.",
    meta: ["Three.js", "Sanity", "2026"],
    art: "linear-gradient(135deg,#0d0f10 0%,#191d20 45%,#0a0b0c 100%),repeating-linear-gradient(60deg,rgba(143,224,255,.16) 0 2px,transparent 2px 24px)",
    veils: [
      "repeating-linear-gradient(60deg,rgba(143,224,255,.14) 0 2px,transparent 2px 26px)",
      "radial-gradient(60% 60% at 78% 30%,rgba(143,224,255,.22),transparent 60%)",
    ],
  },
  {
    num: "03",
    title: "Pale Blue",
    desc: "Twelve terabytes of climate data, one scroll. Streamed to the GPU, legible on a phone.",
    meta: ["D3 · WebGL", "Edge", "2025"],
    art: "radial-gradient(45% 55% at 25% 70%,rgba(143,224,255,.26),transparent 60%),radial-gradient(50% 50% at 75% 25%,rgba(140,82,255,.24),transparent 60%),linear-gradient(180deg,#0b0d0f,#15181b)",
    veils: [
      "linear-gradient(rgba(243,243,240,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(243,243,240,.06) 1px,transparent 1px)",
    ],
    veilSize: "44px 44px",
  },
  {
    num: "04",
    title: "Vossberg",
    desc: "A distillery founded in 1913, finally online. 112 years of archive, scanned and made walkable.",
    meta: ["Astro", "Cloudflare", "2025"],
    art: "radial-gradient(90% 70% at 50% 110%,rgba(143,224,255,.2),transparent 60%),linear-gradient(180deg,#14100c,#0b0a09 70%)",
    veils: [
      "repeating-radial-gradient(circle at 50% 105%,rgba(243,243,240,.07) 0 1px,transparent 1px 42px)",
    ],
  },
  {
    num: "05",
    title: "Meridian",
    desc: "Money software that isn't beige. We deleted 40% of the pages and doubled the demo rate.",
    meta: ["Next.js", "Motion", "2025"],
    art: "conic-gradient(from 90deg at 50% 50%,#0d0f10,#1d2226,#0a0b0c,#22282c,#0d0f10)",
    veils: [
      "radial-gradient(38% 38% at 50% 50%,rgba(140,82,255,.32),transparent 70%)",
      "repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 2px,transparent 2px 5px)",
    ],
  },
] as const;

/**
 * The process, in order. Section 02 covers what we sell; this covers how the
 * work actually runs, so the two do not repeat each other.
 *
 * Each step drives one position on the wheel, so the count here sets the
 * rotation maths in useMotion. `art` is the gradient form that swaps behind the
 * copy — pure CSS, same approach as the case-study cards, so no image loads.
 */
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

export const QUOTES = [
  {
    text: "They pushed back on half our brief and were right about all of it. The rebuild paid for itself in eleven weeks.",
    name: "Inês Carvalho",
    role: "VP Marketing, Meridian",
  },
  {
    text: "Our old site described the robots. This one behaves like them. Investors bring it up unprompted, which has never happened before.",
    name: "Tobias Kraal",
    role: "Founder, Kraal Labs",
  },
  {
    text: "Six weeks kickoff to launch, and it's the fastest thing we've ever run. I still don't entirely understand how they did it.",
    name: "Nadia Okonjo",
    role: "Head of Digital, Pale Blue",
  },
] as const;

export const FAQS = [
  {
    q: "What does a project actually cost?",
    a: "Most engagements land between €45k and €160k. A focused marketing site with a real identity system starts around €45k; a flagship build with custom WebGL, a CMS and a nine-week runway sits in the middle. We quote fixed scope, fixed price, and we don't bill by the hour — that only rewards slowness.",
  },
  {
    q: "How long does it take?",
    a: "Nine weeks is our median, kickoff to live. We've done six when the content was ready and fourteen when it wasn't. The single biggest variable is how fast you can make decisions — we'll tell you upfront which three people need to be in the room.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Happily, and it's usually the best outcome. We'll pair with your engineers from week one, work in your repo, follow your conventions, and run a handover week at the end so nothing about the build is a mystery. Roughly half our projects run this way.",
  },
  {
    q: "Isn't all this motion bad for performance and accessibility?",
    a: "It is when it's decoration. Every effect here is GPU-composited, pauses when offscreen, caps its own pixel ratio, and disappears entirely under prefers-reduced-motion. This page ships a 0.9s LCP and passes WCAG AA. Motion is a budget line like any other — we just spend it well.",
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
  phone: "+351 21 000 0000",
  phoneHref: "tel:+351210000000",
  address: ["Mumbai, India", "Remote — everywhere else"],
} as const;

export const FOOTER_LINKS = {
  studio: [
    { href: "#work", label: "Work" },
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
