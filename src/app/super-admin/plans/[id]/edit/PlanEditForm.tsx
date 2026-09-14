"use client";

import Link from "next/link";
import { CheckCircle2, Save } from "lucide-react";
import { useState } from "react";
import type { SubscriptionPlan } from "@/types/super-admin";

const availableModules = ["OPD", "Appointments", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Billing", "Inventory", "Reports", "Insurance / TPA", "OT", "Blood Bank", "Advanced Reports"];

export function PlanEditForm({ plan }: { plan: SubscriptionPlan }) {
  const [selectedModules, setSelectedModules] = useState(plan.enabledModules);
  const [saved, setSaved] = useState(false);

  const toggleModule = (module: string) => {
    setSelectedModules((current) => current.includes(module) ? current.filter((item) => item !== module) : [...current, module]);
  };

  return (
    <>
      {saved && <div className="flex items-center gap-2 rounded-[10px] border border-[#bde8df] bg-[#e7f6f0] p-4 text-sm font-bold text-[#23876d]"><CheckCircle2 className="h-4 w-4" /> Plan changes saved in this static preview.</div>}
      <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-bold text-[#536b75]">Plan Name<input defaultValue={plan.name} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label><label className="space-y-2 text-sm font-bold text-[#536b75]">Monthly Price<input defaultValue={plan.monthlyPrice} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label><label className="space-y-2 text-sm font-bold text-[#536b75] md:col-span-2">Description<textarea defaultValue={plan.description} rows={3} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label></div>
        <fieldset className="mt-6 border-t border-[#eef3f2] pt-5"><legend className="text-sm font-bold text-[#536b75]">Included modules</legend><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{availableModules.map((module) => <label key={module} className="flex items-center gap-3 rounded-lg border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-sm text-[#536b75]"><input type="checkbox" checked={selectedModules.includes(module)} onChange={() => toggleModule(module)} className="h-4 w-4 accent-[#176c73]" />{module}</label>)}</div></fieldset>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#eef3f2] pt-5"><Link href={`/super-admin/plans/${plan.id}`} className="rounded-[7px] border border-[#dfeae8] bg-white px-4 py-2.5 text-sm font-bold text-[#536b75]">Cancel</Link><button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Save className="h-4 w-4" /> Save changes</button></div>
      </form>
    </>
  );
}
