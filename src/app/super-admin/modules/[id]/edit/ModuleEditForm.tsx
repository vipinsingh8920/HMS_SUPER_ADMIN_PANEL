"use client";

import Link from "next/link";
import { CheckCircle2, Save } from "lucide-react";
import { useState } from "react";
import type { HMSModule } from "@/types/super-admin";

export function ModuleEditForm({ module }: { module: HMSModule }) {
  const [saved, setSaved] = useState(false);

  return (
    <>
      {saved && <div className="flex items-center gap-2 rounded-[10px] border border-[#bde8df] bg-[#e7f6f0] p-4 text-sm font-bold text-[#23876d]"><CheckCircle2 className="h-4 w-4" /> Module changes saved in this static preview.</div>}
      <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-bold text-[#536b75]">Module Name<input defaultValue={module.name} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label>
          <label className="space-y-2 text-sm font-bold text-[#536b75]">Module Code<input defaultValue={module.code} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 font-mono text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label>
          <label className="space-y-2 text-sm font-bold text-[#536b75]">Category<select defaultValue={module.category} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white"><option>Core</option><option>Scheduling</option><option>Critical Care</option><option>Diagnostics</option><option>Clinical Ops</option><option>Finance</option><option>Operations</option><option>Insights</option><option>Surgical</option><option>Transfusion</option></select></label>
          <label className="space-y-2 text-sm font-bold text-[#536b75]">Status<select defaultValue={module.status} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white"><option>ACTIVE</option><option>DISABLED</option></select></label>
          <label className="space-y-2 text-sm font-bold text-[#536b75] md:col-span-2">Description<textarea defaultValue={module.description} rows={5} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#eef3f2] pt-5"><Link href={`/super-admin/modules/${module.id}`} className="rounded-[7px] border border-[#dfeae8] bg-white px-4 py-2.5 text-sm font-bold text-[#536b75]">Cancel</Link><button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Save className="h-4 w-4" /> Save changes</button></div>
      </form>
    </>
  );
}
