"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { cn } from "@/utils";
import { MSG91_OTP_LENGTH, MSG91_RESEND_SECONDS } from "@/utils/constants/msg91";
import type { Msg91Otp } from "@/app/hooks";

type Props = {
  open: boolean;
  /** Masked number to show back to the visitor, e.g. "+91 98XXXXXX10". */
  phoneLabel: string;
  /** The widget API from useMsg91Otp. Owned by the form, because the request id
   *  from its sendOtp is what resend and verify below hang off. */
  otp: Msg91Otp;
  /** Handed the MSG91 access token once the code checks out. */
  onVerified: (accessToken: string) => void;
  onClose: () => void;
};

const EMPTY = () => Array<string>(MSG91_OTP_LENGTH).fill("");

export function OtpModal({ open, phoneLabel, otp, onVerified, onClose }: Props) {
  const [digits, setDigits] = useState<string[]>(EMPTY);
  const [countdown, setCountdown] = useState(MSG91_RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");
  const complete = code.length === MSG91_OTP_LENGTH;

  // Fresh state every time the form sends a new code.
  useEffect(() => {
    if (!open) return;
    setDigits(EMPTY());
    setCountdown(MSG91_RESEND_SECONDS);
    setVerifying(false);
    setResending(false);
    setError(null);
    inputs.current[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [open, countdown]);

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

  const verify = useCallback(async () => {
    if (!complete || verifying) return;
    setVerifying(true);
    setError(null);
    try {
      onVerified(await otp.verifyOtp(code));
    } catch (e) {
      setError(e instanceof Error ? e.message : "That code didn't work.");
      setDigits(EMPTY());
      inputs.current[0]?.focus();
      setVerifying(false);
    }
    // Deliberately not clearing `verifying` on success: the form takes over from
    // here (it still has to mint a reCAPTCHA token and post the lead), and a
    // button that springs back to life mid-submit invites a double-send.
  }, [code, complete, onVerified, otp, verifying]);

  async function resend() {
    if (countdown > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      await otp.resendOtp();
      setDigits(EMPTY());
      setCountdown(MSG91_RESEND_SECONDS);
      inputs.current[0]?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't resend the code.");
    } finally {
      setResending(false);
    }
  }

  function fill(from: number, value: string) {
    const chars = value.replace(/\D/g, "").split("");
    if (chars.length === 0) {
      setDigits((prev) => prev.map((d, i) => (i === from ? "" : d)));
      return;
    }
    // One field can absorb a whole pasted code — spread it across the boxes.
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((ch, i) => {
        if (from + i < MSG91_OTP_LENGTH) next[from + i] = ch;
      });
      return next;
    });
    const landed = Math.min(from + chars.length, MSG91_OTP_LENGTH - 1);
    inputs.current[landed]?.focus();
  }

  function onKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < MSG91_OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Verify your phone number"
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
          <ShieldCheck className="size-7 text-secondary" strokeWidth={2} aria-hidden />
        </div>

        <h2 className="mt-5 font-(family-name:--font-poppins) text-xl font-bold text-white">
          Verify your number
        </h2>
        <p className="mx-auto mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-white/60">
          We sent a {MSG91_OTP_LENGTH}-digit code to{" "}
          <span className="font-medium text-white/85">{phoneLabel}</span>.
        </p>

        <div className="mt-6 flex justify-center gap-2 sm:gap-2.5">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-label={`Digit ${i + 1}`}
              value={digit}
              disabled={verifying}
              onChange={(e) => fill(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className={cn(
                "size-11 rounded-xl border bg-tertiary text-center font-(family-name:--font-poppins) text-lg font-semibold text-white sm:size-12",
                "outline-none transition-[border-color,box-shadow] duration-200",
                "focus:border-secondary focus:ring-2 focus:ring-secondary/25",
                "disabled:opacity-60",
                error ? "border-rose-400/60" : "border-white/10",
              )}
            />
          ))}
        </div>

        {error ? (
          <p role="alert" className="mt-4 text-[13px] text-rose-300">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={verify}
          disabled={!complete || verifying}
          className={cn(
            "mt-6 inline-flex w-full items-center justify-center rounded-full py-3.5 font-(family-name:--font-poppins) text-base font-semibold",
            "bg-secondary text-[#0a1024] transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:bg-[#a7e9ff]",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
          )}
        >
          {verifying ? "Verifying…" : "Verify & continue"}
        </button>

        <p className="mt-4 font-(family-name:--font-space-mono) text-[13px] text-white/45">
          {countdown > 0 ? (
            <>Resend code in {countdown}s</>
          ) : (
            <button
              type="button"
              onClick={resend}
              disabled={resending}
              className="text-secondary underline underline-offset-4 transition-colors hover:text-white disabled:opacity-60"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
