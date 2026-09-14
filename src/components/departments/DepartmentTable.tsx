"use client";

import Link from "next/link";
import { Activity, ArrowUpRight, Building2, Download, Pencil, Search, ShieldCheck, ShieldOff, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { Department } from "@/types/super-admin";
import { DepartmentStatusBadge } from "@/components/departments/DepartmentStatusBadge";

export function DepartmentTable({ departments }: { departments: Department[] }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const categories = useMemo(() => Array.from(new Set(departments.map((department) => department.category))), [departments]);
  const filteredDepartments = useMemo(() => departments.filter((department) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = normalizedQuery === "" || [department.name, department.code, department.description].join(" ").toLowerCase().includes(normalizedQuery);
    const matchesCategory = categoryFilter === "ALL" || department.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || department.status === statusFilter;
    return matchesQuery && matchesCategory && matchesStatus;
  }), [departments, query, categoryFilter, statusFilter]);

  const exportDepartments = () => {
    const rows = [
      ["Department ID", "Department", "Code", "Category", "Hospitals Using", "Status", "Created Date"],
      ...filteredDepartments.map((department) => [department.id, department.name, department.code, department.category, String(department.hospitalsUsing), department.status, department.createdAt]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "platform-departments.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setQuery("");
    setCategoryFilter("ALL");
    setStatusFilter("ALL");
  };

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[#dfeae8] bg-[#fbfdfc] px-5 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-[#176c73]" /><h2 className="text-base font-bold text-[#18343d]">Clinical service catalog</h2><span className="rounded-full bg-[#e5f5f0] px-2 py-0.5 text-[10px] font-bold text-[#23876d]">{filteredDepartments.length} shown</span></div>
            <p className="mt-1 text-xs text-[#8ca0a6]">Manage shared departments and monitor platform-wide adoption.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#9aabb1] shadow-sm"><Search className="h-4 w-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search departments or codes" className="w-full border-0 bg-transparent text-sm text-[#18343d] outline-none placeholder:text-[#9aabb1] sm:w-52" /></div>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#536b75] outline-none shadow-sm"><option value="ALL">All categories</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#536b75] outline-none shadow-sm"><option value="ALL">All statuses</option><option value="ACTIVE">ACTIVE</option><option value="DISABLED">DISABLED</option></select>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button type="button" onClick={resetFilters} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-xs font-bold text-[#536b75] shadow-sm hover:bg-[#f3f7f6]">Reset filters</button>
          <button type="button" onClick={exportDepartments} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3 py-2 text-xs font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Download className="h-3.5 w-3.5" /> Export catalog</button>
          <span className="ml-auto hidden items-center gap-2 text-xs text-[#8ca0a6] sm:inline-flex"><SlidersHorizontal className="h-3.5 w-3.5 text-[#176c73]" /> Filters update instantly</span>
        </div>
      </div>

      {filteredDepartments.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center text-[#71878d]"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eff5] text-[#3978a5]"><Building2 className="h-7 w-7" /></div><p className="font-bold text-[#18343d]">No departments match your filters.</p></div>
      ) : (
        <div className="grid gap-4 bg-[#f8fbfa] p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDepartments.map((department) => (
            <article key={department.id} className="group relative overflow-hidden rounded-[12px] border border-[#dfeae8] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd3] hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <div className="h-1 bg-gradient-to-r from-[#176c73] via-[#25a7a0] to-[#7aafd0]" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6eff5] text-[#3978a5] ring-1 ring-[#c6dce9]"><Building2 className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-base font-bold text-[#18343d]">{department.name}</p><p className="mt-1 font-mono text-xs font-semibold text-[#8ca0a6]">{department.code}</p></div></div><DepartmentStatusBadge status={department.status} /></div>
                <p className="mt-5 min-h-10 text-sm leading-5 text-[#71878d]">{department.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-lg bg-[#f8fbfa] px-3 py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aabb1]">Category</p><p className="mt-1 truncate text-sm font-bold text-[#18343d]">{department.category}</p></div><div className="rounded-lg bg-[#f8fbfa] px-3 py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aabb1]">Adoption</p><p className="mt-1 text-sm font-bold text-[#18343d]">{department.hospitalsUsing} hospitals</p></div></div>
              </div>
              <div className="flex items-center justify-between border-t border-[#eef3f2] bg-[#fbfdfc] px-5 py-3"><span className="text-[11px] text-[#9aabb1]">Created {department.createdAt}</span><div className="flex items-center gap-1.5"><Link href={`/super-admin/departments/${department.id}`} className="inline-flex items-center gap-1 rounded-lg bg-[#e5f5f0] px-2.5 py-1.5 text-xs font-bold text-[#176c73] hover:bg-[#dcefe9]" aria-label={`View ${department.name}`}>View<ArrowUpRight className="h-3 w-3" /></Link><Link href={`/super-admin/departments/${department.id}/edit`} className="rounded-lg border border-[#dfeae8] p-1.5 text-[#70868f] hover:border-[#8dccbe] hover:bg-[#e5f5f0] hover:text-[#176c73]" aria-label={`Edit ${department.name}`}><Pencil className="h-3.5 w-3.5" /></Link><button type="button" className="rounded-lg border border-[#dfeae8] p-1.5 text-[#23876d] hover:bg-[#e5f5f0]" aria-label={`Enable ${department.name}`}><ShieldCheck className="h-3.5 w-3.5" /></button><button type="button" className="rounded-lg border border-[#dfeae8] p-1.5 text-[#70868f] hover:bg-[#f3f7f6]" aria-label={`Disable ${department.name}`}><ShieldOff className="h-3.5 w-3.5" /></button></div></div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
