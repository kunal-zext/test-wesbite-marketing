"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MSG91_CAPTCHA_CONTAINER_ID,
  MSG91_CHANNEL_SMS,
  MSG91_SCRIPT_URL,
  MSG91_TOKEN_AUTH,
  MSG91_WIDGET_ID,
  isMsg91Configured,
  type Msg91Response,
} from "@/utils/constants/msg91";

/**
 * MSG91 OTP widget, driven from our own UI.
 */

let scriptPromise: Promise<void> | null = null;
let renderedInto: HTMLElement | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.initSendOTP) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = MSG91_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load the OTP service."));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * The widget fetches its configuration from MSG91 before publishing the methods,
 * so they appear a beat after the script itself loads. Poll rather than assume.
 */
function waitForMethods(timeoutMs = 10_000): Promise<void> {
  const present = () =>
    Boolean(window.sendOtp && window.retryOtp && window.verifyOtp);

  return new Promise<void>((resolve, reject) => {
    if (present()) {
      resolve();
      return;
    }
    const startedAt = Date.now();
    const poll = setInterval(() => {
      if (present()) {
        clearInterval(poll);
        resolve();
      } else if (Date.now() - startedAt >= timeoutMs) {
        clearInterval(poll);
        reject(new Error("The OTP service didn't start. Please refresh and try again."));
      }
    }, 100);
  });
}

async function ready(): Promise<void> {
  await loadScript();
  const container = document.getElementById(MSG91_CAPTCHA_CONTAINER_ID);
  // Claim the container before the init call (and before returning), so if
  // StrictMode's paired effect resumes right after — it awaited the same
  // loadScript — it sees the container already taken and won't render a duplicate.
  if (container && renderedInto !== container) {
    renderedInto = container;
    window.initSendOTP?.({
      widgetId: MSG91_WIDGET_ID,
      tokenAuth: MSG91_TOKEN_AUTH,
      exposeMethods: true,
      captchaRenderId: MSG91_CAPTCHA_CONTAINER_ID,
      // Required, and unused. The widget throws "success callback function
      success: () => {},
      failure: () => {},
    });
  }
  await waitForMethods();
}

function toError(data: Msg91Response | undefined): Error {
  return new Error(data?.message || "Something went wrong. Please try again.");
}

/** The request id from a send/retry — see the note on Msg91Response. */
function requestId(data: Msg91Response): string | null {
  return data.reqId ?? data.message ?? null;
}

/** Promisify one widget call. The widget reports failure both by calling the
 *  failure callback and, sometimes, by passing type:"error" to the success one.
 *
 *  The timeout guards the case where it does *neither*: a spent (single-use)
 *  captcha token or a stale request can leave sendOtp/verifyOtp without ever
 *  calling back, which would otherwise leave the form hung on "Sending…" with no
 *  way out. Bounding the wait turns that dead end into a retryable error. */
function invoke(
  call: (success: (d: Msg91Response) => void, failure: (d: Msg91Response) => void) => void,
  timeoutMs = 20_000,
): Promise<Msg91Response> {
  return new Promise<Msg91Response>((resolve, reject) => {
    let settled = false;
    const finish = (run: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      run();
    };
    const timer = setTimeout(
      () =>
        finish(() =>
          reject(
            new Error(
              "The verification service didn't respond. Please refresh the page and try again.",
            ),
          ),
        ),
      timeoutMs,
    );
    call(
      (data) =>
        finish(() => (data?.type === "error" ? reject(toError(data)) : resolve(data))),
      (error) => finish(() => reject(toError(error))),
    );
  });
}

export type Msg91Otp = {
  /** Send an OTP to `identifier` (country code + number, digits only). */
  sendOtp: (identifier: string) => Promise<void>;
  /** Re-send over SMS, reusing the request id from the last send. */
  resendOtp: () => Promise<void>;
  /** Check the code. Resolves with the JWT access token the lead is submitted with. */
  verifyOtp: (otp: string) => Promise<string>;
  /** True once the visitor has solved the widget's hCaptcha and the token is still
   *  valid — the form gates sending on this. Always true when the widget is off,
   *  since there's nothing to solve then. */
  captchaReady: boolean;
};

export function useMsg91Otp(): Msg91Otp {
  // The request id ties retry and verify back to the send they belong to.
  const reqId = useRef<string | null>(null);
  // Nothing to solve when the widget is off, so the form isn't gated in that case.
  const configured = isMsg91Configured();
  const [captchaReady, setCaptchaReady] = useState(!configured);

  useEffect(() => {
    if (!configured) return;
    // Warm the script up while the visitor is still filling the form, so opening
    // the OTP step doesn't stall on a cold script fetch.
    void ready().catch(() => {
      // Surfaced when they actually try to send — nothing to say yet.
    });
    // The widget answers sendOtp with "Invalid Captcha Token" until its hCaptcha
    // is solved, so gate the form on it. hCaptcha writes the token into a hidden
    // field inside our container and clears it when the token expires; poll that
    // rather than its callbacks, which the MSG91 widget owns.
    const isSolved = () => {
      const fields = document
        .getElementById(MSG91_CAPTCHA_CONTAINER_ID)
        ?.querySelectorAll<HTMLTextAreaElement>('[name="h-captcha-response"]');
      return fields ? Array.from(fields).some((f) => f.value.length > 0) : false;
    };
    const poll = setInterval(() => {
      const next = isSolved();
      setCaptchaReady((prev) => (prev === next ? prev : next));
    }, 400);
    return () => clearInterval(poll);
  }, [configured]);

  const sendOtp = useCallback(async (identifier: string) => {
    await ready();
    const data = await invoke((success, failure) =>
      window.sendOtp!(identifier, success, failure),
    );
    reqId.current = requestId(data);
  }, []);

  const resendOtp = useCallback(async () => {
    await ready();
    const data = await invoke((success, failure) =>
      window.retryOtp!(MSG91_CHANNEL_SMS, success, failure, reqId.current ?? undefined),
    );
    reqId.current = requestId(data) ?? reqId.current;
  }, []);

  const verifyOtp = useCallback(async (otp: string) => {
    await ready();
    const data = await invoke((success, failure) =>
      window.verifyOtp!(otp, success, failure, reqId.current ?? undefined),
    );
    // ...and the JWT access token on a successful verify — under either name.
    const token = data.token ?? data.message;
    if (!token) throw new Error("That code didn't work. Please try again.");
    return token;
  }, []);

  return { sendOtp, resendOtp, verifyOtp, captchaReady };
}
