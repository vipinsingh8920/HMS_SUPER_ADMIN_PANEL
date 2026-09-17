// api/services/auth.service.ts
import { apiClient } from "@/api/client";
import type { ForgotPasswordResponse, LoginRequest, LoginResponse } from "@/types/auth";
import { ENDPOINTS } from "../endpoints";

export const authService = {
    login: (payload: LoginRequest) =>
        apiClient<LoginResponse>(ENDPOINTS.AUTH.LOGIN, { method: "POST", data: payload }),
    forgotPassword: (email: string) => apiClient<ForgotPasswordResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { method: "POST", data: { email } }),

    me: () => apiClient<LoginResponse["data"]["admin"]>(ENDPOINTS.AUTH.ME, { method: "GET" }),

    logout: () => apiClient<void>(ENDPOINTS.AUTH.LOGOUT, { method: "POST" }),
};