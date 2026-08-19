/**
 * Every string on the Studio landing page. Copy lives here so the section
 * components stay pure layout and the marketing team can edit one file.
 */

/*
 * In page order. Add { href: "#work", label: "Work" } between Process and FAQ
 * only while WORK below is non-empty.
 */
export const NAV_LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
] as const;

export const HERO = {
  eyebrow: "Design & engineering",
  place: "Mumbai",
  /* One line per display row; `em` marks the serif emphasis word. Split per
     character by the intro reveal. */
  lines: [
    [{ text: "You're one" }],
    [{ text: "brief", em: true }, { text: " away" }],
    [{ text: "from launch." }],
  ],
  /* One line per beat of the reveal: mechanism, claim, ask. */
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
  /* Keep in step with the turnaround in STATS and the form's sent message. */
  "We answer within 48h",
] as const;

/* The section aside "Build it. Rank it. Fix it." maps onto these three in
   order — keep them in step. */
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

/*
 * The metrics tape. `value` is a display string, not a count-up target.
 * The tape sizes itself to this array, so adding an entry needs no other
 * change. Figures here must be measured — the section reads "Measured, not
 * claimed".
 */
export const STATS = [
  {
    value: "7 days",
    title: "Legacy site revamped",
    desc: "Thirty-six pages taken apart and rebuilt end to end inside a single week.",
  },
  {
    value: "48 hours",
    title: "Full site audit",
    desc: "5,000+ pages audited and 225k+ issues found.",
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

/*
 * Deliverables, in the order the engagement produces them — not benefits.
 * PILLARS argues what a good site does; this answers it with what you receive.
 * Keep every line to a commitment STAGES or FAQS already makes.
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

/*
 * Selected work. The section renders only while this has entries, e.g.
 *
 *   { name: "Manufacturing site rebuild",
 *     sector: "Industrial · Mumbai",
 *     result: "Rebuilt around what buyers actually search for." }
 *
 * Quote a figure in `result` only where the client has agreed to publish it.
 * Filling this also means restoring the #work nav link above and renumbering
 * the sections after it — see the running order in page.tsx.
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

/*
 * Studio copy, verbatim. Ordered by how soon a first-time client raises each
 * objection, and mapped onto SERVICES: build-from-brief, AEO/GEO, audit.
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
 * No street line until there is a real one to print. The email is the site's
 * canonical address, shared with the main footer and the blog.
 */
export const CONTACT = {
  email: "contact@zextdigital.ai",
  address: ["Mumbai, India", "Remote, everywhere else"],
} as const;

export const FOOTER_LINKS = {
  studio: [
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Start a project" },
  ],
  /* Mirrors the shared site footer, same order. External, so the footer
     renders these with target/rel. */
  elsewhere: [
    { href: "https://linkedin.com/company/zext-digital", label: "LinkedIn" },
    { href: "https://www.instagram.com/zextdigital/", label: "Instagram" },
    { href: "https://x.com/zextdigital", label: "X" },
  ],
} as const;

/* Set the real registered entity name here. */
export const FOOTER_BAR = [
  "© 2026 Zext Digital",
  "Built in-house. Obviously.",
  "Two slots left for Q4",
] as const;

/**
 * Budget slider bounds, in thousands of rupees: ₹25k to ₹2.5L, stepping 5k.
 * The form renders these through formatBudget(), which switches to lakh above
 * 100. ⚠ These bounds are inherited from the euro slider they replaced — set
 * them to the studio's real range.
 */
export const BUDGET = { min: 25, max: 250, start: 75, step: 5 } as const;

/* Preloader greetings. नमस्कार is Marathi, for Mumbai. */
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
