import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Pencil, ShieldCheck, TrendingUp } from "lucide-react";
import { platformModules } from "@/mock/super-admin/modules";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default async function ModuleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = platformModules.find((item) => item.id === id);
  if (!module) notFound();

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <Link href="/super-admin/modules" className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to modules</Link>
        <div className="overflow-hidden rounded-[12px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="h-2 bg-gradient-to-r from-[#176c73] via-[#25a7a0] to-[#7aafd0]" />
          <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Platform module</p><div className="mt-2 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold text-[#18343d]">{module.name}</h1><span className={['inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide', module.status === "ACTIVE" ? "bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]" : "bg-[#f3f7f6] text-[#71878d] ring-1 ring-[#dfeae8]"].join(" ")}>{module.status}</span></div><p className="mt-2 font-mono text-sm font-semibold text-[#8ca0a6]">{module.code} · {module.id}</p></div>
            <Link href={`/super-admin/modules/${module.id}/edit`} className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Pencil className="h-4 w-4" /> Edit module</Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><TrendingUp className="h-5 w-5 text-[#176c73]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Hospital adoption</p><p className="mt-1 text-3xl font-bold text-[#18343d]">{module.hospitalsUsing}</p><p className="mt-1 text-xs text-[#8ca0a6]">Hospitals using this module</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><ShieldCheck className="h-5 w-5 text-[#3978a5]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Module category</p><p className="mt-2 text-lg font-bold text-[#18343d]">{module.category}</p><p className="mt-1 text-xs text-[#8ca0a6]">Shared platform capability</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><CalendarDays className="h-5 w-5 text-[#b47629]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Created</p><p className="mt-2 text-lg font-bold text-[#18343d]">{module.createdAt}</p><p className="mt-1 text-xs text-[#8ca0a6]">Added to the module catalog</p></div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="mb-5 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5f0] text-[#176c73]"><CheckCircle2 className="h-4 w-4" /></div><div><h2 className="text-lg font-bold text-[#18343d]">Module profile</h2><p className="mt-1 text-xs text-[#8ca0a6]">Shared configuration used across hospital workspaces.</p></div></div><dl className="space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Module code</dt><dd className="font-mono font-bold text-[#3b5660]">{module.code}</dd></div><div><dt className="text-[#8ca0a6]">Description</dt><dd className="mt-2 leading-6 text-[#536b75]">{module.description}</dd></div></dl></div>
          <div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><h2 className="text-lg font-bold text-[#18343d]">Platform activity</h2><div className="mt-5 space-y-3"><div className="rounded-lg bg-[#f8fbfa] p-3 text-sm text-[#536b75]">Module added to catalog<span className="mt-1 block text-xs text-[#9aabb1]">{module.createdAt}</span></div><div className="rounded-lg bg-[#f8fbfa] p-3 text-sm text-[#536b75]">Adoption reviewed by platform team<span className="mt-1 block text-xs text-[#9aabb1]">Current cycle</span></div></div></div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
