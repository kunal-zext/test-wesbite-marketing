/** Select value for the “Other” option — show a free-text follow-up when this is chosen. */
export const UNSUBSCRIBE_OTHER_REASON_VALUE = "other" as const;

export const UNSUBSCRIBE_LEAVE_REASONS = [
  {
    value: "too_frequent",
    label: "I receive emails too often",
  },
  {
    value: "not_relevant",
    label: "Content isn’t relevant to my work",
  },
  {
    value: "inbox_cleanup",
    label: "I’m reducing inbox volume",
  },
  {
    value: "never_signed_up",
    label: "I don’t remember signing up",
  },
  {
    value: "prefer_other_channel",
    label: "I prefer updates on another channel",
  },
  {
    value: "other",
    label: "Other",
  },
] as const;

export type UnsubscribeLeaveReasonValue =
  (typeof UNSUBSCRIBE_LEAVE_REASONS)[number]["value"];

export function isUnsubscribeLeaveReason(
  value: string,
): value is UnsubscribeLeaveReasonValue {
  return UNSUBSCRIBE_LEAVE_REASONS.some((r) => r.value === value);
}
