import { ShieldCheck, LockKeyhole, LogOut, Mail, UserRound } from "lucide-react";
import { superAdmin } from "@/mock/super-admin/admin";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function ProfilePage() {
  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Account</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Super Admin Profile</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-bold text-white">{superAdmin.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{superAdmin.name}</h2>
                <p className="text-sm text-slate-500">{superAdmin.role}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"><ShieldCheck className="h-3.5 w-3.5" /> Active</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">Edit Profile</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">Change Password</button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white"><LogOut className="h-4 w-4" /> Logout</button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Account Details</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><span className="inline-flex items-center gap-2 text-slate-500"><Mail className="h-4 w-4" /> Email</span><span className="font-medium text-slate-800">{superAdmin.email}</span></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><span className="inline-flex items-center gap-2 text-slate-500"><UserRound className="h-4 w-4" /> Role</span><span className="font-medium text-slate-800">{superAdmin.role}</span></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><span className="inline-flex items-center gap-2 text-slate-500"><LockKeyhole className="h-4 w-4" /> Last Login</span><span className="font-medium text-slate-800">{superAdmin.lastLogin}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Security Overview</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">Two-factor authentication enabled</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">Password last rotated 34 days ago</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">Session management active across 3 trusted devices</div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
