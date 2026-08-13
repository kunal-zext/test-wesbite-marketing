import type { Metadata } from "next";
import type { Blog } from "@/types/blog";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "../data/blogs";
import BlogPageBackground from "../components/BlogPageBackground";
import BlogTableOfContents from "../components/BlogTableOfContents";
import BlogFaqSection from "../components/BlogFaqSection";
import { prepareBlogHtml } from "../components/blogHtml";
import { SITE_URL } from "@/utils/constants/site";

/**
 * Slug emitted when there are no blogs to prerender. `output: export` aborts the
 * build (error E87) if a dynamic route generates zero paths, so we hand it one
 * throwaway path that resolves to `notFound()`. This branch is only hit while the
 * utilities service that serves blogs is undeployed; once blogs exist it's unused.
 */
const BLOG_BUILD_PLACEHOLDER_SLUG = "__placeholder__";

/**
 * With `output: export` there is no server to render slugs on-demand, so the
 * default `dynamicParams = true` makes Next throw ("missing param … required with
 * output: export") for any slug not returned by generateStaticParams(). Setting it
 * false makes an unknown slug return a 404 (our not-found page) instead.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  if (blogs.length === 0) {
    return [{ slug: BLOG_BUILD_PLACEHOLDER_SLUG }];
  }
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// The article body arrives already filled — the LLM fills the content tokens and
// the platform fills {author}/{date} at save — so the site renders it as-is (see
// prepareBlogHtml for structural cleanup). No render-time meta substitution here.

type BlogPageParams = { slug: string };

/** Resolve a `public/`-relative path or already-absolute URL to an absolute URL. */
function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * Build the `BlogPosting` structured data for a blog. `mainEntityOfPage` and
 * `url` carry the canonical URL — kept identical to the `rel="canonical"` link
 * emitted by {@link generateMetadata} so the two SEO signals agree.
 */
function buildBlogJsonLd(blog: Blog) {
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
    headline: blog.title,
    description: blog.excerpt,
    image: toAbsoluteUrl(blog.cover_image),
    articleSection: blog.category,
    inLanguage: "en-IN",
    datePublished: blog.date,
    dateModified: blog.date,
    timeRequired: `PT${blog.reading_minutes}M`,
    author: {
      "@type": "Person",
      name: blog.author.name,
      ...(blog.author.role ? { jobTitle: blog.author.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Zext Digital",
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/assets/Logo.png"),
      },
    },
  };
}

/**
 * Build schema.org `FAQPage` structured data from a blog's FAQs, so answer
 * engines and rich results can surface the Q&A. Returns null when there are no
 * FAQs, so no empty FAQPage node is emitted.
 */
function buildFaqJsonLd(blog: Blog) {
  if (!blog.faqs || blog.faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blog.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === BLOG_BUILD_PLACEHOLDER_SLUG) return { title: "Blog | Zext Digital" };
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog | Zext Digital" };
  }

  const title = `${blog.title} | Zext Digital`;
  const images = [{ url: blog.cover_image, alt: blog.title }];

  return {
    title,
    description: blog.excerpt,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      title,
      description: blog.excerpt,
      type: "article",
      locale: "en_IN",
      siteName: "Zext Digital",
      publishedTime: blog.date,
      images,
    },
    twitter: {
      title,
      description: blog.excerpt,
      images,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<BlogPageParams>;
}) {
  const { slug } = await params;
  if (slug === BLOG_BUILD_PLACEHOLDER_SLUG) notFound();
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const { html, headings } = prepareBlogHtml(blog.contentHtml ?? "");
  const jsonLd = buildBlogJsonLd(blog);
  const faqJsonLd = buildFaqJsonLd(blog);

  return (
    <div className="isolate relative w-full min-w-0 overflow-x-clip bg-background">
      {/* Per-blog BlogPosting structured data. `<` is escaped to prevent XSS. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* FAQPage structured data — emitted only when the blog has FAQs. */}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <BlogPageBackground />

      <article className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 md:px-6 md:pt-12">
        {headings.length > 0 ? (
          <aside className="absolute right-full top-0 mr-10 hidden h-full w-52 xl:block">
            <div className="sticky top-28">
              <BlogTableOfContents headings={headings} />
            </div>
          </aside>
        ) : null}

        <Link
          href="/blogs/"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 sm:mb-12"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
          Back to blog
        </Link>

        {/* The article body owns its header: the stored content already carries the
            real category/title/description/meta values (filled at save), so it renders
            as-is. The list-card thumbnail + og:image use the cover image; it is
            intentionally not shown in the body. */}

        {/* Mobile/tablet TOC: the sticky sidebar is xl-only, so below xl we
            surface the same navigation as a collapsible box. */}
        {headings.length > 0 ? (
          <details className="group mb-10 rounded-xl border border-white/10 bg-white/5 sm:mb-12 xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/40 [&::-webkit-details-marker]:hidden">
              On this page
              <ChevronDown
                className="size-4 transition-transform duration-200 group-open:rotate-180"
                strokeWidth={2}
                aria-hidden
              />
            </summary>
            <div className="px-4 pb-4">
              <BlogTableOfContents headings={headings} hideHeading />
            </div>
          </details>
        ) : null}

        {/* `.zext-blog` carries only typography (no box/padding), so keeping it on
            the wrapper is safe even though new content is itself a
            `<article class="zext-blog">` — and it keeps older body-only posts styled. */}
        <div className="zext-blog" dangerouslySetInnerHTML={{ __html: html }} />

        <BlogFaqSection faqs={blog.faqs} />
      </article>
    </div>
  );
}
