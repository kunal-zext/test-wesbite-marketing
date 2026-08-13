/**
 * Content for the Zext Academy landing. Pure data only - section components own
 * their icons/markup. The booking CTA target lives here so it's set in one place.
 */
export const BOOK_PATH = "/zext-academy/book";

export const BOOK_ANCHOR = "book";

export const NAV_TAG = "Upskill · Build · Transform";

export const HERO = {
  eyebrow: "Zext Academy · 1-on-1 AI training",
  titleLine1: "You already have the AI tools.",
  titleLine2: "Now make them change how you work.",
  sub: "Everyone has ChatGPT open. Almost no one's work has actually changed. Zext Academy rebuilds your real work around AI, 1-on-1 - and you build it, in the session.",
  cta: "Book a free discovery session",
  scarcity: "Founder-led - limited slots each month",
  chips: ["ChatGPT", "Copilot", "Gemini", "Claude"],
  trust: [
    "DPIIT Recognised Startup",
    "Built by enterprise AI advisors",
  ],
} as const;

export const PROBLEM = {
  eyebrow: "Why nothing changed",
  heading: "You tried the tools. Your week looks the same.",
  cards: [
    {
      title: "The same map, in everyone's hands",
      body: "Everyone has the same tools. But a map doesn't teach you the terrain - so most people circle the same three prompts and call it AI.",
    },
    {
      title: "A new model every few weeks",
      body: 'Agents, frameworks, integrations, a fresh "this changes everything" every Tuesday. Without a guide, you\'re just collecting tabs you never reopen.',
    },
  ],
} as const;

export const COMPARISON = {
  eyebrow: "The difference",
  heading: "Why a course never stuck - and this will.",
  sub: "Most AI training is a video library you abandon by week two. Here's what changes when it's built for one person: you.",
  leftHead: "A generic AI course",
  rightTag: "ZEXT ACADEMY",
  rightHead: "A 1-on-1 co-pilot",
  rows: [
    {
      left: "The same recorded videos for 10,000 people",
      right: "Live sessions, shaped around your actual role",
    },
    {
      left: "Generic examples that aren't your work",
      right: "Your real tasks, tools and bottlenecks",
    },
    {
      left: "You watch, take notes, and hope it sticks",
      right: "You build it, hands-on, inside the session",
    },
    {
      left: "A certificate you'll never look at again",
      right: "Capability you keep using every week",
    },
    {
      left: "You're on your own when it ends",
      right: "A 90-day plan and direct feedback to execute it",
    },
  ],
} as const;

export const HOW = {
  eyebrow: "How it works",
  heading: 'From "I should learn AI" to building, in three steps.',
  steps: [
    {
      n: 1,
      title: "Book a free call",
      body: "A 30-minute conversation with our founding team about your role, your tools and where AI could actually save you hours.",
      free: "FREE · NO PRESSURE",
    },
    {
      n: 2,
      title: "We map your path",
      body: "You get a programme shaped to your real work - not a fixed syllabus. You'll know exactly what you'll build and why.",
    },
    {
      n: 3,
      title: "You build, 1-on-1",
      body: "Hands-on from session one, at your pace. You leave every session with something real that works on your own tasks.",
    },
  ],
} as const;

export const DELIVERABLES = {
  eyebrow: "What you keep",
  heading: "You don't leave with notes. You leave with assets.",
  sub: "Real things you build during the programme - and use long after it ends.",
  items: [
    {
      title: "Your own prompt library",
      body: "Tuned to how you think and work - yours to keep forever.",
    },
    {
      title: "A working AI agent",
      body: "One that researches, reasons and completes multi-step tasks for you.",
    },
    {
      title: "A live app and website",
      body: "Built and deployed by you - using natural language, zero code.",
    },
    {
      title: "Your 90-day AI plan",
      body: "Real dates, actions and goals - reviewed with direct feedback.",
    },
  ],
} as const;

export const ROLES = {
  eyebrow: "Built around you",
  heading: "What would it change for someone like you?",
  options: [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      before:
        "You'd hand the busywork of running a business - outreach, content, research, SOPs - to AI, and get your hours back for ",
      highlight: "the work only you can do",
      after: ".",
    },
    {
      key: "manager",
      label: "Manager",
      before:
        "You'd turn your team's repetitive work into AI workflows, and brief, review and decide ",
      highlight: "in a fraction of the time",
      after: ".",
    },
    {
      key: "professional",
      label: "Professional",
      before:
        "You'd build AI into your daily craft - research, writing, analysis - and become ",
      highlight: "the person others come to",
      after: " to get it done.",
    },
    {
      key: "leader",
      label: "Business leader",
      before:
        "You'd gain the clarity to evaluate AI, set direction, and lead adoption across your org ",
      highlight: "without the hype or the guesswork",
      after: ".",
    },
  ],
} as const;

