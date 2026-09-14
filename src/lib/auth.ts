export type AuthUser = {
  name: string;
  email: string;
  role: "OWNER" | "SUPER_ADMIN";
};

type StoredAccount = AuthUser & {
  password: string;
};

const accountStorageKey = "appziora-hms-owner-account";
const sessionStorageKey = "appziora-hms-auth-session";

export const demoAccount: StoredAccount = {
  name: "Aarav Mehta",
  email: "owner@appziora.health",
  password: "AppzioraOwner2026!",
  role: "OWNER",
};

function readAccount(): StoredAccount {
  if (typeof window === "undefined") return demoAccount;

  const storedAccount = window.localStorage.getItem(accountStorageKey);
  if (!storedAccount) {
    window.localStorage.setItem(accountStorageKey, JSON.stringify(demoAccount));
    return demoAccount;
  }

  try {
    return JSON.parse(storedAccount) as StoredAccount;
  } catch {
    window.localStorage.setItem(accountStorageKey, JSON.stringify(demoAccount));
    return demoAccount;
  }
}

export function authenticate(email: string, password: string): AuthUser | null {
  const account = readAccount();
  const normalizedEmail = email.trim().toLowerCase();
  const matchesAccount = account.email.toLowerCase() === normalizedEmail && account.password === password;
  const matchesDemoAccount = demoAccount.email.toLowerCase() === normalizedEmail && demoAccount.password === password;
  if (!matchesAccount && !matchesDemoAccount) return null;

  const authenticatedAccount = matchesDemoAccount ? demoAccount : account;
  const user = { name: authenticatedAccount.name, email: authenticatedAccount.email, role: authenticatedAccount.role };
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(user));
  return user;
}

export function registerOwner(name: string, email: string, password: string): AuthUser {
  const account: StoredAccount = { name: name.trim(), email: email.trim(), password, role: "OWNER" };
  const user = { name: account.name, email: account.email, role: account.role };
  window.localStorage.setItem(accountStorageKey, JSON.stringify(account));
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(user));
  return user;
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const session = window.localStorage.getItem(sessionStorageKey);
  if (!session) return null;

  try {
    return JSON.parse(session) as AuthUser;
  } catch {
    window.localStorage.removeItem(sessionStorageKey);
    return null;
  }
}

export function signOut() {
  window.localStorage.removeItem(sessionStorageKey);
}

export function getAuthRedirectPath(defaultPath = "/super-admin") {
  if (typeof window === "undefined") return defaultPath;

  const requestedPath = new URLSearchParams(window.location.search).get("next");
  if (!requestedPath || !requestedPath.startsWith("/") || requestedPath.startsWith("//")) return defaultPath;
  if (requestedPath === "/login" || requestedPath.startsWith("/login?") || requestedPath === "/register" || requestedPath.startsWith("/register?")) return defaultPath;

  return requestedPath;
}
