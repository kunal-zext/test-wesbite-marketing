"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils";

function getTimePartsInZone(d: Date, timeZone: string) {
  const str = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  }).format(d);
  const [h24s, ms, ss] = str.split(":");
  const hour24 = parseInt(h24s, 10);
  const hour12 = hour24 % 12 || 12;
  const ampm = hour24 < 12 ? "AM" : "PM";
  return {
    h: String(hour12).padStart(2, "0"),
    m: ms,
    s: ss,
    ampm,
  };
}

function Colon() {
  return (
    <span
      className="mx-0.5 flex flex-col items-center justify-center gap-[0.3vh] self-center pb-0.5 sm:mx-1"
      aria-hidden
    >
      <span className="size-[0.3vh] rounded-[0.1vh] bg-white sm:size-1" />
      <span className="size-[0.3vh] rounded-[0.1vh] bg-white sm:size-1" />
    </span>
  );
}

function SmallColon() {
  return (
    <span className="mx-[0.1vh] text-white/50" aria-hidden>
      :
    </span>
  );
}

function SmallZoneClock({
  label,
  parts,
  mounted,
  className,
}: {
  label: string;
  parts: ReturnType<typeof getTimePartsInZone> | null;
  mounted: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5",
        className,
      )}
    >
      <span className="min-w-8 text-[0.9vh] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-[1vh]">
        {label}
      </span>
      <div className="flex items-baseline gap-0 tabular-nums text-white/75">
        {mounted && parts ? (
          <>
            <span className="text-[1.1vh] font-medium sm:text-xs">{parts.h}</span>
            <SmallColon />
            <span className="text-[1.1vh] font-medium sm:text-xs">{parts.m}</span>
            <SmallColon />
            <span className="text-[1.1vh] font-medium sm:text-xs">{parts.s}</span>
            <span className="ml-1 text-[0.9vh] font-medium text-white/55 sm:text-[1vh]">
              {parts.ampm}
            </span>
          </>
        ) : (
          <>
            <span className="text-[1.1vh] text-white/25 sm:text-xs">--</span>
            <SmallColon />
            <span className="text-[1.1vh] text-white/25 sm:text-xs">--</span>
            <SmallColon />
            <span className="text-[1.1vh] text-white/25 sm:text-xs">--</span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Live clock for Asia/Kolkata, plus USA and UAE.
 * Mobile: secondary zones sit to the right of the Mumbai time; sm+: row below.
 */
export default function FooterMumbaiClock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mumbai = now ? getTimePartsInZone(now, "Asia/Kolkata") : null;
  const est = now ? getTimePartsInZone(now, "America/New_York") : null;
  const uae = now ? getTimePartsInZone(now, "Asia/Dubai") : null;

  const mumbaiLive = mounted && mumbai;
  const digitClass = cn(
    "font-bold tabular-nums tracking-tight text-[clamp(1.75rem,5vw,2.75rem)] leading-none",
    mumbaiLive ? "text-white" : "text-white/25",
  );
  const ampmClass = cn(
    "ml-1 pb-0.5 text-[1vh] font-medium tabular-nums sm:text-[1.1vh]",
    mumbaiLive ? "text-white" : "text-white/25",
  );

  return (
    <div className="max-w-md">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[1.1vh] sm:gap-x-3 sm:text-xs">
        <span className="font-medium text-white">Based in Mumbai, India</span>
        <span className="text-white/35">Serving clients globally</span>
      </div>

      <div className="flex flex-row items-end justify-between gap-3 sm:flex-col sm:items-stretch sm:justify-start sm:gap-0">
        <div className="flex min-w-0 shrink-0 flex-wrap items-end gap-0.5 sm:gap-1">
          <span className={digitClass}>
            {mumbaiLive ? mumbai.h : "--"}
          </span>
          <Colon />
          <span className={digitClass}>
            {mumbaiLive ? mumbai.m : "--"}
          </span>
          <Colon />
          <span className={digitClass}>
            {mumbaiLive ? mumbai.s : "--"}
          </span>
          <span className={ampmClass}>
            {mumbaiLive ? mumbai.ampm : "--"}
          </span>
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col items-end gap-1.5 sm:mt-3 sm:w-full sm:flex-initial sm:flex-row sm:items-baseline sm:gap-x-8 sm:gap-y-2"
          aria-label="Other office times"
        >
          <SmallZoneClock
            label="USA"
            parts={est}
            mounted={mounted}
            className="justify-end sm:justify-start"
          />
          <SmallZoneClock
            label="UAE"
            parts={uae}
            mounted={mounted}
            className="justify-end sm:justify-start"
          />
        </div>
      </div>
    </div>
  );
}
