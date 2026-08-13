"use client";

import { useEffect } from "react";
import { ACADEMY_LEAD_FLAG, trackPixel } from "@/utils/analytics/metaPixel";

/**
 * Fires a single Meta Pixel `Lead` conversion on the thank-you page — but only
 * when it was reached via a genuine successful booking. The booking form sets
 * {@link ACADEMY_LEAD_FLAG} in sessionStorage right before redirecting here; we
 * consume and clear it so a refresh or a direct visit to
 * `/zext-academy/thank-you` can't re-fire (or inflate) the conversion.
 */
export function AcademyLeadTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(ACADEMY_LEAD_FLAG) !== "1") return;
    sessionStorage.removeItem(ACADEMY_LEAD_FLAG);
    trackPixel("track", "Lead");
  }, []);

  return null;
}
