"use client";

import { useEffect } from "react";
import { MailCheck, X } from "lucide-react";
import { cn } from "@/utils";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function DuplicateModal({ open, message, onClose }: Props) {
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

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="You're already registered"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[22px] border border-white/10 bg-linear-to-b from-tertiary to-[#0f1830] p-7 text-center shadow-[0_30px_70px_-30px_rgba(5,12,30,0.7)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary/15">
          <MailCheck className="size-7 text-secondary" strokeWidth={2} aria-hidden />
        </div>

        <h2 className="mt-5 font-(family-name:--font-poppins) text-xl font-bold text-white">
          You&apos;re already on the list
        </h2>
        <p className="mx-auto mt-2.5 max-w-[36ch] text-[15px] leading-relaxed text-white/60">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={cn(
            "mt-7 inline-flex w-full items-center justify-center rounded-full py-3.5 font-(family-name:--font-poppins) text-base font-semibold",
            "bg-secondary text-[#0a1024] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#a7e9ff]",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
