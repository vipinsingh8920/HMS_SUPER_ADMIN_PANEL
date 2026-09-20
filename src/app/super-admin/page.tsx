"use client";

import {
  ArrowUpRight,
  Ban,
  Building2,
  Clock3,
  FolderCog,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import Link from "next/link";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { HospitalStatusBadge } from "@/components/hospitals/HospitalStatusBadge";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

import { useDashboard } from "@/hooks/main/useDashboard";
import { AppzioraLoader } from "@/components/layout/AppzioraLoader";

const iconMap = {
  Building2,
  Ban,
  ShieldCheck,
  Clock3,
  TrendingUp,
  FolderCog,
};

export default function SuperAdminDashboardPage() {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useDashboard();

  console.log('heyyyy',data)

  if (isLoading) {
    return <AppzioraLoader fullScreen={false} />;
  }

  if (error) {
    return (
      <SuperAdminShell>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
          <p className="text-sm text-red-600">
            Failed to load dashboard.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-[#176c73] px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </SuperAdminShell>
    );
  }

  if (!data) {
    return (
      <SuperAdminShell>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">
            No dashboard data available.
          </p>
        </div>
      </SuperAdminShell>
    );
  }

  return (
    <SuperAdminShell>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">
              Platform overview
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#18343d]">
              HMS Platform Dashboard
            </h1>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"
          >
            <ArrowUpRight className="h-4 w-4" />
            Export summary
          </button>
        </div>

        {/* Updating indicator */}

        {isFetching && (
          <div className="text-xs text-slate-400">
            Updating dashboard...
          </div>
        )}

        {/* Stats */}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.dashboardStats?.map((stat) => {
            const Icon =
              iconMap[
              stat.icon as keyof typeof iconMap
              ] ?? Building2;

            return (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={""}
                description={stat.description}
                icon={<Icon className="h-5 w-5" />}
                href={stat.href}
              />
            );
          })}
        </div>

        {/* Charts */}

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

          <ChartCard
            title="Hospital Growth"
            subtitle="New hospitals over the selected period"
          >
            <div className="h-72">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={data.hospital_growth}>
                  <defs>
                    <linearGradient
                      id="colorGrowth"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#176c73"
                        stopOpacity={0.3}
                      />

                      <stop
                        offset="95%"
                        stopColor="#176c73"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#176c73"
                    fill="url(#colorGrowth)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Hospital Status Distribution"
            subtitle="Current platform status mix"
          >
            <div className="h-72">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={data.hospital_status_distribution}
                  layout="vertical"
                  margin={{ left: 10 }}
                >
                  <CartesianGrid
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    dataKey="status"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={70}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[0, 6, 6, 0]}
                    fill="#176c73"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Recent hospitals */}

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Recent Hospital Registrations
              </h3>

              <Link
                href="/super-admin/hospitals"
                className="text-xs font-medium text-emerald-700"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">

              {data?.recent_hospital_registrations?.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-500">
                  No recent hospital registrations.
                </p>
              ) : (
                data?.recent_hospital_registrations?.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {hospital.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {hospital.city} •{" "}
                        {new Date(
                          hospital.created_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <HospitalStatusBadge
                        status={hospital.is_active ? "ACTIVE" : "INACTIVE"}
                      />
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          <RecentActivity
            items={data.recent_platform_activities}
          />
        </div>

      </div>
    </SuperAdminShell>
  );
}