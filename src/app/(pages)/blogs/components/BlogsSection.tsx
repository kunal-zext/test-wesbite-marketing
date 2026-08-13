import type { Blog } from "@/types/blog";
import BlogFeatureCard from "./BlogFeatureCard";
import BlogListRow from "./BlogListRow";

interface BlogsSectionProps {
  blogs: Blog[];
}

/**
 * The first-party blog section on the `/blogs` page. The newest post is the
 * featured hero; any others fall into a compact list below it. Rendered above
 * the newsletter grid and visually distinct from it.
 */
export default function BlogsSection({ blogs }: BlogsSectionProps) {
  if (blogs.length === 0) return null;

  const [featured, ...rest] = blogs;

  return (
    <section
      aria-labelledby="latest-blog-heading"
      className="mb-14 sm:mb-16"
    >
      <h2
        id="latest-blog-heading"
        className="mb-6 text-xs font-semibold uppercase tracking-wider text-white/40 sm:mb-8"
      >
        Latest from the blog
      </h2>

      <BlogFeatureCard blog={featured} />

      {rest.length > 0 ? (
        <ul className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog) => (
            <li key={blog.id}>
              <BlogListRow blog={blog} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
