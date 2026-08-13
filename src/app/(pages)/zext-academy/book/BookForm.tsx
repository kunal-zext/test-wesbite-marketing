"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/utils";
import { submitLead } from "@/utils/api/leadClient";
import { ACADEMY_LEAD_FLAG } from "@/utils/analytics/metaPixel";
import { RECAPTCHA_ACTION_BOOK } from "@/utils/constants/recaptcha";
import {
  MSG91_CAPTCHA_CONTAINER_ID,
  isMsg91Configured,
  toMsg91Identifier,
} from "@/utils/constants/msg91";
import { useMsg91Otp, useNewsletter, useRecaptcha } from "@/app/hooks";
import { RoleSelect } from "./RoleSelect";
import { DuplicateModal } from "./DuplicateModal";
import { OtpModal } from "./OtpModal";
// Calendly scheduling disabled
// import { SchedulerModal } from "./SchedulerModal";
import { BOOK } from "../data";

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-tertiary px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/25";
const ERROR_CLASS =
  "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/25";
const LABEL_CLASS =
  "mb-1.5 block font-(family-name:--font-space-mono) text-[13px] tracking-[0.04em] text-white/55";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE = [0.22, 1, 0.36, 1] as const;

const OTHER_ROLE = "Other";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "role" | "otherRole", string>
>;

/** Show the visitor enough of their number to recognise it, not enough to leak it. */
function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 2)}${"X".repeat(digits.length - 4)}${digits.slice(-2)}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[12px] text-rose-300">{message}</p>;
}

