import { API_ENDPOINTS } from "@/utils/constants/apiEndpoints";
import { parseApiError } from "@/utils/api/parseApiError";

/**
 * Client transport for custom Calendly discovery-call scheduling against the
 * utilities service: list bookable slots, then book one for a saved lead.
 */

export type Slot = { start_time: string; invitees_remaining?: number | null };

export type AvailabilityResult =
  | { ok: true; slots: Slot[] }
  | { ok: false; error: string };

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

const base = () => API_ENDPOINTS.utilitiesApiBaseUrl.replace(/\/$/, "");

const NETWORK_ERROR =
  "Couldn't reach the server. Check your connection and try again.";

export async function getAvailability(params?: {
  start_time?: string;
  end_time?: string;
}): Promise<AvailabilityResult> {
  try {
    const qs = new URLSearchParams();
    if (params?.start_time) qs.set("start_time", params.start_time);
    if (params?.end_time) qs.set("end_time", params.end_time);
    const query = qs.toString();
    const res = await fetch(
      `${base()}/calendly/availability${query ? `?${query}` : ""}`,
    );
    if (!res.ok) {
      return { ok: false, error: await parseApiError(res) };
    }
    const data = await res.json().catch(() => ({}));
    return { ok: true, slots: Array.isArray(data?.slots) ? data.slots : [] };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

export async function createBooking(body: {
  lead_id: string;
  start_time: string;
  timezone: string;
}): Promise<BookingResult> {
  try {
    const res = await fetch(`${base()}/calendly/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return { ok: false, error: await parseApiError(res), status: res.status };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}
