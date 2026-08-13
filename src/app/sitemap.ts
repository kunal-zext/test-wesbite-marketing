import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/constants/site";
import { getAllBlogs } from "./(pages)/blogs/data/blogs";

export const dynamic = "force-static";

const CONTENT_LASTMOD = "2026-07-07";
const LEGAL_LASTMOD = "2026-04-11";

const VIDEO_BASE =
  "https://s3.ap-south-1.amazonaws.com/zextdigital.ai.2.0/assets/platform-videos";

const homeVideos: NonNullable<MetadataRoute.Sitemap[number]["videos"]> = [
  {
    title: "Zext AI Platform — Beginner Walkthrough",
    thumbnail_loc: `${VIDEO_BASE}/thumbnail-beginner-walkthrough.jpeg`,
    description:
      "A beginner-friendly walkthrough of the Zext AI platform: a governed AI operating layer built inside your environment.",
    content_loc: `${VIDEO_BASE}/Zext+AI+Platform+Video-Final+-+Beginner.mp4`,
    publication_date: CONTENT_LASTMOD,
    family_friendly: "yes",
    live: "no",
  },
  {
    title: "Zext AI Platform — Technical Walkthrough",
    thumbnail_loc: `${VIDEO_BASE}/thumbnail-technical-walkthrough.jpeg`,
    description:
      "A technical walkthrough of the Zext AI platform: a governed AI operating layer built inside your environment.",
    content_loc: `${VIDEO_BASE}/Zext+AI+Platform+Video-Final+-+Professional.mp4`,
    publication_date: CONTENT_LASTMOD,
    family_friendly: "yes",
    live: "no",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getAllBlogs already degrades to [] if the utilities service is unreachable,
  // so a build never fails on a missing blog backend — the sitemap just omits posts.
  const blogs = await getAllBlogs();

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}/`,
    lastModified: blog.date || LEGAL_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The blog index genuinely changes when a new post ships, so key its lastmod
  // off the most recent post date (falling back to the curated legal date).
  const blogsIndexLastmod =
    blogs.reduce<string | null>(
      (latest, blog) =>
        blog.date && (!latest || blog.date > latest) ? blog.date : latest,
      null,
    ) ?? LEGAL_LASTMOD;

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
      videos: homeVideos,
    },
    {
      url: `${SITE_URL}/zext-academy/`,
      lastModified: CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/zext-academy/book/`,
      lastModified: CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blogs/`,
      lastModified: blogsIndexLastmod,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogEntries,
    {
      url: `${SITE_URL}/newsletter/`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/faq/`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy/`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms-and-conditions/`,
      lastModified: LEGAL_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
