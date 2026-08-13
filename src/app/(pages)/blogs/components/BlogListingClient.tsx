"use client";

import { useMemo, useState } from "react";
import type { Blog } from "@/types/blog";
import type { BlogCategory } from "../data/blogs";
import BlogsSection from "./BlogsSection";
import BlogCategoryBar from "./BlogCategoryBar";
import BlogPagination from "./BlogPagination";

const PAGE_SIZE = 9;

interface BlogListingClientProps {
  blogs: Blog[];
  categories: BlogCategory[];
}

/**
 * Client-side listing over the build-time-fetched blogs. Holds the active
 * category + page in state and slices the list in memory, so filtering and
 * pagination work without a server (static export) and without re-fetching.
 */
export default function BlogListingClient({
  blogs,
  categories,
}: BlogListingClientProps) {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      category === "all"
        ? blogs
        : blogs.filter((b) => b.category === category),
    [blogs, category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageBlogs = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );

  const handleCategory = (next: string) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <section aria-label="Blog posts" className="mb-14 sm:mb-16">
      <BlogCategoryBar
        categories={categories}
        active={category}
        onSelect={handleCategory}
      />

      {pageBlogs.length > 0 ? (
        <>
          <BlogsSection blogs={pageBlogs} />
          <BlogPagination
            current={current}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-white/55">
          No blog posts found{category !== "all" ? " in this category" : ""}.
        </p>
      )}
    </section>
  );
}
