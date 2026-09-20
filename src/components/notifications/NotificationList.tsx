import { CheckCheck, Circle, Clock3 } from "lucide-react";
import type { NotificationItem } from "@/types/super-admin";

const notificationDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function NotificationList({ items }: { items: NotificationItem[] }) {
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No notifications yet.
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className={['rounded-2xl border p-4 shadow-sm transition', item.read ? 'border-slate-200 bg-white' : 'border-emerald-200 bg-emerald-50/40'].join(' ')}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className={['mt-1 flex h-8 w-8 items-center justify-center rounded-full', item.read ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'].join(' ')}>
                  <Circle className="h-3 w-3 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 uppercase tracking-wide">{item.category}</span>
                    <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" />{notificationDateFormatter.format(new Date(item.timestamp))}</span>
                  </div>
                </div>
              </div>
              <button type="button" className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700">
                <CheckCheck className="h-3.5 w-3.5" />
                Mark read
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
