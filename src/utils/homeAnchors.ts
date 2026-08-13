export const SECTION_IDS = {
  hero: "hero",
  problemStatement: "problem-statement-section",
  services: "services-section",
  products: "products-section",
  platform: "platform-section",
  industries: "industries-section",
  whyUs: "why-us-section",
  ethos: "ethos-section",
  ourThinking: "our-thinking-section",
  clients: "clients-section",
  testimonials: "testimonials-section",
  founders: "founders-section",
  faq: "faq-section",
  /** CTA / talk to us — in-page target for “get started” navigation */
  getStarted: "get-started-section",
  newsletter: "newsletter-section",
} as const;

/** Same number as footer / nav tel links */
export const CONTACT_PHONE_TEL = "tel:+917021215403";

export const PRODUCT_ANCHOR_IDS = {
  contentAuditAgent: "product-content-audit-agent",
  hrPreScreeningAgent: "product-hr-pre-screening-agent",
} as const;

export function serviceCardId(index: number): string {
  return `service-${index}`;
}

export function homeHashPath(anchorId: string): string {
  return `/#${anchorId}`;
}

const SERVICE_HASH_RE = /^service-\d+$/;

export function isServiceCardHash(hash: string): boolean {
  return SERVICE_HASH_RE.test(hash);
}
