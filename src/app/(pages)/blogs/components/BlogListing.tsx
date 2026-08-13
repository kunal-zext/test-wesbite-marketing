import { getAllBlogs, getBlogCategories } from "../data/blogs";
import BlogListingClient from "./BlogListingClient";

/**
 * Server component: fetches every published blog + the category list at BUILD
 * time (the site is a static export). Category filtering and pagination then run
 * client-side over this pre-fetched set — no request-time `searchParams`, so the
 * page can be statically rendered.
 */
export default async function BlogListing() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getBlogCategories(),
  ]);

  return <BlogListingClient blogs={blogs} categories={categories} />;
}
