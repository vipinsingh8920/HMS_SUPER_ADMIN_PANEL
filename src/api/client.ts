import axios, { type AxiosRequestConfig } from "axios";
import { clearAuthSession } from "@/lib/auth-storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://hms-node-backend-9mw2.onrender.com";

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  detail?: string;
  code?: string;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("hms_access_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAuthSession();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export async function apiClient<T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({ url: endpoint, ...config });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiErrorResponse | undefined;
      throw new ApiError(
        data?.message ??
        data?.detail ??
        data?.error ??
        error.message ??
        "Something went wrong",
        error.response?.status ?? 500,
        data?.code,
      );
    }
    throw error;
  }
}