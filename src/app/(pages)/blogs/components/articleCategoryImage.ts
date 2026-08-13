import { normalizeCategoryLabel } from "./category";

/**
 * Local newsletter artwork when `image_url` is empty — files live under
 * `public/assets/images/newsletter/`.
 */
const DEFAULT_COVER = "/assets/images/newsletter/tech1.png";

const CATEGORY_COVER: Record<string, string> = {  business: "/assets/images/newsletter/business1.png",
  healthcare: "/assets/images/newsletter/health1.png",
  technology: "/assets/images/newsletter/tech1.png",
  finance: "/assets/images/newsletter/finance1.png",
  education: "/assets/images/newsletter/education1.png",
  entertainment: "/assets/images/newsletter/entertainment1.png",
  "retail & e-commerce": "/assets/images/newsletter/retail_e-commerce1.png",
  manufacturing: "/assets/images/newsletter/manufacturing1.png",
  "transportation & logistics":
    "/assets/images/newsletter/transportation_logistics1.png",
  "real estate": "/assets/images/newsletter/realestate1.png",
  "hospitality & tourism":
    "/assets/images/newsletter/hospitality_tourism1.png",
  agriculture: "/assets/images/newsletter/agriculture1.png",
  "energy & utilities": "/assets/images/newsletter/energy_utilities1.png",
  "media & communications":
    "/assets/images/newsletter/media_communications1.png",
  "government & public services":
    "/assets/images/newsletter/government_publicservices1.png",
  "sports & recreation": "/assets/images/newsletter/sports_recreation1.png",
  "nonprofit & social services":
    "/assets/images/newsletter/nonprofit_socialservices1.png",
  automotive: "/assets/images/newsletter/automotive1.png",
};

/**
 * Returns `imageUrl` when set; otherwise a static image for `category`, or a site default.
 */
export function resolveArticleCoverImage(
  imageUrl: string | undefined,
  category: string | undefined,
): string {
  const trimmed = imageUrl?.trim();
  if (trimmed) return trimmed;
  if (!category) return DEFAULT_COVER;
  const key = normalizeCategoryLabel(category);
  return CATEGORY_COVER[key] ?? DEFAULT_COVER;
}
