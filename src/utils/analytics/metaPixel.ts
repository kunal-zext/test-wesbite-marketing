/**
 * Meta (Facebook) Pixel
 */

/** Pixel ID */
export const META_PIXEL_ID = "1778042610018466";

/**
 * sessionStorage key the booking form sets right before it redirects to the
 * thank-you page.
 */
export const ACADEMY_LEAD_FLAG = "zext_academy_lead_pending";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function trackPixel(command: string, ...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(command, ...args);
  }
}
