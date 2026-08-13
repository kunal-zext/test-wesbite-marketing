"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsletterHeroColumn from "@/app/(pages)/newsletter/components/NewsletterHeroColumn";
import NewsletterPageBackground from "@/app/(pages)/newsletter/components/NewsletterPageBackground";
import NewsletterSubscribeForm from "@/app/(pages)/newsletter/components/NewsletterSubscribeForm";
import NewsletterSubscribeSuccess from "@/app/(pages)/newsletter/components/NewsletterSubscribeSuccess";
import { useNewsletterSubscription } from "@/app/hooks";

export default function NewsletterPageClient() {
  const { subscribe, isLoading } = useNewsletterSubscription();

  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [agreeErr, setAgreeErr] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let ok = true;
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailErr("Enter a valid email address.");
      ok = false;
    } else setEmailErr("");
    if (!agreed) {
      setAgreeErr("You must agree to continue.");
      ok = false;
    } else setAgreeErr("");
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormError("");

    const result = await subscribe({
      email: email.trim(),
      organization: org.trim() || undefined,
    });

    if (result.success) {
      setSuccess(true);
      return;
    }

    setFormError(result.message);
  };

  return (
    <div className="isolate flex min-h-[calc(100dvh-5rem)] w-full min-w-0 flex-col overflow-x-hidden bg-background">
      <NewsletterPageBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 md:px-6 md:pt-12 xl:max-w-[1600px]">
        <Link
          href="/"
          className="group mb-8 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 sm:mb-10"
        >
          <ArrowLeft
            className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
          Back to home
        </Link>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <NewsletterHeroColumn />

            <div className="order-1 min-w-0 lg:order-2">
              <AnimatePresence mode="wait">
                {success ? (
                  <NewsletterSubscribeSuccess key="success" />
                ) : (
                  <NewsletterSubscribeForm
                    key="form"
                    email={email}
                    org={org}
                    agreed={agreed}
                    emailErr={emailErr}
                    agreeErr={agreeErr}
                    formError={formError}
                    isLoading={isLoading}
                    onEmailChange={(v) => {
                      setEmail(v);
                      if (emailErr) setEmailErr("");
                      if (formError) setFormError("");
                    }}
                    onOrgChange={(v) => {
                      setOrg(v);
                      if (formError) setFormError("");
                    }}
                    onToggleAgree={() => {
                      setAgreed((p) => !p);
                      if (agreeErr) setAgreeErr("");
                      if (formError) setFormError("");
                    }}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
