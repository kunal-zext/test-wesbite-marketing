/**
 * Google reCAPTCHA v3 — invisible bot protection on the Zext Academy book form.
 */

/**
 * Site key. Public by design: it ships in the page HTML to every visitor. 
 * Empty = reCAPTCHA off; the form submits with no token, exactly as it did before.
 */
export const RECAPTCHA_SITE_KEY: string = "6LeG7lAtAAAAAH23_As4jaNtqwpateiD5RYQRKIM";

/**
 * v3 tags every token with the action of the page that minted it, and the
 * backend refuses a token carrying any other action. Must stay in sync with
 * RECAPTCHA_ACTION in the utilities lead service.
 */
export const RECAPTCHA_ACTION_BOOK = "academy_book";

export const RECAPTCHA_SCRIPT_URL = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}
