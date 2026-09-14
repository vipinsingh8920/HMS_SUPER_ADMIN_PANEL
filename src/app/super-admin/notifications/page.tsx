"use client";

import { useState } from "react";
import { Bell, CheckCheck, Filter } from "lucide-react";
import { superAdminNotifications } from "@/mock/super-admin/notifications";
import { NotificationList } from "@/components/notifications/NotificationList";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function NotificationsPage() {
  const [items, setItems] = useState(superAdminNotifications);

  const unreadCount = items.filter((item) => !item.read).length;

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform communications</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Notifications</h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button onClick={markAllRead} type="button" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{items.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Unread</p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{unreadCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Latest</p>
            <div className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900"><Bell className="h-4 w-4 text-emerald-700" /> 2 mins ago</div>
          </div>
        </div>

        <NotificationList items={items} />
      </div>
    </SuperAdminShell>
  );
}
