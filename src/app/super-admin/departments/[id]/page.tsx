import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, Pencil, ShieldCheck, TrendingUp } from "lucide-react";
import { platformDepartments } from "@/mock/super-admin/departments";
import { DepartmentStatusBadge } from "@/components/departments/DepartmentStatusBadge";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function DepartmentDetailsPage({ params }: { params: { id: string } }) {
  const department = platformDepartments.find((item) => item.id === params.id);
  if (!department) notFound();

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <Link href="/super-admin/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to departments</Link>
        <div className="overflow-hidden rounded-[12px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="h-2 bg-gradient-to-r from-[#176c73] via-[#25a7a0] to-[#7aafd0]" />
          <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6eff5] text-[#3978a5] ring-1 ring-[#c6dce9]"><Building2 className="h-7 w-7" /></div><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold text-[#18343d]">{department.name}</h1><DepartmentStatusBadge status={department.status} /></div><p className="mt-2 font-mono text-sm font-semibold text-[#8ca0a6]">{department.code} · {department.id}</p></div></div>
            <Link href={`/super-admin/departments/${department.id}/edit`} className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Pencil className="h-4 w-4" /> Edit department</Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3"><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><TrendingUp className="h-5 w-5 text-[#176c73]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Hospital adoption</p><p className="mt-1 text-3xl font-bold text-[#18343d]">{department.hospitalsUsing}</p><p className="mt-1 text-xs text-[#8ca0a6]">Hospitals using this service</p></div><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><ShieldCheck className="h-5 w-5 text-[#3978a5]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Catalog status</p><div className="mt-2"><DepartmentStatusBadge status={department.status} /></div><p className="mt-2 text-xs text-[#8ca0a6]">Available to platform tenants</p></div><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><CalendarDays className="h-5 w-5 text-[#b47629]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Created</p><p className="mt-2 text-lg font-bold text-[#18343d]">{department.createdAt}</p><p className="mt-1 text-xs text-[#8ca0a6]">Added to the shared catalog</p></div></div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="mb-5 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5f0] text-[#176c73]"><CheckCircle2 className="h-4 w-4" /></div><div><h2 className="text-lg font-bold text-[#18343d]">Department profile</h2><p className="mt-1 text-xs text-[#8ca0a6]">Shared metadata used across hospital workspaces.</p></div></div><dl className="space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Category</dt><dd className="font-bold text-[#3b5660]">{department.category}</dd></div><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Department code</dt><dd className="font-mono font-bold text-[#3b5660]">{department.code}</dd></div><div><dt className="text-[#8ca0a6]">Description</dt><dd className="mt-2 leading-6 text-[#536b75]">{department.description}</dd></div></dl></div><div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><h2 className="text-lg font-bold text-[#18343d]">Platform activity</h2><div className="mt-5 space-y-3"><div className="rounded-lg bg-[#f8fbfa] p-3 text-sm text-[#536b75]">Department added to catalog<span className="mt-1 block text-xs text-[#9aabb1]">{department.createdAt}</span></div><div className="rounded-lg bg-[#f8fbfa] p-3 text-sm text-[#536b75]">Adoption reviewed by platform team<span className="mt-1 block text-xs text-[#9aabb1]">Current cycle</span></div></div></div></div>
      </div>
    </SuperAdminShell>
  );
}