export const CURRICULUM = {
  eyebrow: "The journey",
  heading: "Nine chapters. Tap any to look inside.",
  stats: [
    { value: 25, label: "MODULES" },
    { value: 9, label: "CHAPTERS" },
    { value: 35, suffix: "+", label: "HOURS" },
  ],
  chapters: [
    {
      title: "Make sense of it",
      modules: "5 modules",
      body: "What AI, ML and GenAI actually mean. Test tools side by side, call a real API, and deliberately break AI to find its limits.",
    },
    {
      title: "The skills that change everything",
      modules: "3 modules",
      body: "Master prompting and build your own library. Work with Projects, Cowork, embeddings, and a RAG setup on your own documents.",
    },
    {
      title: "Making AI work for you",
      modules: "2 modules",
      body: "Move past chatbots. Build an AI agent that reasons through multi-step tasks, and a real end-to-end workflow for your own work.",
    },
    {
      title: "AI in the real world",
      modules: "3 modules",
      body: "Marketing visuals, voiceovers, live competitor analysis, instant report summaries, prospect research, outreach and SOPs.",
    },
    {
      title: "Speaking the language",
      modules: "3 modules",
      body: "Evaluate vendor pitches without being technical. Map your stack, find where AI adds value, and plan your first experiment.",
    },
    {
      title: "Responsible AI",
      modules: "1 module",
      body: "Audit real tools for privacy. Find out where your data actually goes. Draft your AI usage checklist for safe adoption.",
    },
    {
      title: "Build it yourself",
      modules: "3 modules",
      body: "No coding. Describe what you want and AI builds it - by the end you'll have a working app and a live website deployed.",
    },
    {
      title: "From practitioner to advisor",
      modules: "3 modules",
      body: "Run a mock AI audit on a real business, build your one-pager, and shape your personal AI value story.",
    },
    {
      title: "Your launchpad",
      modules: "2 modules",
      body: "Write your real 90-day AI plan with dates and goals, present your strategy, get direct feedback, and leave ready to execute.",
    },
  ],
} as const;

export const PROOF = {
  eyebrow: "Who teaches you",
  heading: "The people enterprises trust with AI - now teaching you.",
  lead: "Zext advises companies on real, deployed AI systems. The same founding team builds and runs every Academy programme personally. ",
  leadBold:
    "You're not learning from a content team - you're learning from the people who do this for a living.",
  founder: {
    name: "Kushal Sanghavi",
    role: "Co-Founder · GenAI Strategist & Enterprise Advisor · ex-Deloitte",
    bio: "15 years building AI platforms, data systems and enterprise automation for global clients. Real enterprise AI - built and deployed, not theorised.",
    image: "/assets/team/kushal-sanghavi.png",
  },
  quotes: [
    {
      q: "It changed how I approach the work itself.",
      detail:
        "Research is better organised; documentation needs far less iteration.",
      who: "Tracy Cardoz, Academician",
    },
    {
      q: "You don't need a technical background to build technical solutions.",
      detail:
        "I built an interactive web presentation and presented it to senior leadership.",
      who: "Niraj Parikh, JP Morgan (personal capacity)",
    },
  ],
  creds: [
    { strong: "DPIIT", rest: "Recognised Startup" },
    { strong: "Mumbai", rest: "· in-person & online" },
  ],
} as const;

export const FAQS = {
  eyebrow: "Before you book",
  heading: "The questions everyone asks.",
  items: [
    {
      q: "Do I need a technical background?",
      a: "None at all. No coding, no jargon. If you can describe what you want in plain words, you can build it here - we designed the whole programme that way.",
    },
    {
      q: "How is this different from a cheaper online course?",
      a: "A course is the same video for everyone, and most people quit by week two. This is 1-on-1, rebuilt around your role, and you apply everything on your own real work - in the session, with a guide. You're paying for transformation, not access to recordings.",
    },
    {
      q: "I'm busy. What's the time commitment?",
      a: "Sessions flex to your pace - most people do one or two a week. You set the rhythm on the discovery call, around your actual calendar.",
    },
    {
      q: "What actually happens on the discovery call?",
      a: "A 30-minute conversation about your work and where AI could help. No slides, no hard sell. You'll leave knowing whether this is right for you - even if the answer is no.",
    },
    {
      q: "What if I don't have specific AI goals yet?",
      a: "That's the most common starting point - and it's fine. Finding the right goals for your work is the first thing we do together.",
    },
    {
      q: "Is it in person or online?",
      a: "Both. We run effective in-person sessions in Mumbai, with online options if you're elsewhere in India or abroad.",
    },
  ],
} as const;

export const FINAL = {
  headingLine1: "The noise isn't slowing down.",
  headingLine2: "Get ahead of it.",
  body: "One conversation is all it takes. We'll understand your goals and map the right path for your work - free, and with no obligation.",
  cta: "Book a free discovery session",
  scarcity:
    "Founder-led - we take a limited number of new learners each month",
} as const;

export const FOOTER_INFO = {
  email: "contact@zextdigital.ai",
  number: "+91 70212 15403",
  numberHref: "tel:+917021215403",
  legal: "Zext Digital LLP · Mumbai",
} as const;

export const BOOK = {
  eyebrow: "You're almost there",
  heading: "One step from your free discovery session.",
  lead: "Leave your details and our founding team will personally reach out to lock in a time that works for you.",
  steps: [
    { title: "You share a few details", sub: "Takes 20 seconds." },
    {
      title: "We call to schedule",
      sub: "We'll reach out within 48 hours, on your time.",
    },
    {
      title: "Your 30-minute session",
      sub: "We map the right AI path for your work. No pressure.",
    },
  ],
  badges: ["Free & no obligation", "Founder-led"],
  formTitle: "Request your session",
  formSub: "We'll get back to you within 48 hours.",
  roles: [
    "Entrepreneur / Business owner",
    "Manager / Team lead",
    "Working professional",
    "Business leader / CXO",
    "Other",
  ],
  submit: "Request my discovery call",
  privacy:
    "We'll only use this to contact you about your session. No spam, ever.",
} as const;

export const THANK_YOU = {
  eyebrow: "Request received",
  heading: "You're on the list.",
  body: "Thanks! Our founding team will reach out within 48 hours to lock in your free 30-minute discovery session. Keep an eye on your inbox and WhatsApp.",
  backLabel: "Back to Zext Academy",
} as const;
