"use client";

import { useCallback, useEffect } from "react";
import {
  RECAPTCHA_SCRIPT_URL,
  RECAPTCHA_SITE_KEY,
} from "@/utils/constants/recaptcha";

/**
 * Google reCAPTCHA v3 (invisible, score-based).
 */

let scriptPromise: Promise<void> | null = null;

function loadRecaptcha(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = RECAPTCHA_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function useRecaptcha() {
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    void loadRecaptcha().catch(() => {
    });
  }, []);

  const execute = useCallback(
    async (action: string): Promise<string | null> => {
      if (!RECAPTCHA_SITE_KEY) return null;
      try {
        await loadRecaptcha();
        const grecaptcha = window.grecaptcha;
        if (!grecaptcha) return null;
        // grecaptcha.execute is only safe once ready() has fired.
        await new Promise<void>((resolve) => grecaptcha.ready(resolve));
        return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      } catch {
        return null;
      }
    },
    [],
  );

  return { execute };
}
