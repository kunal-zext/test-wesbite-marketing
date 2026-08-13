import type { Blog } from "@/types/blog";

/**
 * Local blog content. These power `/blogs/{slug}` until the blog API is wired
 * up — see `data/blogs.ts` for the access layer that will replace this source
 * with a build-time fetch.
 */
export const DUMMY_BLOGS: Blog[] = [
  {
    id: "1",
    slug: "how-ai-is-changing-real-estate-nar-india",
    title:
      "How AI Is Changing the Way Real Estate Professionals Work — and What Zext Digital Showed Channel Partners at NAR India",
    excerpt:
      "Real estate in India is one of the fastest-moving sectors for AI adoption. Here is what Zext Digital showed Channel Partners and brokers at the NAR India webinar — and why it matters for how you work today.",
    category: "real estate",
    cover_image: "/assets/images/newsletter/realestate1.png",
    author: {
      name: "Kushal Sanghavi",
      role: "Co-Founder & CTO, Zext Digital",
      avatar: "/assets/Logo.svg",
    },
    reading_minutes: 8,
    date: "2026-06-01",
    content: [
      {
        type: "paragraph",
        text: "Real estate in India is one of the fastest-moving sectors when it comes to AI adoption. Buyers are researching faster, expectations around response time have gone up, and the Channel Partners winning more mandates are the ones who are showing up quicker, following up more consistently, and presenting themselves more professionally — not necessarily the ones with the most experience.",
      },
      {
        type: "paragraph",
        text: "Zext Digital has been working inside the real estate sector for some time now — with developers, brokers, and mandate agencies across AI implementation, content creation, and digital sales enablement. When the National Association of Realtors India (NAR India) reached out to bring this conversation to their community, Zext brought a practical, workflow-level session to Channel Partners and brokers across the country.",
      },
      {
        type: "paragraph",
        text: "This article captures the core of what was covered — and why it matters for anyone working in real estate today.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Problem Every Channel Partner Recognises",
      },
      {
        type: "paragraph",
        text: "If you are a Channel Partner, the reality of your working day likely looks something like this:",
      },
      {
        type: "paragraph",
        text: "A lead comes in on WhatsApp. You are in the middle of a site visit. By the time you reply, the lead has already heard back from two other brokers. The deal does not close — not because your offering was weaker, but because you were slower.",
      },
      {
        type: "paragraph",
        text: "Or this: you have 40 leads in your pipeline. You know some of them are serious and some are not, but you do not always know which is which. You spend time nurturing low-intent enquiries while high-intent buyers go quiet because no one followed up at the right moment.",
      },
      {
        type: "paragraph",
        text: "Or this: you spend two to three hours every week on backend work — invoices, GST entries, agreement reviews — that have nothing to do with selling but cannot be ignored.",
      },
      {
        type: "paragraph",
        text: "These are not individual problems. They are the structural friction points that slow down almost every Channel Partner in India. And they are exactly where AI & Automation can help.",
      },
      {
        type: "heading",
        level: 2,
        text: "What Zext Digital Covered at the NAR India Webinar",
      },
      {
        type: "paragraph",
        text: "The session was structured in phases — recognising that not everything can be done on day one. Some workflows are things you can start immediately, on your own, with tools you already have access to. Others require some guidance or a technology partner to set up correctly. The session was honest about which is which — and that clarity is what made it practical rather than theoretical.",
      },
      {
        type: "paragraph",
        text: "Here is a summary of the ground covered.",
      },
      {
        type: "heading",
        level: 3,
        text: "1. Responding to Leads Before Your Competitor Does",
      },
      {
        type: "paragraph",
        text: "Speed of response is the single biggest differentiator in real estate sales. The first Channel Partner a buyer hears back from wins a disproportionate share of conversations.",
      },
      {
        type: "paragraph",
        text: "AI solves this at the drafting stage. When a message comes in — “Looking for a 2BHK in Thane around 1.2 Cr” — rather than pausing to think about how to reply, AI instantly generates a professional response, a set of smart qualification questions, and a site visit push message. What would take five minutes of thinking takes five seconds.",
      },
      {
        type: "paragraph",
        text: "The first reply sets the tone before you have had a single real conversation.",
      },
      {
        type: "heading",
        level: 3,
        text: "2. Knowing Which Leads to Prioritise",
      },
      {
        type: "paragraph",
        text: "Not every lead is serious. Channel Partners consistently lose hours chasing enquiries that were never going to convert, while high-intent buyers slip through the cracks.",
      },
      {
        type: "paragraph",
        text: "AI helps cut through that noise. A buyer who says “can move fast if I get a good deal” and has a strong budget needs a different response — and a different level of urgency — than someone who is still twelve months away from deciding. AI reads those signals and tells you who deserves your attention first.",
      },
      {
        type: "paragraph",
        text: "And it goes further than that. If you have been working in real estate for a few years, you already have a wealth of information sitting in your old conversations and enquiries — who ended up buying, what their budget was, how long it took them to decide. AI can look at all of that, find the patterns, and use them to tell you how serious a new lead is likely to be. The longer you use it, the better it gets at reading your specific market and your specific buyers.",
      },
      {
        type: "paragraph",
        text: "The result: you start your day knowing exactly who to call first.",
      },
      {
        type: "heading",
        level: 3,
        text: "3. Drafting the Right Message at Every Stage of a Deal",
      },
      {
        type: "paragraph",
        text: "Every message in a real estate conversation is an opportunity to move a lead forward — or lose them.",
      },
      {
        type: "paragraph",
        text: "AI helps Channel Partners draft the right message at every stage: the first response, the follow-up after no reply, the site visit confirmation, and the nurturing messages for buyers who are still weeks or months away from deciding. Each message is ready to personalise and send in seconds.",
      },
      {
        type: "paragraph",
        text: "The compounding effect is significant. A Channel Partner sending better, faster, more consistent messages across 40 leads is operating at a structurally different level from one who is drafting everything manually.",
      },
      {
        type: "heading",
        level: 3,
        text: "4. Never Losing a Deal to Inconsistent Follow-Up",
      },
      {
        type: "paragraph",
        text: "Inconsistent follow-up is the single biggest reason deals fall through in real estate. It is rarely about price or product — it is about presence.",
      },
      {
        type: "paragraph",
        text: "Using AI as a daily sales assistant, a Channel Partner can start each morning with a clear brief: who to follow up with, what to say, and what the priority order is. The system does not forget. It does not have a busy day. It prepares the work so the Channel Partner can execute it.",
      },
      {
        type: "paragraph",
        text: "This is the difference between a pipeline that is actively managed and one that is passively maintained.",
      },
      {
        type: "heading",
        level: 3,
        text: "5. Reducing the Backend Work That Eats Into Selling Time",
      },
      {
        type: "paragraph",
        text: "AI is not only a sales tool. It handles a significant portion of the operational load that slows Channel Partners down.",
      },
      {
        type: "paragraph",
        text: "GST reconciliation, invoice preparation, and agreement analysis — work that currently takes hours — can be handled in minutes. Every hour recovered from backend administration is an hour returned to client relationships and site visits.",
      },
      {
        type: "heading",
        level: 3,
        text: "6. Marketing, Visibility, and Getting Found by the Right Buyers",
      },
      {
        type: "paragraph",
        text: "The second half of the session covered the marketing and scale layer — where AI creates advantages beyond daily workflow.",
      },
      {
        type: "paragraph",
        text: "Marketing in real estate has always involved significant cost and time. A single property video through a traditional production crew, a brochure refresh, or a social media campaign can take weeks to execute and consume a meaningful part of a broker’s budget. AI changes that equation entirely — the same output can be delivered in approximately one-fifth of the time and one-third of the cost.",
      },
      {
        type: "paragraph",
        text: "AI-generated property marketing videos can be produced without a production crew. The session included a live demonstration of AI-generated marketing content produced for one of Zext Digital’s real estate clients — content that would have taken days and significant budget through a traditional agency, delivered in hours.",
      },
      {
        type: "paragraph",
        text: "Website and brochure audits were another area covered. Your website and brochures are your silent salespeople. AI audits them for clarity, missing information, and conversion quality — flagging what a first-time buyer would find confusing and where calls-to-action are not strong enough to generate an enquiry.",
      },
      {
        type: "paragraph",
        text: "GEO — Generative Engine Optimisation was introduced as the next frontier of real estate discoverability. Buyers today are not only searching on Google. They are asking AI tools questions like “Which are the best 3BHK options under 2 Cr in Powai?” Your business needs to appear in those answers. GEO structures your website and content so it is readable and citable by AI search tools — not just traditional search engines.",
      },
      {
        type: "paragraph",
        text: "Your website should generate leads. Not just exist.",
      },
      {
        type: "heading",
        level: 3,
        text: "7. The Future: Advanced Systems for High-Volume Operations",
      },
      {
        type: "paragraph",
        text: "The session closed with a forward-looking section on the systems that represent where high-performing Channel Partners will operate in the next two to three years.",
      },
      {
        type: "paragraph",
        text: "AI chatbots that work 24/7 to capture leads, qualify requirements, and feed a CRM automatically. AI voice calling that screens inbound leads, confirms appointments, and handles FAQs at scale without human effort. WhatsApp automation that moves beyond AI-assisted replies into full campaign workflows with CRM sync.",
      },
      {
        type: "paragraph",
        text: "These are not plug-and-play today. They require proper implementation and integration. But they are where the sector is going — and the Channel Partners who understand what is coming will be better positioned to act when the infrastructure catches up.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why Real Estate Is a Core Sector for Zext Digital",
      },
      {
        type: "paragraph",
        text: "Zext Digital’s work in real estate is not theoretical. The workflows shared at the NAR India session come directly from active client work — with Neelam Realtors on AI-generated property tour videos, digital content, and sales funnel reporting; with a leading mandate organisation on agency operations; and from Kushal Sanghavi’s ongoing engagement with real estate bodies including NAR India.",
      },
      {
        type: "paragraph",
        text: "Real estate is a sector where Zext Digital has built a deep, working presence — and where the impact of AI adoption is immediately visible in response speed, lead conversion, and operational efficiency.",
      },
      {
        type: "paragraph",
        text: "The NAR India webinar reached Channel Partners and brokers across the country. A follow-up engagement and subscription course are currently in discussion.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Takeaway",
      },
      {
        type: "paragraph",
        text: "You do not need to become technical to use AI in your real estate business.",
      },
      {
        type: "paragraph",
        text: "The starting point is simple: respond faster, follow up more consistently, and let AI handle the repetitive work so you can focus on what actually closes deals — the conversation, the trust, the relationship.",
      },
      {
        type: "quote",
        text: "That is the shift that separates the Channel Partners who will grow in this market from the ones who will not.",
      },
      {
        type: "paragraph",
        text: "Zext Digital is an AI transformation company based in Mumbai, working with enterprises, brokers, and institutions across India and the UAE. Real estate is a sector where Zext has built deep, proven presence — from AI-generated content and digital sales tools to full AI advisory and implementation.",
      },
      {
        type: "paragraph",
        text: "To explore what AI can do for your real estate business, reach out at contact@zextdigital.ai or visit www.zextdigital.ai.",
      },
      {
        type: "paragraph",
        text: "Kushal Sanghavi is Co-Founder & CTO of Zext Digital. He speaks regularly on practical AI adoption for real estate, institutional broking, and professional services across India.",
      },
    ],
  },
];
