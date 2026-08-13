import type { Blog } from "@/types/blog";
import type { FAQItem } from "@/types/faq";
import {
  fetchBlogBySlug,
  fetchBlogCategories,
  fetchBlogsPage,
  type BlogCardDTO,
  type BlogCategoryDTO,
} from "@/utils/api/blogClient";

/** Shown when a blog has no cover image of its own. It is the Zext wordmark, not
 * artwork, so cards must letterbox it rather than crop it — see {@link isFallbackCover}. */
export const FALLBACK_COVER = "/assets/Logo.png";

/** True when `src` is the wordmark stand-in rather than a real cover photo. */
export const isFallbackCover = (src: string): boolean => src === FALLBACK_COVER;

const DEFAULT_AUTHOR = "Zext Digital";

const stripMetaTokens = (s: string): string =>
  s
    .replace(/\{(?:category|title|author|date|reading_time|image)\}/gi, "")
    .replace(/\s+/g, " ")
    .trim();

function toBlog(
  dto: BlogCardDTO & { content?: string | null; faqs?: FAQItem[] | null },
): Blog {
  // Keep only well-formed pairs; the backend already trims, this guards the render.
  const faqs = (Array.isArray(dto.faqs) ? dto.faqs : [])
    .map((f) => ({
      question: (f?.question ?? "").trim(),
      answer: (f?.answer ?? "").trim(),
    }))
    .filter((f) => f.question && f.answer);
  return {
    id: dto.id,
    slug: dto.slug,
    title: stripMetaTokens(dto.title ?? ""),
    excerpt: stripMetaTokens(dto.excerpt ?? ""),
    category: dto.category ?? "",
    cover_image: dto.cover_image || FALLBACK_COVER,
    author: {
      name: dto.author?.name ?? DEFAULT_AUTHOR,
      role: dto.author?.role ?? undefined,
      avatar: dto.author?.avatar ?? undefined,
    },
    reading_minutes: dto.reading_minutes ?? 1,
    date: dto.date ?? "",
    content: [],
    contentHtml: typeof dto.content === "string" ? dto.content : undefined,
    faqs: faqs.length ? faqs : undefined,
  };
}

export type BlogCategory = BlogCategoryDTO;

export type BlogsPage = {
  blogs: Blog[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getBlogsPage({
  page = 1,
  pageSize = 9,
  category,
}: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<BlogsPage> {
  const dto = await fetchBlogsPage({ page, pageSize, category });
  if (!dto) {
    return { blogs: [], page, pageSize, total: 0, totalPages: 1 };
  }
  const ps = dto.page_size || pageSize;
  return {
    blogs: dto.items.map(toBlog),
    page: dto.page || page,
    pageSize: ps,
    total: dto.total,
    totalPages: Math.max(1, Math.ceil(dto.total / Math.max(1, ps))),
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  const pageSize = 100;
  const all: Blog[] = [];
  for (let page = 1; ; page += 1) {
    const { blogs, totalPages } = await getBlogsPage({ page, pageSize });
    all.push(...blogs);
    if (blogs.length === 0 || page >= totalPages) break;
  }
  return all;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return fetchBlogCategories();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const dto = await fetchBlogBySlug(slug);
  return dto ? toBlog(dto) : null;
}
