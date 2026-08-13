import { API_ENDPOINTS } from "@/utils/constants/apiEndpoints";
import { ERROR_MESSAGES } from "@/utils/constants/error/messages";
import { AXIOS_ERROR_CODES, ERROR_TYPES } from "@/utils/constants/statusCodes";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export function getApiBase(): string {
  return API_ENDPOINTS.utilitiesApiBaseUrl.replace(/\/$/, "");
}

export type ApiErrorBody = {
  success: false;
  error: { code: string; message: string };
};

export function isApiErrorBody(v: unknown): v is ApiErrorBody {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (o.success !== false) return false;
  const err = o.error;
  if (!err || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;
  return typeof e.code === "string" && typeof e.message === "string";
}

type AugmentedAxiosError = AxiosError & {
  errorType?: string;
  statusCode?: number;
  serverMessage?: string;
};

function augmentError(error: AxiosError): AugmentedAxiosError {
  return error as AugmentedAxiosError;
}

async function isServerLikelyDown(error: AxiosError): Promise<boolean> {
  if (error.response) return false;
  if (!error.request) return false;
  if (typeof navigator !== "undefined" && !navigator.onLine) return false;
  return (
    error.code === AXIOS_ERROR_CODES.NETWORK_ERROR ||
    error.code === AXIOS_ERROR_CODES.CONNECTION_REFUSED
  );
}

const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBase(),
  timeout: 10_000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: () => true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const err = augmentError(error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as unknown;
      err.errorType = ERROR_TYPES.BACKEND_ERROR;
      err.statusCode = status;
      if (isApiErrorBody(data)) {
        err.serverMessage = data.error.message;
      } else if (
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
      ) {
        err.serverMessage = (data as { message: string }).message;
      } else {
        err.serverMessage = "Server error occurred";
      }
    } else if (error.request) {
      const down = await isServerLikelyDown(error);
      if (down) {
        err.errorType = ERROR_TYPES.SERVER_DOWN;
        err.message = ERROR_MESSAGES.SERVER_DOWN;
      } else if (error.code === AXIOS_ERROR_CODES.NOT_FOUND) {
        err.errorType = ERROR_TYPES.DNS_ERROR;
        err.message = ERROR_MESSAGES.DNS_ERROR;
      } else if (error.code === AXIOS_ERROR_CODES.TIMEOUT) {
        err.errorType = ERROR_TYPES.TIMEOUT_ERROR;
        err.message = ERROR_MESSAGES.TIMEOUT_ERROR;
      } else {
        err.errorType = ERROR_TYPES.NETWORK_ERROR;
        err.message = ERROR_MESSAGES.NETWORK_ERROR;
      }
    } else {
      err.errorType = ERROR_TYPES.UNKNOWN_ERROR;
      err.message = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    return Promise.reject(error);
  },
);

export { apiClient };
export default apiClient;
