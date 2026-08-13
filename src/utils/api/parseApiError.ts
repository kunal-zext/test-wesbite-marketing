/**
 * Turn a failed FastAPI Response into a human-readable message.
 * Domain errors return a string `detail`; validation (422) returns an array of
 * `{ loc, msg }`. Anything else falls back to the provided default.
 */
export async function parseApiError(
  res: Response,
  fallback = "Something went wrong. Please try again.",
): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) {
      const parts = body.detail
        .map((d: { loc?: unknown[]; msg?: string }) => {
          const field =
            Array.isArray(d?.loc) && d.loc.length
              ? String(d.loc[d.loc.length - 1])
              : "";
          const msg = (d?.msg ?? "").replace(/^Value error,\s*/i, "");
          return field && msg ? `${field}: ${msg}` : msg;
        })
        .filter(Boolean);
      if (parts.length) return parts.join(" · ");
    }
  } catch {
    /* non-JSON error body — keep the default message */
  }
  return fallback;
}
