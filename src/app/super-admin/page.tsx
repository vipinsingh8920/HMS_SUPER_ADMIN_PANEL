"use client";

import { ArrowUpRight, Ban, Building2, Clock3, FolderCog, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dashboardStats, departmentAdoption, hospitalGrowthData, recentHospitals, recentPlatformActivity, statusDistribution } from "@/mock/super-admin/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { HospitalStatusBadge } from "@/components/hospitals/HospitalStatusBadge";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

const iconMap = {
  Building2,
  Ban,
  ShieldCheck,
  Clock3,
  TrendingUp,
  FolderCog,
};

export default function SuperAdminDashboardPage() {
  const handleExportSummary = () => {
    const rows = [
      ["Metric", "Value", "Change", "Description"],
      ...dashboardStats.map((stat) => [stat.title, stat.value, stat.change, stat.description]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hms-platform-summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Platform overview</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#18343d]">HMS Platform Dashboard</h1>
          </div>
          <button type="button" onClick={handleExportSummary} className="inline-flex items-center gap-2 self-start rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
            <ArrowUpRight className="h-4 w-4" />
            Export summary
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardStats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Building2;
            return <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} description={stat.description} icon={<Icon className="h-5 w-5" />} href={stat.title === "Total Hospitals" ? "/super-admin/hospitals" : undefined} />;
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Hospital Growth" subtitle="New hospitals over the last 9 months">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hospitalGrowthData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#176c73" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#176c73" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#176c73" fill="url(#colorGrowth)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Hospital Status Distribution" subtitle="Current platform status mix">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusDistribution} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={70} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#176c73" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <ChartCard title="Department Adoption" subtitle="Hospitals enabled per platform department">
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentAdoption}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={60} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="hospitals" fill="#25a7a0" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">Recent Hospital Registrations</h3>
                <Link href="/super-admin/hospitals" className="text-xs font-medium text-emerald-700">View all</Link>
              </div>
              <div className="space-y-3">
                {recentHospitals.map((hospital) => (
                  <div key={hospital.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div>
                      <p className="font-medium text-slate-800">{hospital.name}</p>
                      <p className="text-xs text-slate-500">{hospital.city} • {hospital.registrationDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{hospital.enabledCount} dept</span>
                      <HospitalStatusBadge status={hospital.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <RecentActivity items={recentPlatformActivity} />
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
