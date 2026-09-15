"use client";

import Link from "next/link";
import { ArrowUpRight, Check, CreditCard, Download, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { hospitalSubscriptions, subscriptionPlans } from "@/mock/super-admin/subscriptions";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function PlansPage() {
  const exportPlans = () => {
    const rows = [
      ["Plan", "Price", "Hospitals", "Modules", "Renewal"],
      ...subscriptionPlans.map((plan) => {
        const hospitals = hospitalSubscriptions.filter((item) => item.currentPlan === plan.name).length;
        return [plan.name, plan.monthlyPrice, String(hospitals), plan.enabledModules.join(" | "), plan.description];
      }),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "platform-plans.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Subscription console</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Plans & Billing</h1>
            <p className="mt-2 max-w-xl text-sm text-[#71878d]">Define platform plans, review active subscriptions, and manage hospital entitlements.</p>
          </div>
          <button type="button" onClick={exportPlans} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
            <Download className="h-4 w-4" /> Export plans
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Plans</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{subscriptionPlans.length}</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Active subscriptions</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{hospitalSubscriptions.filter((item) => item.status === "ACTIVE").length}</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Trial accounts</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{hospitalSubscriptions.filter((item) => item.trialStatus === "ACTIVE").length}</p></div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {subscriptionPlans.map((plan) => {
            const hospitals = hospitalSubscriptions.filter((item) => item.currentPlan === plan.name).length;
            const featured = plan.name === "ENTERPRISE";
            return (
              <div key={plan.id} className={['rounded-[14px] border bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]', featured ? 'border-[#176c73] bg-[#f5fbfb]' : 'border-[#dfeae8]'].join(' ')}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={['flex h-11 w-11 items-center justify-center rounded-xl', featured ? 'bg-[#176c73] text-white' : 'bg-[#e8f5f3] text-[#176c73]'].join(' ')}><CreditCard className="h-5 w-5" /></div>
                    <div><h2 className="text-xl font-bold text-[#18343d]">{plan.name}</h2><p className="text-sm text-[#71878d]">{plan.description}</p></div>
                  </div>
                  {featured ? <span className="inline-flex items-center gap-1.5 rounded-[7px] border border-[#9ed8c9] bg-[#e7f6f0] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#176c73] shadow-[0_3px_8px_rgba(23,108,115,0.08)]"><TrendingUp className="h-3.5 w-3.5" /> Most adopted</span> : null}
                </div>

                <div className="mt-5 flex items-end gap-2"><span className="text-3xl font-bold tracking-tight text-[#18343d]">{plan.monthlyPrice}</span><span className="pb-1 text-sm text-[#8ca0a6]">/ month</span></div>

                <div className="mt-5 rounded-[10px] bg-white/60 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Included modules</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {plan.enabledModules.map((module) => (
                      <span key={module} className="rounded-full bg-[#eaf5f2] px-2.5 py-1 text-[10px] font-semibold text-[#176c73] ring-1 ring-[#cfe9e2]">{module}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-[#536b75]">
                  <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#176c73]" /> {hospitals} hospitals</span>
                  <Link href={`/super-admin/plans/${plan.id}/edit`} className="inline-flex items-center gap-1 font-semibold text-[#176c73]">Edit <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-[14px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#18343d]">Hospital subscriptions</h2>
              <p className="text-sm text-[#71878d]">Active billing and trial status across the network.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf5f2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#176c73]"><Sparkles className="h-3.5 w-3.5" /> {initialHospitals.length} hospitals</div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#dfeae8]">
            <table className="min-w-[680px] divide-y divide-[#e7eef0] text-left text-sm">
              <thead className="bg-[#f7faf9] text-[#8ca0a6]">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Hospital</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Plan</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Status</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Renewal</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Modules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f1] bg-white">
                {hospitalSubscriptions.map((item) => {
                  const hospital = initialHospitals.find((entry) => entry.id === item.hospitalId);
                  return (
                    <tr key={item.hospitalId} className="hover:bg-[#f9fbfb]">
                      <td className="px-4 py-3"><div className="font-semibold text-[#18343d]">{hospital?.name ?? item.hospitalId}</div><div className="text-xs text-[#8ca0a6]">{item.hospitalId}</div></td>
                      <td className="px-4 py-3 text-[#536b75]">{item.currentPlan}</td>
                      <td className="px-4 py-3"><span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', item.status === 'ACTIVE' ? 'bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]' : item.status === 'TRIAL' ? 'bg-[#eaf3fb] text-[#3978a5] ring-1 ring-[#c6dce9]' : 'bg-[#fff1d8] text-[#b47629] ring-1 ring-[#f0d39f]'].join(' ')}>{item.status}</span></td>
                      <td className="px-4 py-3 text-[#536b75]">{item.renewalDate}</td>
                      <td className="px-4 py-3 text-[#536b75]">{item.enabledModules.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
