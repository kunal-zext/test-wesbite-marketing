import type { FAQItem } from "@/types/faq";

/**
 * A blog is distinct from a {@link NewsletterArticle}: it is first-party,
 * long-form content rendered in full on `/blogs/{slug}` (rather than a
 * short summary that links out). The body is modelled as an ordered list
 * of typed {@link BlogContentBlock}s so it can be rendered without a
 * markdown/HTML parser and maps cleanly onto a future API payload.
 */
export type Blog = {
  id: string;
  slug: string;
  title: string;
  /** Short summary used on cards, metadata, and the article lede. */
  excerpt: string;
  category: string;
  /** Cover image URL — absolute, or a path under `public/`. */
  cover_image: string;
  author: BlogAuthor;
  /** Estimated reading time in minutes. */
  reading_minutes: number;
  /** ISO 8601 publish date. */
  date: string;
  content: BlogContentBlock[];
  /**
   * Raw article HTML from the blog API
   */
  contentHtml?: string;
  /**
   * Optional FAQ question/answer pairs, rendered as an accordion below the
   * article body and emitted as `FAQPage` structured data. Detail view only.
   */
  faqs?: FAQItem[];
};

export type BlogAuthor = {
  name: string;
  role?: string;
  /** Avatar URL — absolute, or a path under `public/`. */
  avatar?: string;
};

/**
 * A single piece of article body. New block types can be added here and
 * handled in the renderer without changing the page or data layer.
 */
export type BlogContentBlock =
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt?: string; caption?: string };
