"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Save } from "lucide-react";
import { use, useState } from "react";
import { platformDepartments } from "@/mock/super-admin/departments";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const department = platformDepartments.find((item) => item.id === id);
  if (!department) notFound();
  const [saved, setSaved] = useState(false);

  return (
    <SuperAdminShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href={`/super-admin/departments/${department.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to department</Link>
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Platform catalog</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Edit {department.name}</h1><p className="mt-2 text-sm text-[#71878d]">Update the shared department definition used by platform hospitals.</p></div>
        {saved && <div className="flex items-center gap-2 rounded-[10px] border border-[#bde8df] bg-[#e7f6f0] p-4 text-sm font-bold text-[#23876d]"><CheckCircle2 className="h-4 w-4" /> Department changes saved in this static preview.</div>}
        <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-bold text-[#536b75]">Department Name<input defaultValue={department.name} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label><label className="space-y-2 text-sm font-bold text-[#536b75]">Department Code<input defaultValue={department.code} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 font-mono text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label><label className="space-y-2 text-sm font-bold text-[#536b75]">Category<select defaultValue={department.category} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white"><option>Primary Care</option><option>Specialty</option><option>Diagnostics</option><option>Mental Health</option><option>Critical Care</option><option>Rehabilitation</option><option>Women Health</option></select></label><label className="space-y-2 text-sm font-bold text-[#536b75]">Status<select defaultValue={department.status} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white"><option>ACTIVE</option><option>DISABLED</option></select></label><label className="space-y-2 text-sm font-bold text-[#536b75] md:col-span-2">Description<textarea defaultValue={department.description} rows={5} className="w-full rounded-[7px] border border-[#dfeae8] bg-[#f8fbfa] px-3 py-2.5 text-[#18343d] outline-none focus:border-[#176c73] focus:bg-white" /></label></div><div className="mt-6 flex justify-end gap-3 border-t border-[#eef3f2] pt-5"><Link href={`/super-admin/departments/${department.id}`} className="rounded-[7px] border border-[#dfeae8] bg-white px-4 py-2.5 text-sm font-bold text-[#536b75] hover:bg-[#f3f7f6]">Cancel</Link><button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Save className="h-4 w-4" /> Save changes</button></div></form>
      </div>
    </SuperAdminShell>
  );
}
