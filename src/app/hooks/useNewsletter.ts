"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { ERROR_MESSAGES } from "@/utils/constants/error/messages";
import { apiClient, isApiErrorBody } from "@/utils/api/apiClient";
import type { NewsletterArticle } from "@/types/newsletter";

export type { NewsletterArticle };

export type NewslettersQueryParams = {
  page?: number;
  limit?: number;
  category?: string | null;
};

export type NewslettersListSuccess = {
  success: true;
  articles: NewsletterArticle[];
  count: number;
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export type NewsletterFetchFailure = {
  success: false;
  status: number;
  code: string;
  message: string;
};

export type NewslettersListResult =
  | NewslettersListSuccess
  | NewsletterFetchFailure;

export type NewsletterArticleSuccess = {
  success: true;
  article: NewsletterArticle;
};

export type NewsletterArticleResult =
  | NewsletterArticleSuccess
  | NewsletterFetchFailure;

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

function parseNewsletterArticle(raw: unknown): NewsletterArticle | null {
  if (!isRecord(raw)) return null;
  const pick = (k: string) =>
    typeof raw[k] === "string" ? (raw[k] as string) : "";
  const id = pick("id");
  const slug = pick("slug");
  const title = pick("title");
  if (!id || !slug || !title) return null;
  return {
    id,
    slug,
    title,
    description: pick("description"),
    source: pick("source") || "External",
    category: pick("category"),
    link: pick("link"),
    image_url: pick("image_url"),
    geotag: pick("geotag"),
    country_code: pick("country_code"),
    date: pick("date"),
    created_at: pick("created_at"),
  };
}

function newslettersQueryString(params: NewslettersQueryParams): string {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const sp = new URLSearchParams();
  if (page >= 1) sp.set("page", String(page));
  if (limit >= 1) sp.set("limit", String(Math.min(50, limit)));
  const cat = params.category?.trim();
  if (cat) sp.set("category", cat);
  return sp.toString();
}

function getRequestErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (isApiErrorBody(data)) return data.error.message;
    if (typeof err.message === "string" && err.message) return err.message;
    return fallback;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

/**
 * The utilities backend returns FastAPI-style errors (plain-payload style), not
 * the legacy `{ success:false, error:{ code, message } }` envelope: a domain/HTTP
 * error is `{ detail: string }` and a request-validation error is
 * `{ detail: [{ msg }] }`.
 */
function backendErrorMessage(raw: unknown): string | null {
  if (isApiErrorBody(raw)) return raw.error.message;
  if (!isRecord(raw)) return null;
  const detail = raw.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    for (const d of detail) {
      if (isRecord(d) && typeof d.msg === "string" && d.msg.trim()) {
        return d.msg;
      }
    }
  }
  return null;
}

/** Coarse error code derived from HTTP status (the utilities API sends no code). */
function codeForStatus(status: number): string {
  if (status === 400) return "BAD_REQUEST";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 422) return "VALIDATION_ERROR";
  return "UNKNOWN";
}

/**
 * Fetches a paginated list of newsletter articles (newest first).
 * Optional `category` filters server-side (see `NewslettersQueryParams`).
 * @see GET /newsletters
 */
