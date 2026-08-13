import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const formShellClass =
  "overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-white/2 to-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_48px_-24px_rgba(0,0,0,0.55)] sm:rounded-[1.35rem]";

export type NewsletterSubscribeFormProps = {
  email: string;
  org: string;
  agreed: boolean;
  emailErr: string;
  agreeErr: string;
  /** API / server error shown below the form fields */
  formError?: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onOrgChange: (value: string) => void;
  onToggleAgree: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function NewsletterSubscribeForm({
  email,
  org,
  agreed,
  emailErr,
  agreeErr,
  formError,
  isLoading,
  onEmailChange,
  onOrgChange,
  onToggleAgree,
  onSubmit,
}: NewsletterSubscribeFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={formShellClass}
    >
      <div className="border-b border-white/10 bg-white/3 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/8" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Newsletter
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-secondary/25 bg-secondary/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-secondary/90">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/60 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(143,224,255,0.6)]" />
            </span>
            Open
          </span>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="px-6 py-8 sm:px-8 sm:py-9"
      >
        <div className="mb-5">
          <label
            htmlFor="nl-email"
            className="mb-2 block text-sm font-medium text-white/60"
          >
            Email address <span className="text-rose-400/90">*</span>
          </label>
          <input
            id="nl-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl border bg-white/4 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:ring-2 disabled:opacity-50",
              emailErr
                ? "border-rose-400/45 focus:border-rose-400/60 focus:ring-rose-400/15"
                : "border-white/10 focus:border-secondary/45 focus:ring-secondary/15",
            )}
          />
          <AnimatePresence>
            {emailErr ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1.5 text-xs text-rose-400"
              >
                {emailErr}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mb-6">
          <label
            htmlFor="nl-org"
            className="mb-2 block text-sm font-medium text-white/60"
          >
            Organisation{" "}
            <span className="font-normal text-white/30">(optional)</span>
          </label>
          <input
            id="nl-org"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            value={org}
            onChange={(e) => onOrgChange(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-secondary/45 focus:ring-2 focus:ring-secondary/15 disabled:opacity-50"
          />
        </div>

        <div className="mb-7">
          <label className="flex cursor-pointer items-start gap-3.5">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              onClick={onToggleAgree}
              className={cn(
                "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-200",
                agreed
                  ? "border-secondary/55 bg-secondary/18"
                  : agreeErr
                    ? "border-rose-400/55 bg-rose-400/10"
                    : "border-white/12 bg-white/5 hover:border-white/25",
              )}
            >
              <AnimatePresence>
                {agreed ? (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    viewBox="0 0 12 12"
                    className="size-2.5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1.5 6 4.5 9 10.5 3" />
                  </motion.svg>
                ) : null}
              </AnimatePresence>
            </button>
            <span className="text-xs leading-relaxed text-white/45">
              I agree to receive newsletters and updates from Zext Digital. Data
              is handled per our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-secondary/80 underline underline-offset-2 transition-colors hover:text-secondary"
              >
                Privacy Policy
              </Link>
              . Unsubscribe anytime. <span className="text-rose-400/90">*</span>
            </span>
          </label>
          <AnimatePresence>
            {agreeErr ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1.5 text-xs text-rose-400"
              >
                {agreeErr}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {formError ? (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-lg border border-rose-400/25 bg-rose-400/8 px-3 py-2.5 text-sm text-rose-100/95"
            >
              {formError}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/12 bg-white/5 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-secondary/45 hover:bg-secondary/10 hover:text-secondary hover:shadow-[0_0_36px_-6px_rgba(143,224,255,0.25)] disabled:pointer-events-none disabled:opacity-55"
        >
          {isLoading ? (
            <Loader2
              className="size-4 animate-spin"
              strokeWidth={2}
              aria-hidden
            />
          ) : (
            <>
              Subscribe to newsletter
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={2}
                aria-hidden
              />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
