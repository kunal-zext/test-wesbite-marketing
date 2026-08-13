"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsletterPageBackground from "@/app/(pages)/newsletter/components/NewsletterPageBackground";
import UnsubscribeForm from "@/app/(pages)/newsletter/components/UnsubscribeForm";
import UnsubscribeHeroColumn from "@/app/(pages)/newsletter/components/UnsubscribeHeroColumn";
import UnsubscribeSuccess from "@/app/(pages)/newsletter/components/UnsubscribeSuccess";
import { useNewsletterSubscription } from "@/app/hooks";
import {
  isUnsubscribeLeaveReason,
  UNSUBSCRIBE_LEAVE_REASONS,
  UNSUBSCRIBE_OTHER_REASON_VALUE,
} from "@/utils/constants/unsubscribeLeaveReasons";
import { ERROR_MESSAGES } from "@/utils/constants/error/messages";

export default function UnsubscribePageClient() {
  const {
    unsubscribe,
    token,
    email: emailFromQuery,
    isLoading,
  } = useNewsletterSubscription();

  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [otherDetail, setOtherDetail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [reasonErr, setReasonErr] = useState("");
  const [otherErr, setOtherErr] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [emailFromQuery]);

  useEffect(() => {
    if (!token) {
      setFormError(ERROR_MESSAGES.NEWSLETTER_UNSUBSCRIBE_INVALID_LINK);
    } else {
      setFormError((prev) =>
        prev === ERROR_MESSAGES.NEWSLETTER_UNSUBSCRIBE_INVALID_LINK ? "" : prev,
      );
    }
  }, [token]);

  const validate = () => {
    let ok = true;
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailErr("Enter a valid email address.");
      ok = false;
    } else setEmailErr("");

    if (!isUnsubscribeLeaveReason(reason)) {
      setReasonErr("Please select a reason for leaving.");
      ok = false;
    } else setReasonErr("");

    if (reason === UNSUBSCRIBE_OTHER_REASON_VALUE) {
      if (!otherDetail.trim()) {
        setOtherErr("Please add a short note so we understand.");
        ok = false;
      } else setOtherErr("");
    } else {
      setOtherErr("");
    }

    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setFormError(ERROR_MESSAGES.NEWSLETTER_UNSUBSCRIBE_INVALID_LINK);
      return;
    }

    setFormError("");

    if (!validate()) return;

    const label =
      UNSUBSCRIBE_LEAVE_REASONS.find((r) => r.value === reason)?.label ??
      reason;
    const reasonText =
      reason === UNSUBSCRIBE_OTHER_REASON_VALUE && otherDetail.trim()
        ? `${label}: ${otherDetail.trim()}`
        : label;

    const result = await unsubscribe({
      email: email.trim(),
      reason: reasonText,
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
            <UnsubscribeHeroColumn />

            <div className="order-1 min-w-0 lg:order-2">
              <AnimatePresence mode="wait">
                {success ? (
                  <UnsubscribeSuccess key="success" />
                ) : (
                  <UnsubscribeForm
                    key="form"
                    email={email}
                    reason={reason}
                    otherDetail={otherDetail}
                    emailErr={emailErr}
                    reasonErr={reasonErr}
                    otherErr={otherErr}
                    formError={formError}
                    isLoading={isLoading}
                    onEmailChange={(v) => {
                      setEmail(v);
                      if (emailErr) setEmailErr("");
                      if (formError) setFormError("");
                    }}
                    onReasonChange={(v) => {
                      setReason(v);
                      if (reasonErr) setReasonErr("");
                      if (formError) setFormError("");
                      if (v !== UNSUBSCRIBE_OTHER_REASON_VALUE) {
                        setOtherDetail("");
                        setOtherErr("");
                      }
                    }}
                    onOtherDetailChange={(v) => {
                      setOtherDetail(v);
                      if (otherErr) setOtherErr("");
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
