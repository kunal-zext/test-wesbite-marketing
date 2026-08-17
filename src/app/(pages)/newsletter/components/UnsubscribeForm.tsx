import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import UnsubscribeReasonSelect from "@/app/(pages)/newsletter/components/UnsubscribeReasonSelect";
import { UNSUBSCRIBE_OTHER_REASON_VALUE } from "@/utils/constants/unsubscribeLeaveReasons";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const formShellClass =
  "overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-white/2 to-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_48px_-24px_rgba(0,0,0,0.55)] sm:rounded-[1.35rem]";

export type UnsubscribeFormProps = {
  email: string;
  reason: string;
  otherDetail: string;
  emailErr: string;
  reasonErr: string;
  otherErr: string;
  /** API / server error shown above the submit button */
  formError?: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onOtherDetailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function UnsubscribeForm({
  email,
  reason,
  otherDetail,
  emailErr,
  reasonErr,
  otherErr,
  formError,
  isLoading,
  onEmailChange,
  onReasonChange,
  onOtherDetailChange,
  onSubmit,
}: UnsubscribeFormProps) {
  const showOtherDetail = reason === UNSUBSCRIBE_OTHER_REASON_VALUE;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(formShellClass, "overflow-visible")}
    >
      <div className="border-b border-white/10 bg-white/3 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-rose-400/50" />
            <span className="size-2 rounded-full bg-amber-400/35" />
            <span className="size-2 rounded-full bg-emerald-400/35" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Unsubscribe
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/55">
            <span className="relative flex size-1.5">
              <span className="relative inline-flex size-1.5 rounded-full bg-white/40" />
            </span>
            Request
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
            htmlFor="unsub-email"
            className="mb-2 block text-sm font-medium text-white/60"
          >
            Email address <span className="text-rose-400/90">*</span>
          </label>
          <input
            id="unsub-email"
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

        <div className="relative z-10 mb-7">
          <label
            htmlFor="unsub-reason-trigger"
            className="mb-2 block text-sm font-medium text-white/60"
          >
            Reason for leaving <span className="text-rose-400/90">*</span>
          </label>
          <UnsubscribeReasonSelect
            value={reason}
            onChange={onReasonChange}
            disabled={isLoading}
            hasError={!!reasonErr}
          />
          <AnimatePresence>
            {reasonErr ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1.5 text-xs text-rose-400"
              >
                {reasonErr}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {showOtherDetail ? (
              <motion.div
                key="other-detail"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-5">
                  <label
                    htmlFor="unsub-other-detail"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Tell us more <span className="text-rose-400/90">*</span>
                  </label>
                  <textarea
                    id="unsub-other-detail"
                    name="otherDetail"
                    rows={3}
                    placeholder="A sentence or two is enough. We read these."
                    value={otherDetail}
                    onChange={(e) => onOtherDetailChange(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "min-h-[88px] w-full resize-y rounded-xl border bg-white/4 px-4 py-3 text-sm leading-relaxed text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:ring-2 disabled:opacity-50",
                      otherErr
                        ? "border-rose-400/45 focus:border-rose-400/60 focus:ring-rose-400/15"
                        : "border-white/10 focus:border-secondary/45 focus:ring-secondary/15",
                    )}
                  />
                  <AnimatePresence>
                    {otherErr ? (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 text-xs text-rose-400"
                      >
                        {otherErr}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
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
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/12 bg-white/5 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-rose-400/35 hover:bg-rose-500/10 hover:text-rose-100 hover:shadow-[0_0_36px_-6px_rgba(248,113,113,0.2)] disabled:pointer-events-none disabled:opacity-55"
        >
          {isLoading ? (
            <Loader2
              className="size-4 animate-spin"
              strokeWidth={2}
              aria-hidden
            />
          ) : (
            <>
              Confirm unsubscribe
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