export async function fetchNewsletters(
  params: NewslettersQueryParams = {},
): Promise<NewslettersListResult> {
  const queryString = newslettersQueryString(params);

  try {
    const res = await apiClient.get(
      `newsletter/${queryString ? `?${queryString}` : ""}`,
    );
    const status = res.status;
    const raw = res.data;
    const data = raw && isRecord(raw) ? raw : null;
    const ok = status >= 200 && status < 300;

    if (ok && data && Array.isArray(data.data)) {
      const articles = data.data
        .map(parseNewsletterArticle)
        .filter((a): a is NewsletterArticle => a !== null);
      return {
        success: true,
        articles,
        count: typeof data.count === "number" ? data.count : articles.length,
        page: typeof data.page === "number" ? data.page : (params.page ?? 1),
        limit:
          typeof data.limit === "number" ? data.limit : (params.limit ?? 10),
        total_items:
          typeof data.total_items === "number" ? data.total_items : 0,
        total_pages:
          typeof data.total_pages === "number" ? data.total_pages : 0,
        has_next: Boolean(data.has_next),
        has_prev: Boolean(data.has_prev),
      };
    }

    return {
      success: false,
      status,
      code: codeForStatus(status),
      message: backendErrorMessage(raw) ?? ERROR_MESSAGES.SERVER_ERROR,
    };
  } catch {
    return {
      success: false,
      status: 0,
      code: "NETWORK_ERROR",
      message: ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}

/**
 * Fetches one newsletter article by UUID or slug.
 * @see GET /newsletters/{identifier}
 */
export async function fetchNewsletterArticle(
  identifier: string,
): Promise<NewsletterArticleResult> {
  const id = identifier.trim();
  if (!id) {
    return {
      success: false,
      status: 400,
      code: "INVALID_IDENTIFIER",
      message: ERROR_MESSAGES.BAD_REQUEST,
    };
  }

  try {
    const res = await apiClient.get(`newsletter/${encodeURIComponent(id)}`);
    const status = res.status;
    const raw = res.data;
    const ok = status >= 200 && status < 300;

    if (ok) {
      const article = parseNewsletterArticle(raw);
      if (article) {
        return { success: true, article };
      }
    }

    return {
      success: false,
      status,
      code: codeForStatus(status),
      message:
        backendErrorMessage(raw) ??
        (status === 404
          ? ERROR_MESSAGES.NOT_FOUND
          : ERROR_MESSAGES.SERVER_ERROR),
    };
  } catch {
    return {
      success: false,
      status: 0,
      code: "NETWORK_ERROR",
      message: ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}

export type NewsletterSubscribeInput = {
  email: string;
  organization?: string;
};

export type NewsletterSubscribeSuccess = {
  success: true;
  message: string;
  reactivated: boolean;
};

export type NewsletterSubscribeFailure = {
  success: false;
  status: number;
  code: string;
  message: string;
};

export type NewsletterSubscribeResult =
  | NewsletterSubscribeSuccess
  | NewsletterSubscribeFailure;

async function postNewsletterSubscribe(
  input: NewsletterSubscribeInput,
): Promise<NewsletterSubscribeResult> {
  const body: { email: string; organization?: string } = {
    email: input.email.trim(),
  };
  const org = input.organization?.trim();
  if (org) body.organization = org;

  try {
    const res = await apiClient.post("newsletter/subscribe", body);
    const status = res.status;
    const raw = res.data;
    const data =
      raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
    const ok = status >= 200 && status < 300;

    if (ok && data) {
      const msg =
        typeof data.message === "string" ? data.message : "Subscribed.";
      const reactivated = data.reactivated === true;
      return { success: true, message: msg, reactivated };
    }

    return {
      success: false,
      status,
      code: codeForStatus(status),
      message:
        backendErrorMessage(raw) ?? ERROR_MESSAGES.NEWSLETTER_SUBSCRIBE_FAILED,
    };
  } catch {
    return {
      success: false,
      status: 0,
      code: "NETWORK_ERROR",
      message: ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}

export type NewsletterUnsubscribeSuccess = {
  success: true;
  message: string;
};

export type NewsletterUnsubscribeFailure = {
  success: false;
  status: number;
  code: string;
  message: string;
};

export type NewsletterUnsubscribeResult =
  | NewsletterUnsubscribeSuccess
  | NewsletterUnsubscribeFailure;

async function postNewsletterUnsubscribe(input: {
  email: string;
  token: string;
  reason: string;
}): Promise<NewsletterUnsubscribeResult> {
  try {
    const res = await apiClient.post("newsletter/unsubscribe", {
      email: input.email.trim(),
      token: input.token.trim(),
      reason: input.reason.trim(),
    });
    const status = res.status;
    const raw = res.data;
    const data =
      raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
    const ok = status >= 200 && status < 300;

    if (ok && data) {
      const msg =
        typeof data.message === "string"
          ? data.message
          : "Successfully unsubscribed from the newsletter.";
      return { success: true, message: msg };
    }

    return {
      success: false,
      status,
      code: codeForStatus(status),
      message:
        backendErrorMessage(raw) ?? ERROR_MESSAGES.NEWSLETTER_UNSUBSCRIBE_FAILED,
    };
  } catch {
    return {
      success: false,
      status: 0,
      code: "NETWORK_ERROR",
      message: ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}

export const NEWSLETTER_UNSUBSCRIBE_TOKEN_PARAM = "token";
export const NEWSLETTER_UNSUBSCRIBE_EMAIL_PARAM = "email";

export type NewsletterUnsubscribeInput = {
  email: string;
  reason: string;
  token?: string;
};

/**
 * Newsletter API: `fetchAll` / `fetchUsingIdentifier` (GET), subscribe/unsubscribe (POST), shared loading/error for GETs.
 */
export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleRequest = useCallback(
    async <T>(
      requestFn: () => Promise<T>,
      errorMessage: string,
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await requestFn();
        return response;
      } catch (err: unknown) {
        const msg = getRequestErrorMessage(err, errorMessage);
        setError(msg);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /** GET /newsletters — paginated list (newest first). */
  const getNewsletters = useCallback(
    async (
      filters: NewslettersQueryParams = {},
    ): Promise<NewslettersListSuccess | null> => {
      return handleRequest(async () => {
        const result = await fetchNewsletters(filters);
        if (!result.success) throw new Error(result.message);
        return result;
      }, ERROR_MESSAGES.SERVER_ERROR);
    },
    [handleRequest],
  );

  /** GET /newsletters/{identifier} — UUID or slug. */
  const getNewsletterArticle = useCallback(
    async (identifier: string): Promise<NewsletterArticle | null> => {
      const id = identifier.trim();
      if (!id) {
        setError(ERROR_MESSAGES.BAD_REQUEST);
        return null;
      }
      return handleRequest(async () => {
        const result = await fetchNewsletterArticle(id);
        if (!result.success) throw new Error(result.message);
        return result.article;
      }, ERROR_MESSAGES.NOT_FOUND);
    },
    [handleRequest],
  );

  const subscribe = useCallback(
    (input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> =>
      postNewsletterSubscribe(input),
    [],
  );

  const unsubscribe = useCallback(
    (input: {
      email: string;
      token: string;
      reason: string;
    }): Promise<NewsletterUnsubscribeResult> =>
      postNewsletterUnsubscribe(input),
    [],
  );

  return {
    getNewsletters,
    getNewsletterArticle,
    subscribe,
    unsubscribe,
    isLoading,
    error,
    clearError,
  };
};

/**
 * Subscribe + unsubscribe flows (URL query for unsubscribe links).
 */

export function useNewsletterSubscription() {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const token = useMemo(() => {
    const t = searchParams.get(NEWSLETTER_UNSUBSCRIBE_TOKEN_PARAM);
    return t?.trim() || null;
  }, [searchParams]);

  const email = useMemo(() => {
    const e = searchParams.get(NEWSLETTER_UNSUBSCRIBE_EMAIL_PARAM);
    return e?.trim() || null;
  }, [searchParams]);

  const subscribe = useCallback(
    async (
      input: NewsletterSubscribeInput,
    ): Promise<NewsletterSubscribeResult> => {
      setIsLoading(true);
      try {
        return await postNewsletterSubscribe(input);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const unsubscribe = useCallback(
    async (
      input: NewsletterUnsubscribeInput,
    ): Promise<NewsletterUnsubscribeResult> => {
      const resolvedToken = input.token?.trim() || token;
      if (!resolvedToken) {
        return {
          success: false,
          status: 400,
          code: "MISSING_TOKEN",
          message: ERROR_MESSAGES.NEWSLETTER_UNSUBSCRIBE_INVALID_LINK,
        };
      }

      const resolvedEmail = input.email.trim() || email?.trim() || "";
      if (!resolvedEmail) {
        return {
          success: false,
          status: 400,
          code: "MISSING_EMAIL",
          message: ERROR_MESSAGES.NEWSLETTER_EMAIL_REQUIRED,
        };
      }

      setIsLoading(true);
      try {
        return await postNewsletterUnsubscribe({
          email: resolvedEmail,
          token: resolvedToken,
          reason: input.reason,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [token, email],
  );

  return { subscribe, unsubscribe, token, email, isLoading };
}
