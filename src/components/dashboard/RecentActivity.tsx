import Link from "next/link";
import { BadgeCheck, Clock3 } from "lucide-react";
import type { PlatformActivity } from "@/types/super-admin";

export function RecentActivity({ items }: { items: PlatformActivity[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Recent Platform Activity</h3>
        <Link href="/super-admin/activity" className="text-xs font-medium text-emerald-700 hover:text-emerald-800">
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-800">{item.action}</p>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                  {item.status}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <span>{item.entityId}</span>
                <span>•</span>
                <span>{item.performedBy}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                <Clock3 className="h-3 w-3" />
                {item.dateTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
