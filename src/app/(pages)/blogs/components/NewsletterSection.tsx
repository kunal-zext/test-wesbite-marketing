"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNewsletter } from "@/app/hooks";
import type { NewsletterArticle } from "@/types/newsletter";
import BlogGrid from "./BlogGrid";
import CategoryFilters from "./CategoryFilters";
import {
  BLOG_CATEGORIES,
  newsletterCategoryQueryParam,
  type BlogCategoryFilter,
} from "./category";
import SortDropdown, { type BlogSortOption } from "./SortDropdown";

const PAGE_SIZE = 6;

function articleTimestamp(a: NewsletterArticle): number {
  const t = Date.parse(a.date || a.created_at);
  return Number.isFinite(t) ? t : 0;
}

function dedupeById(items: NewsletterArticle[]): NewsletterArticle[] {
  const seen = new Set<string>();
  const out: NewsletterArticle[] = [];
  for (const a of items) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    out.push(a);
  }
  return out;
}

/**
 * The "From our newsletter" section: client-side, infinite-scroll list of
 * newsletter articles. Self-contained and independent of the first-party blog
 * listing — one rendering/failing has no effect on the other.
 */
export default function NewsletterSection() {
  const { getNewsletters, isLoading, error, clearError } = useNewsletter();
  const [articles, setArticles] = useState<NewsletterArticle[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [category, setCategory] = useState<BlogCategoryFilter>("all");
  const [sort, setSort] = useState<BlogSortOption>("newest");

  const loadMoreLock = useRef(false);
  const fetchGenRef = useRef(0);

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      const gen = fetchGenRef.current;
      clearError();
      const result = await getNewsletters({
        page: pageNum,
        limit: PAGE_SIZE,
        category: newsletterCategoryQueryParam(category),
      });
      if (!result || gen !== fetchGenRef.current) return;

      setArticles((prev) =>
        append ? dedupeById([...prev, ...result.articles]) : result.articles,
      );
      setPage(result.page);
      setHasNext(result.has_next);
    },
    [getNewsletters, clearError, category],
  );

  useEffect(() => {
    fetchGenRef.current += 1;
    loadMoreLock.current = false;
    void fetchPage(1, false);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loadMoreLock.current) return;
    loadMoreLock.current = true;
    try {
      await fetchPage(page + 1, true);
    } finally {
      loadMoreLock.current = false;
    }
  }, [fetchPage, hasNext, page]);

  const posts = useMemo(() => {
    const list = [...articles];
    list.sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }
      const ta = articleTimestamp(a);
      const tb = articleTimestamp(b);
      return sort === "newest" ? tb - ta : ta - tb;
    });
    return list;
  }, [articles, sort]);

  const initialLoading = isLoading && articles.length === 0;
  const loadingMore = isLoading && articles.length > 0;

  return (
    <section aria-label="Newsletter articles">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-white/40 sm:mb-8">
        From our newsletter
      </h2>

      <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-center md:justify-between">
        <CategoryFilters
          categories={BLOG_CATEGORIES}
          value={category}
          onChange={setCategory}
        />
        <SortDropdown value={sort} onChange={setSort} className="md:justify-end" />
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200/90">
          {error}
        </p>
      ) : null}

      {initialLoading ? (
        <div
          className="flex items-center justify-center gap-2 py-20 text-sm text-white/55"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="size-5 animate-spin text-secondary" aria-hidden />
          Loading articles…
        </div>
      ) : (
        <BlogGrid
          posts={posts}
          hasMore={hasNext}
          isLoadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      )}
    </section>
  );
}
