import { cache } from "react";
import axios, { type AxiosInstance } from "axios";

import { API_ENDPOINTS } from "@/utils/constants/apiEndpoints";
import type { FAQItem } from "@/types/faq";

/**
 * Transport client for the blog backend
 *
 * Returns raw API DTOs; domain mapping to `Blog` lives in the blogs data layer.
 */

function blogApiBase(): string {
  return API_ENDPOINTS.utilitiesApiBaseUrl.replace(/\/$/, "");
}

const blogApiClient: AxiosInstance = axios.create({
  baseURL: blogApiBase(),
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: () => true,
});

export type BlogAuthorDTO = {
  name?: string | null;
  role?: string | null;
  avatar?: string | null;
} | null;

export type BlogCardDTO = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  cover_image?: string | null;
  author?: BlogAuthorDTO;
  reading_minutes?: number | null;
  date?: string | null;
};

/** Detail endpoint adds the article HTML and (optionally) FAQ pairs. */
export type BlogDetailDTO = BlogCardDTO & {
  content?: string | null;
  faqs?: FAQItem[] | null;
};

export type BlogsPageDTO = {
  items: BlogCardDTO[];
  page: number;
  page_size: number;
  total: number;
};

export type BlogCategoryDTO = { category: string; count: number };

/** GET <path> on the blog backend; `null` on any non-2xx or network error. */
async function getJson<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T | null> {
  try {
    const res = await blogApiClient.get<T>(path, { params });
    if (res.status < 200 || res.status >= 300) return null;
    return res.data;
  } catch {
    return null;
  }
}

export type FetchBlogsParams = {
  page?: number;
  pageSize?: number;
  category?: string;
};

/** GET /blogs/public — one page of published blogs (optional category filter). */
export async function fetchBlogsPage(
  { page = 1, pageSize = 9, category }: FetchBlogsParams = {},
): Promise<BlogsPageDTO | null> {
  const params: Record<string, string | number> = {
    page,
    page_size: pageSize,
  };
  if (category && category !== "all") params.category = category;
  return getJson<BlogsPageDTO>("/blogs/public", params);
}

/** GET /blogs/public/categories — distinct categories with counts. */
export async function fetchBlogCategories(): Promise<BlogCategoryDTO[]> {
  const body = await getJson<{ categories?: BlogCategoryDTO[] }>(
    "/blogs/public/categories",
  );
  return body?.categories ?? [];
}

/**
 * GET /blogs/public/{slug}. Wrapped in React `cache()` so generateMetadata and
 * the page component dedupe to a single backend request per render.
 */
export const fetchBlogBySlug = cache(
  async (slug: string): Promise<BlogDetailDTO | null> => {
    const s = slug.trim();
    if (!s) return null;
    return getJson<BlogDetailDTO>(`/blogs/public/${encodeURIComponent(s)}`);
  },
);
