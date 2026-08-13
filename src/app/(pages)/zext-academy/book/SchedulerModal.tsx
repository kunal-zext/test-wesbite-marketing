"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils";
import {
  createBooking,
  getAvailability,
  type Slot,
} from "@/utils/api/calendlyClient";

type Props = {
  open: boolean;
  leadId: string;
  onClose: () => void;
  onBooked: () => void;
};

const TZ =
  typeof Intl !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

type DayGroup = { key: string; label: string; slots: Slot[] };

// Group slots into calendar days in the invitee's timezone, preserving order.
function groupByDay(slots: Slot[]): DayGroup[] {
  const groups = new Map<string, DayGroup>();
  for (const slot of slots) {
    const date = new Date(slot.start_time);
    const key = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: TZ,
    });
    let group = groups.get(key);
    if (!group) {
      group = { key, label: key, slots: [] };
      groups.set(key, group);
    }
    group.slots.push(slot);
  }
  return [...groups.values()];
}

function timeLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  });
}

export function SchedulerModal({ open, leadId, onClose, onBooked }: Props) {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelected(null);
    const res = await getAvailability();
    if (res.ok) setSlots(res.slots);
    else setError(res.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function confirm() {
    if (!selected) return;
    setBooking(true);
    setError(null);
    const res = await createBooking({
      lead_id: leadId,
      start_time: selected,
      timezone: TZ,
    });
    if (res.ok) {
      onBooked();
      return;
    }
    // 409 = slot was taken between listing and booking; refresh the grid.
    if (res.status === 409) {
      setError("That time was just taken - please pick another slot.");
      await load();
    } else {
      setError(res.error);
    }
    setBooking(false);
  }

  const days = groupByDay(slots);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a discovery call"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[22px] border border-white/10 bg-linear-to-b from-tertiary to-[#0f1830] shadow-[0_30px_70px_-30px_rgba(5,12,30,0.7)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <h2 className="font-(family-name:--font-poppins) text-xl font-bold text-white">
              Pick a time
            </h2>
            <p className="mt-1 text-[13px] text-white/50">
              30-minute discovery call · times shown in {TZ}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="py-10 text-center text-sm text-white/55">
              Loading available times…
            </p>
          ) : days.length === 0 ? (
            <p className="py-10 text-center text-sm text-white/55">
              No open times in the next 7 days — we&apos;ll reach out to schedule.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {days.map((day) => (
                <div key={day.key}>
                  <p className="mb-2.5 font-(family-name:--font-space-mono) text-[12px] uppercase tracking-widest text-white/45">
                    {day.label}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {day.slots.map((slot) => (
                      <button
                        key={slot.start_time}
                        type="button"
                        onClick={() => setSelected(slot.start_time)}
                        className={cn(
                          "rounded-lg border px-2 py-2.5 text-[13px] transition-colors",
                          selected === slot.start_time
                            ? "border-secondary bg-secondary/20 text-white"
                            : "border-white/10 bg-tertiary text-white/75 hover:border-secondary/50",
                        )}
                      >
                        {timeLabel(slot.start_time)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {error ? (
          <p
            role="alert"
            className="mx-6 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
          >
            {error}
          </p>
        ) : null}

        <div className="border-t border-white/10 p-6">
          <button
            type="button"
            disabled={!selected || booking}
            onClick={confirm}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-(family-name:--font-poppins) text-base font-semibold",
              "bg-secondary text-[#0a1024] transition-[transform,opacity] duration-200 hover:-translate-y-0.5",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
            )}
          >
            {booking ? "Booking…" : "Confirm meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}
