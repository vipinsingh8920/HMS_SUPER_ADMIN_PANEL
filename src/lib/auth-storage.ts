import type { SuperAdmin } from "@/types/auth";

const ACCESS_TOKEN_KEY = "hms_access_token";
const USER_KEY = "hms_super_admin";

export function saveAuthSession(
  accessToken: string,
  admin: SuperAdmin,
): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(admin));
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getCurrentUser(): SuperAdmin | null {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as SuperAdmin;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}