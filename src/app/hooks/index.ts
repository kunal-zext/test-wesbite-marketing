// Public surface for the app's data hooks.

// Newsletter (marketing site).
export {
  fetchNewsletterArticle,
  fetchNewsletters,
  useNewsletter,
  useNewsletterSubscription,
  NEWSLETTER_UNSUBSCRIBE_TOKEN_PARAM,
  NEWSLETTER_UNSUBSCRIBE_EMAIL_PARAM,
  type NewsletterArticle,
  type NewsletterArticleResult,
  type NewsletterArticleSuccess,
  type NewsletterFetchFailure,
  type NewsletterSubscribeInput,
  type NewsletterSubscribeResult,
  type NewslettersListResult,
  type NewslettersListSuccess,
  type NewslettersQueryParams,
  type NewsletterUnsubscribeInput,
  type NewsletterUnsubscribeResult,
} from "./useNewsletter";

// Google reCAPTCHA v3 (Zext Academy book form).
export { useRecaptcha } from "./useRecaptcha";

// MSG91 phone OTP (Zext Academy book form).
export { useMsg91Otp, type Msg91Otp } from "./useMsg91Otp";
