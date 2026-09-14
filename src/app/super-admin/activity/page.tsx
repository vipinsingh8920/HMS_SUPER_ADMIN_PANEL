import { Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { platformActivity } from "@/mock/super-admin/activity";
import { ActivityTable } from "@/components/activity/ActivityTable";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function ActivityPage() {
  const successful = platformActivity.filter((item) => item.status === "SUCCESS").length;
  const attention = platformActivity.filter((item) => item.status === "WARNING" || item.status === "ERROR").length;
  const today = platformActivity.filter((item) => item.dateTime.startsWith("2026-09-14")).length;

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Audit trail</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Platform Activity</h1>
          <p className="mt-2 max-w-xl text-sm text-[#71878d]">A transparent operational record of every platform-level action taken by your administration team.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6eff5] text-[#3978a5]"><Activity className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Total events</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{platformActivity.length}</p></div></div>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dcefe9] text-[#176c73]"><CheckCircle2 className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Successful</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{successful}</p></div></div>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff1d8] text-[#b47629]"><ShieldAlert className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Needs attention</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{attention}</p><p className="mt-0.5 text-xs text-[#8ca0a6]">{today} event today</p></div></div>
        </div>

        <ActivityTable items={platformActivity} />
      </div>
    </SuperAdminShell>
  );
}
