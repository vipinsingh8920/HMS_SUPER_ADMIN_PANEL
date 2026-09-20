"use client";

import { createContext, startTransition, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  X,
} from "lucide-react";
import { superAdminNavItems } from "@/lib/navigation";
import { getSession } from "@/lib/auth";
import { superAdmin } from "@/mock/super-admin/admin";
import { superAdminNotifications } from "@/mock/super-admin/notifications";
import { useAuth } from "@/hooks/auth/useAuth";
import type { AuthUser } from "@/lib/auth";

const ShellContext = createContext(false);

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const shellAlreadyMounted = useContext(ShellContext);

  if (shellAlreadyMounted) {
    return <>{children}</>;
  }

  return (
    <ShellContext.Provider value>
      <SuperAdminShellContent>{children}</SuperAdminShellContent>
    </ShellContext.Provider>
  );
}

function SuperAdminShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser>({
    name: superAdmin.name,
    email: superAdmin.email,
    role: "SUPER_ADMIN",
  });
  const unreadCount = superAdminNotifications.filter((item) => !item.read).length;
  const { logout, isLoggingOut } = useAuth();

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    startTransition(() => setCurrentUser(currentSession));
  }, [pathname, router]);

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="super-admin-shell min-h-screen bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] text-[#18343d]">
      <div className="flex min-h-screen min-w-0">
        <aside
          className={[
            "hidden border-r border-[#315463] bg-[#123f47] text-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-all duration-300 lg:flex lg:flex-col",
            collapsed ? "w-24" : "w-72",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#25a7a0] text-sm font-black text-white shadow-sm">
                V
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">Appziora HMS</p>
                  <p className="truncate text-[10px] font-bold tracking-[0.14em] text-[#80a8b1]">HOSPITAL OS</p>
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => setCollapsed((value) => !value)}
              className="rounded-lg border border-[#315463] bg-[#1d4657] p-1.5 text-[#a8c4ca] transition hover:bg-[#1c4b5b] hover:text-white"
            >
              <ArrowRight className={collapsed ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {superAdminNavItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/super-admin" && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={[
                    "group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "border-transparent bg-[#176a70] text-white shadow-[inset_3px_0_#5ee0c7]"
                      : "border-transparent text-[#a8c8cd] hover:bg-[#1c4b5b] hover:text-white",
                    collapsed ? "justify-center px-2" : "",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-3 rounded-none border-t border-[#315463] px-2 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9eee4] text-xs font-black text-[#196366]">
                {currentUser.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{currentUser.name}</p>
                  <p className="truncate text-[11px] text-[#88adb5]">{currentUser.role === "OWNER" ? "Platform Owner" : "Platform Administrator"}</p>
                </div>
              )}
              {!collapsed && <ChevronDown className="h-4 w-4 text-slate-300" />}
            </div>
          </div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
        )}

        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 border-r border-[#315463] bg-[#123f47] text-slate-100 shadow-2xl transition-transform duration-300 lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#25a7a0] text-sm font-black text-white">A</div>
              <div>
                <p className="text-sm font-semibold text-white">Appziora HMS</p>
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#80a8b1]">HOSPITAL OS</p>
              </div>
            </div>
            <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="rounded-md p-1.5 text-slate-300">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-1 p-3">
            {superAdminNavItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/super-admin" && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium",
                    active ? "bg-[#176a70] text-white" : "text-[#a8c8cd] hover:bg-[#1c4b5b]",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-[#dfeae8] bg-white/90 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Open navigation"
                  onClick={() => setMobileOpen(true)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfeae8] bg-white text-[#18343d] shadow-sm lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="hidden items-center gap-2 rounded-lg border border-[#dfeae8] bg-white px-2 py-1 text-xs text-[#71878d] shadow-sm md:flex">
                  <Sparkles className="h-3.5 w-3.5 text-[#176c73]" />
                  Platform overview
                </div>
              </div>

              <div className="hidden flex-1 items-center justify-center md:flex">
                <div className="flex w-full max-w-xl items-center gap-2 rounded-[7px] border border-[#e8eff1] bg-[#f5f8f9] px-3 py-2 text-sm text-[#9aabb1] shadow-none">
                  <Search className="h-4 w-4 text-[#9aabb1]" />
                  <input
                    aria-label="Global search"
                    placeholder="Search hospitals, departments, notifications"
                    className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dfeae8] bg-white text-[#70868f] shadow-none">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ec6e68] px-1 text-[10px] font-semibold text-white shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <div className="relative hidden items-center gap-3 md:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7ebe8] text-xs font-black text-[#237273]">
                    {currentUser.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-semibold text-[#18343d]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#71878d]">{currentUser.role === "OWNER" ? "Platform Owner" : superAdmin.role}</p>
                  </div>
                  <button type="button" aria-label="Open profile menu" aria-expanded={profileMenuOpen} onClick={() => setProfileMenuOpen((value) => !value)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f7f6] text-[#71878d] hover:bg-[#e6eff5]">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 top-12 z-50 w-56 rounded-[10px] border border-[#dfeae8] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                      <div className="border-b border-[#eef3f2] px-3 py-2">
                        <p className="text-sm font-semibold text-[#18343d]">{currentUser.name}</p>
                        <p className="mt-1 text-xs text-[#71878d]">{currentUser.email}</p>
                      </div>
                      <Link href="/super-admin/profile" onClick={() => setProfileMenuOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#536b75] hover:bg-[#f3f7f6]">
                        <UserCircle2 className="h-4 w-4" />
                        My profile
                      </Link>
                      <Link href="/super-admin/settings" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#536b75] hover:bg-[#f3f7f6]">
                        <ShieldCheck className="h-4 w-4" />
                        Settings
                      </Link>
                      <button type="button" onClick={handleSignOut} disabled={isLoggingOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#c96968] hover:bg-[#fff4f2] disabled:cursor-not-allowed disabled:opacity-60">
                        {isLoggingOut ? "Signing out..." : "Sign out"}
                      </button>
                    </div>
                  )}
                </div>

                <Link href="/super-admin/profile" className="inline-flex items-center gap-2 rounded-lg border border-[#dfeae8] bg-white px-3 py-2 text-sm font-medium text-[#536b75] shadow-none md:hidden">
                  <UserCircle2 className="h-4 w-4" />
                  Profile
                </Link>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
