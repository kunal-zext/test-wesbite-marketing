export const BLOG_CATEGORIES = [
  "all",
  "business",
  "healthcare",
  "technology",
  "finance",
  "education",
  "entertainment",
  "retail & e-commerce",
  "manufacturing",
  "transportation & logistics",
  "real Estate",
  "hospitality & tourism",
  "agriculture",
  "energy & utilities",
  "media & communications",
  "government & public services",
  "sports & recreation",
  "nonprofit & social services",
  "automotive",
] as const;

export type BlogCategoryFilter = (typeof BLOG_CATEGORIES)[number];

/** Value for `GET /newsletters?category=`; omit when showing all categories. */
export function newsletterCategoryQueryParam(
  filter: BlogCategoryFilter,
): string | undefined {
  if (filter === "all") return undefined;
  return filter;
}

/** Case-insensitive, trimmed comparison for API vs UI category strings. */
export function normalizeCategoryLabel(value: string): string {
  return value.trim().toLowerCase();
}
