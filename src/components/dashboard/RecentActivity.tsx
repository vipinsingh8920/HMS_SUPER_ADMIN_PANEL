import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  FolderPlus,
} from "lucide-react";

import type { PlatformActivity } from "@/types/super-admin";

type RecentActivityProps = {
  items: PlatformActivity[];
};

function getActivityLabel(activity: string) {
  const labels: Record<string, string> = {
    PLATFORM_CREATED: "Department created",
    HOSPITAL_REGISTERED: "Hospital registered",
    HOSPITAL_APPROVED: "Hospital approved",
    HOSPITAL_UPDATED: "Hospital updated",
    HOSPITAL_DEACTIVATED: "Hospital deactivated",
    HOSPITAL_ACTIVATED: "Hospital activated",
  };

  return labels[activity] ?? activity.replaceAll("_", " ");
}

function getActivityIcon(entityType: string) {
  switch (entityType.toLowerCase()) {
    case "hospital":
      return Building2;

    case "department":
      return FolderPlus;

    default:
      return Activity;
  }
}

function formatActivityTime(date: string) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Unknown time";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

export function RecentActivity({
  items,
}: RecentActivityProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Recent Platform Activity
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Latest activity across your HMS platform
          </p>
        </div>

        <Link
          href="/super-admin/activity"
          className="group inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          View all

          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Activity list */}

      <div className="divide-y divide-slate-100">

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Activity className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              No recent activity
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Platform activity will appear here.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const Icon = getActivityIcon(item.entity_type);

            return (
              <div
                key={`${item.entity_type}-${item}-${item.occurred_at}`}
                className="group px-5 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex gap-3">

                  {/* Icon */}

                  <div className="flex-shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">

                    {/* Activity + entity */}

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {getActivityLabel(item.activity)}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.hospital_name}
                        </p>
                      </div>

                      <span className="flex-shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        {item.entity_type}
                      </span>

                    </div>

                    {/* Meta */}

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock3 className="h-3 w-3" />

                      <span>
                        {formatActivityTime(item.occurred_at)}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}