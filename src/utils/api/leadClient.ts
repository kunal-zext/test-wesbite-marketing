import { API_ENDPOINTS } from "@/utils/constants/apiEndpoints";
import { parseApiError } from "@/utils/api/parseApiError";

/**
 * Client transport for the Zext Academy discovery-call lead form.
 */

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  organization: string;
  role: string;
  newsletter_consent: boolean;
  /**
   * reCAPTCHA v3 token minted at submit. Omitted when reCAPTCHA is switched off
   * or its script failed to load; the backend rejects a missing token only when
   * it has a secret key configured.
   */
  recaptcha_token?: string;
  /**
   * JWT from the MSG91 OTP widget, proving the phone above belongs to whoever
   * filled this in. Omitted when the OTP step is switched off; the backend
   * rejects a missing token only when MSG91 is configured, and checks the number
   * it verified against `country_code` + `phone`.
   */
  msg91_access_token?: string;
  // Calendly scheduling disabled
  // wants_meeting: boolean;
};

export type LeadResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; duplicate?: boolean };

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const base = API_ENDPOINTS.utilitiesApiBaseUrl.replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      // 409 = same email already submitted within the last 7 days.
      return { ok: false, error: await parseApiError(res), duplicate: res.status === 409 };
    }
    const data = await res.json().catch(() => ({}));
    if (data?.success === false) {
      return { ok: false, error: data?.error?.message || data?.message || "Couldn't submit your details. Please try again." };
    }
    return { ok: true, id: data?.id ?? data?.data?.id };
  } catch {
    return {
      ok: false,
      error: "Couldn't reach the server. Check your connection and try again.",
    };
  }
}
