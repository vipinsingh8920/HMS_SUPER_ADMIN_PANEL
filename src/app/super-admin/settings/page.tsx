"use client";

import { startTransition, useEffect, useState } from "react";
import { ShieldCheck, BellRing, Palette, Lock, Moon, Sun } from "lucide-react";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("super-admin-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      startTransition(() => setTheme(savedTheme));
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  const handleThemeChange = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("super-admin-theme", nextTheme);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform controls</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-emerald-700" /><h2 className="text-lg font-semibold text-slate-900">Platform Settings</h2></div>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Auto-approve registration</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Require account verification</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Allow self-serve department activation</span><input type="checkbox" className="h-4 w-4 text-emerald-600" /></label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><BellRing className="h-5 w-5 text-emerald-700" /><h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2></div>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Email alerts for new registrations</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>SMS updates for hospital status changes</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Weekly platform compliance digest</span><input type="checkbox" className="h-4 w-4 text-emerald-600" /></label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><Lock className="h-5 w-5 text-emerald-700" /><h2 className="text-lg font-semibold text-slate-900">Security Preferences</h2></div>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Two-factor authentication required</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Session timeout after inactivity</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Approval needed for platform role changes</span><input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600" /></label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><Palette className="h-5 w-5 text-emerald-700" /><h2 className="text-lg font-semibold text-slate-900">Appearance</h2></div>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span className="inline-flex items-center gap-2">{theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} Default theme</span><select value={theme} onChange={(event) => handleThemeChange(event.target.value as "light" | "dark")} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700"><option value="light">Light</option><option value="dark">Dark</option></select></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Compact density</span><input type="checkbox" className="h-4 w-4 text-emerald-600" /></label>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
