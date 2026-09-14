"use client";

import { Activity, BellRing, Building2, ShieldCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { platformHealth } from "@/mock/super-admin/platform-health";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

const platformUptime = [
  { label: "Jan", value: 98 },
  { label: "Feb", value: 97.4 },
  { label: "Mar", value: 98.6 },
  { label: "Apr", value: 99.1 },
  { label: "May", value: 98.9 },
  { label: "Jun", value: 99.4 },
  { label: "Jul", value: 99.2 },
  { label: "Aug", value: 99.3 },
  { label: "Sep", value: 99.6 },
];

const healthMix = [
  { name: "Operational", value: platformHealth.filter((item) => item.platformStatus === "OPERATIONAL").length },
  { name: "Degraded", value: platformHealth.filter((item) => item.platformStatus === "DEGRADED").length },
  { name: "Maintenance", value: platformHealth.filter((item) => item.platformStatus === "MAINTENANCE").length },
];

export default function AnalyticsPage() {
  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Platform analytics</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Insights & Health</h1>
          <p className="mt-2 max-w-xl text-sm text-[#71878d]">Monitor hospital adoption, platform uptime, and live operational health across the network.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6eff5] text-[#3978a5]"><Building2 className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Hospitals</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{initialHospitals.length}</p></div></div></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dcefe9] text-[#176c73]"><ShieldCheck className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Operational</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{platformHealth.filter((item) => item.platformStatus === "OPERATIONAL").length}</p></div></div></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff1d8] text-[#b47629]"><BellRing className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Alerts</p><p className="mt-1 text-2xl font-bold text-[#18343d]">{platformHealth.filter((item) => item.platformStatus !== "OPERATIONAL").length}</p></div></div></div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[14px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
            <h2 className="text-lg font-bold text-[#18343d]">Platform uptime</h2>
            <p className="mt-1 text-sm text-[#71878d]">Last 9 month availability</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformUptime}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis domain={[96, 100]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#176c73" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[14px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
            <h2 className="text-lg font-bold text-[#18343d]">Hospital health mix</h2>
            <p className="mt-1 text-sm text-[#71878d]">Current monitored sample</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthMix} layout="vertical" margin={{ left: 12 }}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={90} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#25a7a0" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#176c73]" /><h2 className="text-lg font-bold text-[#18343d]">Hospital health feed</h2></div>
          <div className="space-y-3">
            {platformHealth.map((entry) => (
              <div key={entry.hospitalId} className="flex flex-col gap-2 rounded-xl border border-[#eaf1f2] bg-[#f8fbfa] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#18343d]">{entry.hospitalName}</p>
                  <p className="text-xs text-[#8ca0a6]">Last activity: {entry.lastActivity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', entry.platformStatus === 'OPERATIONAL' ? 'bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]' : entry.platformStatus === 'DEGRADED' ? 'bg-[#fff1d8] text-[#b47629] ring-1 ring-[#f0d39f]' : 'bg-[#fce9e8] text-[#c96968] ring-1 ring-[#e8c2bd]'].join(' ')}>{entry.platformStatus}</span>
                  <span className="text-xs text-[#8ca0a6]">Last login {entry.lastLogin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
