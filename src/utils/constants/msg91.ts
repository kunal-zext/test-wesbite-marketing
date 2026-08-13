/**
 * MSG91 OTP widget — phone verification on the Zext Academy book form.
 *
 * The widget runs in the browser: it sends the OTP, checks it, and hands the page
 * a JWT. That JWT rides along with the lead to zext-utilities, which asks
 * zext-auth-server whether MSG91 really issued it and which number it went to.
 * Nothing the browser says about the OTP is trusted on its own.
 */

/**
 * Widget id and widget token. Public by design: they ship in the page to every
 * visitor, exactly like RECAPTCHA_SITE_KEY. Abuse is held off by the hCaptcha
 * configured on the widget in the MSG91 dashboard, not by hiding these.
 *
 * `tokenAuth` is NOT the account auth key, despite the name. The auth key is a
 * different value, it is secret, and it lives only in zext-auth-server — it's
 * what verifies the JWT this widget hands back. Never put it in this file.
 *
 * Empty = OTP off; the form submits with no token, exactly as it did before.
 */
export const MSG91_WIDGET_ID: string = "36676d653447363239363230";
export const MSG91_TOKEN_AUTH: string = "550007TH3aX1QQJrj6a547eceP1";

/**
 * How many digits the OTP has. Must match the OTP length set on the widget in the
 * MSG91 dashboard — the widget mints whatever length is configured there, and the
 * form just draws that many boxes.
 */
export const MSG91_OTP_LENGTH = 4;

/** Seconds before "Resend code" becomes available again. */
export const MSG91_RESEND_SECONDS = 60;

/** Retry channel codes. SMS is '11'; '12' WhatsApp, '4' voice, '3' email. */
export const MSG91_CHANNEL_SMS = "11";

export const MSG91_SCRIPT_URL = "https://verify.msg91.com/otp-provider.js";

/**
 * DOM id the widget draws its captcha into. */
export const MSG91_CAPTCHA_CONTAINER_ID = "msg91-captcha";

export const isMsg91Configured = (): boolean =>
  Boolean(MSG91_WIDGET_ID && MSG91_TOKEN_AUTH);

/**
 * The form keeps the country code and number apart and tolerates punctuation
 * ("+91", "98765 43210"); MSG91 wants them joined, digits only ("919876543210").
 * zext-auth-server compares the number it verified against the lead on exactly
 * this basis, so the two must agree.
 */
export const toMsg91Identifier = (countryCode: string, phone: string): string =>
  `${countryCode}${phone}`.replace(/\D/g, "");

/**
 * The widget's success/failure callbacks are handed an envelope whose `message`
 * field is overloaded: it carries the request id after sendOtp, and the JWT
 * access token after verifyOtp. `type` is "success" or "error".
 *
 * Except when it doesn't: sendOtp/retryOtp sometimes return the id in an explicit
 * `reqId` instead, leaving `message` as prose ("OTP sent successfully"). Read
 * `reqId` first and only fall back to `message` — mistaking the prose for an id
 * sends the OTP fine and then fails to verify it.
 */
export type Msg91Response = {
  type?: string;
  message?: string;
  reqId?: string;
  token?: string;
  code?: number;
  [key: string]: unknown;
};

type Msg91Callback = (data: Msg91Response) => void;

declare global {
  interface Window {
    initSendOTP?: (config: {
      widgetId: string;
      tokenAuth: string;
      identifier?: string;
      exposeMethods?: boolean;
      captchaRenderId?: string;
      success?: Msg91Callback;
      failure?: Msg91Callback;
    }) => void;
    // Present only once the script has run with exposeMethods: true.
    sendOtp?: (
      identifier: string,
      success?: Msg91Callback,
      failure?: Msg91Callback,
    ) => void;
    retryOtp?: (
      channel: string | null,
      success?: Msg91Callback,
      failure?: Msg91Callback,
      reqId?: string,
    ) => void;
    verifyOtp?: (
      otp: string,
      success?: Msg91Callback,
      failure?: Msg91Callback,
      reqId?: string,
    ) => void;
  }
}