export function BookForm() {
  const router = useRouter();
  const { subscribe: subscribeNewsletter } = useNewsletter();
  const { execute: executeRecaptcha } = useRecaptcha();
  const otp = useMsg91Otp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [consent, setConsent] = useState(true);
  // Calendly scheduling disabled
  // const [wantsMeeting, setWantsMeeting] = useState(false);
  // const [schedulerOpen, setSchedulerOpen] = useState(false);
  // const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  // The identifier the current pending OTP was sent to. Re-submitting for the
  // same number reopens that code step instead of spending a fresh captcha (which
  // we no longer have) on a duplicate send.
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    const em = email.trim();
    if (!em) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(em)) next.email = "Enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (!role) next.role = "Please choose an option.";
    else if (role === OTHER_ROLE && !otherRole.trim())
      next.otherRole = "Please tell us your role.";
    return next;
  }

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  // Submitting no longer posts the lead — it sends a code and hands over to the
  // OTP modal. The lead is created from onVerified, once the phone is proven.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;

    setError(null);
    setNotice(null);

    const identifier = isMsg91Configured()
      ? toMsg91Identifier(countryCode, phone)
      : null;

    // An OTP is already out for this exact number — reopen the code step rather
    // than send again. The first send spent the single-use captcha, so a fresh
    // sendOtp here would fire against a dead token and hang the form. Editing the
    // number changes `identifier`, so that correctly falls through to a new send.
    if (identifier && sentTo === identifier) {
      setSubmitting(true);
      setOtpOpen(true);
      return;
    }

    // hCaptcha must be solved first — the widget would reject the send anyway
    // ("Invalid Captcha Token"), and the button is disabled until then, so this
    // only catches an Enter-key submit that slips past the disabled button.
    if (isMsg91Configured() && !otp.captchaReady) {
      setError("Please complete the “I am human” check to continue.");
      return;
    }

    setSubmitting(true);

    // No widget credentials yet — capture the lead as before, unverified.
    if (!identifier) {
      await createLead();
      return;
    }

    try {
      await otp.sendOtp(identifier);
      setSentTo(identifier);
      setOtpOpen(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send the verification code. Please try again.",
      );
      setSubmitting(false);
    }
  }

  function onVerified(accessToken: string) {
    setOtpOpen(false);
    void createLead(accessToken);
  }

  // Closing the modal abandons the attempt — hand the form back.
  function onOtpClose() {
    setOtpOpen(false);
    setSubmitting(false);
  }

  async function createLead(msg91Token?: string) {
    // Minted here rather than at submit: a v3 token dies after ~2 minutes, and
    // waiting for an SMS to arrive and be typed in routinely outlasts that. The
    // execute() call is invisible, so re-minting costs the visitor nothing.
    const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTION_BOOK);

    const res = await submitLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country_code: countryCode.trim() || "+91",
      organization: organization.trim(),
      role: role === OTHER_ROLE ? otherRole.trim() : role,
      newsletter_consent: consent,
      ...(recaptchaToken ? { recaptcha_token: recaptchaToken } : {}),
      ...(msg91Token ? { msg91_access_token: msg91Token } : {}),
      // wants_meeting: false,  // Calendly scheduling disabled
    });
    if (res.ok) {
      if (consent) {
        // Fired async
        void subscribeNewsletter({
          email: email.trim(),
          organization: organization.trim() || undefined,
        });
      }
      // Calendly scheduling disabled
      // if (wantsMeeting && res.id) {
      //   setLeadId(res.id);
      //   setSchedulerOpen(true);
      //   setSubmitting(false);
      //   return;
      // }
      try {
        sessionStorage.setItem(ACADEMY_LEAD_FLAG, "1");
      } catch {
      }
      router.push("/zext-academy/thank-you");
      return;
    }
    // A duplicate (409) isn't a failure — show it as a friendly notice.
    if (res.duplicate) {
      setNotice(res.error);
    } else {
      setError(res.error);
    }
    setSubmitting(false);
  }

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div
        className="pointer-events-none absolute -top-[20%] -right-[10%] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(143,224,255,0.14),transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[25%] -left-[15%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(140,82,255,0.12),transparent_62%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-14">
        {/* Reassurance */}
        <div className="max-md:order-2">
          <span className="font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.26em] text-secondary">
            {BOOK.eyebrow}
          </span>
          <h1 className="mt-3.5 max-w-[14ch] font-(family-name:--font-poppins) text-[clamp(30px,4vw,42px)] font-bold leading-[1.12] tracking-tight text-white">
            {BOOK.heading}
          </h1>
          <p className="mt-4 max-w-[42ch] text-[17px] leading-relaxed text-white/55">
            {BOOK.lead}
          </p>
          <ol className="mt-8 flex flex-col gap-[18px]">
            {BOOK.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-secondary/15 font-(family-name:--font-poppins) text-[13px] font-bold text-secondary">
                  {i + 1}
                </span>
                <span className="text-[15px] text-white">
                  {step.title}
                  <span className="block text-[14px] text-white/50">
                    {step.sub}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
            {BOOK.badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 font-(family-name:--font-space-mono) text-xs tracking-[0.06em] text-white/55"
              >
                <Check
                  className="size-3.5 text-secondary"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-[22px] border border-white/10 bg-linear-to-b from-tertiary to-[#0f1830] p-7 shadow-[0_30px_70px_-30px_rgba(5,12,30,0.7)] max-md:order-1 sm:p-9">
          <h2 className="font-(family-name:--font-poppins) text-2xl font-bold text-white">
            {BOOK.formTitle}
          </h2>
          <p className="mt-1.5 text-sm text-white/55">{BOOK.formSub}</p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="name" className={LABEL_CLASS}>
                Full name <span className="text-secondary">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                aria-invalid={!!errors.name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                className={cn(INPUT_CLASS, errors.name && ERROR_CLASS)}
              />
              <FieldError message={errors.name} />
            </div>

            <div>
              <label htmlFor="email" className={LABEL_CLASS}>
                Email <span className="text-secondary">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                aria-invalid={!!errors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className={cn(INPUT_CLASS, errors.email && ERROR_CLASS)}
              />
              <FieldError message={errors.email} />
            </div>

            <div>
              <label htmlFor="phone" className={LABEL_CLASS}>
                Phone / WhatsApp <span className="text-secondary">*</span>
              </label>
              <div className="flex gap-2.5">
                <input
                  aria-label="Country code"
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={cn(INPUT_CLASS, "w-[76px] shrink-0 text-center")}
                />
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="98765 43210"
                  value={phone}
                  aria-invalid={!!errors.phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearError("phone");
                  }}
                  className={cn(INPUT_CLASS, errors.phone && ERROR_CLASS)}
                />
              </div>
              <FieldError message={errors.phone} />
            </div>

            <div>
              <label htmlFor="organization" className={LABEL_CLASS}>
                Organization
              </label>
              <input
                id="organization"
                type="text"
                autoComplete="organization"
                placeholder="Company or organization (optional)"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="role" className={LABEL_CLASS}>
                What best describes you? <span className="text-secondary">*</span>
              </label>
              <RoleSelect
                id="role"
                value={role}
                onChange={(v) => {
                  setRole(v);
                  clearError("role");
                  if (v !== OTHER_ROLE) clearError("otherRole");
                }}
                options={BOOK.roles}
                placeholder="Select one"
                invalid={!!errors.role}
              />
              <FieldError message={errors.role} />

              <AnimatePresence initial={false}>
                {role === OTHER_ROLE ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3">
                      <label htmlFor="otherRole" className={LABEL_CLASS}>
                        Please specify <span className="text-secondary">*</span>
                      </label>
                      <input
                        id="otherRole"
                        type="text"
                        autoFocus
                        placeholder="Tell us what you do"
                        value={otherRole}
                        aria-invalid={!!errors.otherRole}
                        onChange={(e) => {
                          setOtherRole(e.target.value);
                          clearError("otherRole");
                        }}
                        className={cn(INPUT_CLASS, errors.otherRole && ERROR_CLASS)}
                      />
                      <FieldError message={errors.otherRole} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-secondary"
              />
              <span className="text-[13px] leading-relaxed text-white/55">
                Keep me posted send me AI tips, updates and new programmes from
                Zext.
              </span>
            </label>

            {/* Calendly scheduling disabled
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={wantsMeeting}
                onChange={(e) => setWantsMeeting(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-secondary"
              />
              <span className="text-[13px] leading-relaxed text-white/55">
                I&apos;d like to schedule a free 30-minute discovery call.
              </span>
            </label>
            */}

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
              >
                {error}
              </p>
            ) : null}

            {isMsg91Configured() ? (
              <div
                id={MSG91_CAPTCHA_CONTAINER_ID}
                className="flex min-h-[78px] items-center justify-center empty:hidden"
              />
            ) : null}

            {isMsg91Configured() && !otp.captchaReady ? (
              <p className="-mt-1 text-center text-[12px] text-white/45">
                Complete the verification above to continue.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !otp.captchaReady}
              className={cn(
                "mt-1 inline-flex items-center justify-center gap-2 rounded-full py-4 font-(family-name:--font-poppins) text-base font-semibold",
                "bg-secondary text-[#0a1024] shadow-[0_12px_30px_-8px_rgba(143,224,255,0.5)]",
                "transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:bg-[#a7e9ff]",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
              )}
            >
              {submitting ? "Sending…" : BOOK.submit}
              {submitting ? null : <span aria-hidden>→</span>}
            </button>
            <p className="text-center text-xs leading-relaxed text-white/45">
              {BOOK.privacy}
            </p>
            <p className="text-center text-[11px] leading-relaxed text-white/30">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-white/50"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-white/50"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>

      {/* Calendly scheduling disabled
      {leadId ? (
        <SchedulerModal
          open={schedulerOpen}
          leadId={leadId}
          onClose={() => {
            setSchedulerOpen(false);
            router.push("/zext-academy/thank-you");
          }}
          onBooked={() => {
            setSchedulerOpen(false);
            router.push("/zext-academy/thank-you");
          }}
        />
      ) : null}
      */}

      <OtpModal
        open={otpOpen}
        phoneLabel={`${countryCode.trim() || "+91"} ${maskPhone(phone)}`}
        otp={otp}
        onVerified={onVerified}
        onClose={onOtpClose}
      />

      <DuplicateModal
        open={!!notice}
        message={notice ?? ""}
        onClose={() => setNotice(null)}
      />
    </section>
  );
}
