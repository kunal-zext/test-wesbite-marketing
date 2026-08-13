/**
 * Central source of truth for backend service base URLs.
 */

export type ApiEndpoints = {
  /** Auth API */
  authApiBaseUrl: string;
  /** Utilities API (newsletter, blogs, leads, calendly) */
  utilitiesApiBaseUrl: string;
};

const development: ApiEndpoints = {
  authApiBaseUrl: "http://localhost:8080/api/v1",
  utilitiesApiBaseUrl: "http://localhost:8082/api/v1",
};

const production: ApiEndpoints = {
  authApiBaseUrl: "https://auth.zextdigital.ai/api/v1",
  utilitiesApiBaseUrl: "https://utilities.zextdigital.ai/api/v1",
};

const base: ApiEndpoints =
  process.env.NODE_ENV === "production" ? production : development;

export const API_ENDPOINTS: ApiEndpoints = {
  ...base,
  // Blogs are pre-rendered at build time from the utilities service. `next build`
  // always runs as production, so set UTILITIES_API_BASE_URL to point the build
  // at a reachable utilities instance
  utilitiesApiBaseUrl:
    process.env.UTILITIES_API_BASE_URL ?? base.utilitiesApiBaseUrl,
};
