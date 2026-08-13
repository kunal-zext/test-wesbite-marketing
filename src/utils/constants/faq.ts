import { FAQ } from "@/types/faq";

export const FAQ_ITEMS: FAQ[] = [
  {
    category: "about-zext",
    title: "About Zext Digital",
    description:
      "What Zext does, how your data is handled, and how we compare to general purpose AI tools.",
    items: [
      {
        question: "What does Zext Digital do?",
        answer:
          "Zext Digital is an AI transformation company based in Mumbai that deploys working AI solutions inside your existing systems within 2-3 months. Rather than replacing your team or rebuilding your tech stack, Zext layers AI onto what you already have removing friction, reducing manual effort, and delivering measurable outcomes across content governance, operations, and business functions.",
      },
      {
        question: "Is my data safe when working with Zext?",
        answer:
          "Yes. Zext's platform is deployed inside your own infrastructure your cloud (AWS or Azure) or on-premise so your data never leaves your firewall. No external model trains on your data. Role based access control (RBAC) is built into every deployment from day one, ensuring only the right people access the right information.",
      },
      {
        question:
          "How is Zext different from using ChatGPT or Microsoft Copilot?",
        answer:
          "Off-the-shelf AI tools are general purpose they don't know your brand rules, compliance requirements, or specific workflows. Zext builds custom AI agents that operate continuously around your organisation's specific rules and processes. A general AI tool responds when prompted. A Zext agent works around the clock without human intervention.",
      },
      {
        question:
          "What happens if AI is not the right solution for my problem?",
        answer:
          "Zext will tell you before you spend anything. If after the initial discovery call or pain point workshop the team determines that AI is not the right answer, they will say so directly and suggest what to focus on first. Zext has turned down engagements when the solution did not genuinely serve the client.",
      },
    ],
  },
  {
    category: "content-audit-agent",
    title: "Content Audit Agent",
    description:
      "Automated scanning and rule enforcement across your digital content estate.",
    items: [
      {
        question: "What is the Zext Content Audit Agent?",
        answer:
          "The Zext Content Audit Agent continuously scans 100% of your digital content estate web pages, documents, and digital assets enforcing up to 40 custom rules simultaneously. In one enterprise deployment it audited 5,000+ pages in under 2 days and identified over 2,15,000 issues. It handles compliance requirements including India's IT Rules 2026 AI content labelling automatically.",
      },
      {
        question:
          "How is the Content Audit Agent different from a manual content review?",
        answer:
          "A manual team of 3-5 people takes 4-6 weeks to review 5,000 pages and covers less than 60% of the estate, applying 5-10 broad rules inconsistently. The Content Audit Agent scans 100% in under 2 days, applies 40+ specific rules objectively, and runs continuously so new content is checked as soon as it is published, not months later.",
      },
    ],
  },
  {
    category: "ai-advisory",
    title: "AI Advisory Services",
    description:
      "From readiness and use-case strategy through deployment and adoption.",
    items: [
      {
        question: "What service lines does Zext offer?",
        answer:
          "Zext's AI advisory service covers the full journey from diagnosis to deployment. It begins with an AI Readiness Assessment and Pain Point Workshop, moves into a prioritised use case strategy with ROI modelling, then into pilot build and deployment, and finally into scale and optimisation. Every recommendation is tied to a specific, measurable business outcome not a theoretical roadmap.",
      },
      {
        question:
          "Does Zext handle change management and team adoption as part of advisory?",
        answer:
          "Yes. Every advisory engagement includes a change enablement component ensuring that teams are prepared to use what has been built before the system goes live. Pilots that don't include adoption planning are one of the three most common reasons AI projects stall. Zext solves this as part of the standard engagement, not as an add-on.",
      },
      {
        question:
          "Can Zext deploy AI agents across different business functions?",
        answer:
          "Yes. Zext designs AI agents and workflow automations across business functions including sales, HR, operations, finance, customer support, procurement and knowledge management, depending on the client's process and data environment.",
      },
    ],
  },
  {
    category: "ai-training-upskilling",
    title: "AI Training & Upskilling",
    description:
      "Corporate programmes and individual certification under AI Capability Building & Academy.",
    items: [
      {
        question:
          "What AI training programmes does Zext offer for corporate teams?",
        answer:
          "Zext offers four corporate training formats under the AI Capability Building & Academy brand: a 1-day Executive AI Workshop for leadership teams, a 2-day AI Bootcamp for teams ready to start using AI immediately, a 4-week Internal Enablement Programme for organisations building AI capability across a function, and a 3-month Transformation Engagement for organisations committing to AI at scale.",
      },
      {
        question:
          "Does Zext offer AI training for individuals, not just companies?",
        answer:
          "Yes. Zext offers practical AI capability programs for individuals, teams and institutions, including cohort learning, executive workshops, corporate AI enablement and FDE programs focused on applied workplace adoption.",
      },
      {
        question: "What does Zext Academy include?",
        answer:
          "Zext Academy includes executive AI workshops, corporate AI enablement, cohort learning and FDE programs that help leaders, teams, institutions and professionals apply AI in real workflows.",
      },
    ],
  },
  {
    category: "website-digital-marketing",
    title: "Website & Digital Marketing",
    description: "Websites, performance, and AI-assisted content at scale.",
    items: [
      {
        question:
          "Does Zext Digital build websites and handle digital marketing?",
        answer:
          "Yes. Zext builds fast, accessible websites typically delivered in 2-3 weeks with performance, SEO, and analytics built in from day one. Alongside this, Zext offers AI-led digital content creation: reels, videos, social posts, and ad creatives produced at scale using AI-assisted workflows across LinkedIn, Instagram, Meta, YouTube, and WhatsApp Business.",
      },
      {
        question:
          "How is AI-led content creation different from a traditional content agency?",
        answer:
          "Traditional content production involves lengthy briefing cycles, multiple revision rounds, and inconsistent output. Zext's AI-assisted workflow reviews every asset against your brand rules automatically before delivery reducing creative rework by 60-80% and cutting video production time by approximately 75%. Content is produced faster, governed more tightly, and delivered ready to publish.",
      },
      {
        question:
          "Does Zext help with customer acquisition through social media and AI search?",
        answer:
          "Yes. Zext helps businesses improve visibility across Google, AI answer engines and social platforms such as LinkedIn, then connects that visibility to founder authority, customer acquisition, qualified leads and revenue pipelines.",
      },
    ],
  },
  {
    category: "ai-performance-governance",
    title: "AI Performance, Governance & Reliability",
    description:
      "Monitoring, optimising and governing AI systems across cost, accuracy, and compliance.",
    items: [
      {
        question: "How does Zext reduce AI cost and token usage?",
        answer:
          "Zext reviews AI spend, token usage, model selection, prompt design, workflow cost and monitoring systems to identify optimization opportunities and build cost-efficient AI operations.",
      },
    ],
  },
  {
    category: "business-intelligence",
    title: "Business Intelligence & Decision Systems",
    description:
      "MIS frameworks, dashboards and reporting that give leadership clearer decision visibility.",
    items: [
      {
        question: "What are Business Intelligence & Decision Systems?",
        answer:
          "They are MIS frameworks, dashboards, reporting systems and intelligence layers that help leadership track finance, sales, operations and performance with clearer decision visibility.",
      },
    ],
  },
  {
    category: "ai-strategy-analytics",
    title: "AI-Augmented Strategy & Analytics",
    description:
      "Advisory, analytics and financial modelling for growth, projects, and fundraising.",
    items: [
      {
        question: "What is AI-Augmented Strategy & Analytics?",
        answer:
          "AI-Augmented Strategy & Analytics combines strategic advisory, analytics, DPRs, feasibility studies, financial modelling, business planning and investment readiness for organizations evaluating growth, projects or fundraising.",
      },
    ],
  },
  {
    category: "zext-ai-platform",
    title: "Zext AI Platform",
    description:
      "The operating layer beneath Zext's engagements - orchestration, governance, and observability.",
    items: [
      {
        question: "What is the Zext AI Platform?",
        answer:
          "The Zext AI Platform is the operating layer beneath Zext's engagements. It supports AI orchestration, workflow automation, knowledge access, governance, observability, cost intelligence and executive reporting.",
      },
    ],
  },
];
