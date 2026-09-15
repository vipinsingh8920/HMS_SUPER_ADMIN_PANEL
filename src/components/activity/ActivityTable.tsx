"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, Building2, ChevronRight, Download, FileCog, Search, ShieldAlert, X } from "lucide-react";
import type { PlatformActivity } from "@/types/super-admin";

const statusStyles: Record<PlatformActivity["status"], string> = {
  SUCCESS: "bg-[#e7f6f0] text-[#23876d] ring-[#bde8df]",
  INFO: "bg-[#eaf3fb] text-[#3978a5] ring-[#c6dce9]",
  WARNING: "bg-[#fff1d8] text-[#b47629] ring-[#f0d39f]",
  ERROR: "bg-[#fce9e8] text-[#c96968] ring-[#e8c2bd]",
};

function EventIcon({ entity, status }: { entity: string; status: PlatformActivity["status"] }) {
  const Icon = status === "WARNING" || status === "ERROR" ? ShieldAlert : entity.includes("Department") ? FileCog : Building2;
  return <Icon className="h-4 w-4" />;
}

export function ActivityTable({ items }: { items: PlatformActivity[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<PlatformActivity | null>(null);

  const filteredItems = useMemo(() => items.filter((item) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = normalizedQuery === "" || [item.action, item.entity, item.entityId, item.performedBy].join(" ").toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === "ALL" || item.entity.includes(category);
    const matchesStatus = status === "ALL" || item.status === status;
    return matchesQuery && matchesCategory && matchesStatus;
  }), [items, query, category, status]);

  const resetFilters = () => {
    setQuery("");
    setCategory("ALL");
    setStatus("ALL");
  };

  const exportLog = () => {
    const rows = [["Date/Time", "Action", "Entity", "Entity ID", "Performed By", "Status"], ...filteredItems.map((item) => [item.dateTime, item.action, item.entity, item.entityId, item.performedBy, item.status])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "platform-activity.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[#dfeae8] bg-[#fbfdfc] px-5 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-[#176c73]" /><h2 className="text-base font-bold text-[#18343d]">Audit events</h2><span className="rounded-full bg-[#e5f5f0] px-2 py-0.5 text-[10px] font-bold text-[#23876d]">{filteredItems.length} shown</span></div><p className="mt-1 text-xs text-[#8ca0a6]">Every platform-level change, approval, and configuration event in one place.</p></div>
          <div className="flex flex-col gap-2 sm:flex-row"><div className="flex min-w-0 items-center gap-2 rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#9aabb1] shadow-sm"><Search className="h-4 w-4 shrink-0" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search activity" className="w-full min-w-0 border-0 bg-transparent text-sm text-[#18343d] outline-none placeholder:text-[#9aabb1] sm:w-48" /></div><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#536b75] outline-none shadow-sm"><option value="ALL">All statuses</option><option value="SUCCESS">SUCCESS</option><option value="INFO">INFO</option><option value="WARNING">WARNING</option></select></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2"><div className="flex rounded-[7px] border border-[#dfeae8] bg-white p-1 shadow-sm">{[["ALL", "All"], ["Hospital", "Hospitals"], ["Department", "Departments"]].map(([value, label]) => <button key={value} type="button" onClick={() => setCategory(value)} className={`rounded-md px-3 py-1.5 text-xs font-bold ${category === value ? "bg-[#176c73] text-white" : "text-[#71878d] hover:bg-[#f3f7f6]"}`}>{label}</button>)}</div><button type="button" onClick={resetFilters} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-xs font-bold text-[#536b75] shadow-sm hover:bg-[#f3f7f6]">Reset</button><button type="button" onClick={exportLog} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3 py-2 text-xs font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Download className="h-3.5 w-3.5" /> Export log</button></div>
      </div>

      {filteredItems.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eff5] text-[#3978a5]"><Activity className="h-7 w-7" /></div><p className="font-bold text-[#18343d]">No activity matches these filters.</p></div> : <div className="divide-y divide-[#eef3f2]">{filteredItems.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[#f8fbfa]"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${statusStyles[item.status]}`}><EventIcon entity={item.entity} status={item.status} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-[#18343d]">{item.action}</p><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${statusStyles[item.status]}`}>{item.status}</span></div><p className="mt-1 truncate text-xs text-[#8ca0a6]">{item.entity} · {item.entityId} · {item.performedBy}</p></div><div className="hidden text-right sm:block"><p className="text-xs font-semibold text-[#536b75]">{item.dateTime.split(" ")[0]}</p><p className="mt-1 text-[11px] text-[#9aabb1]">{item.dateTime.split(" ")[1]}</p></div><ChevronRight className="h-4 w-4 shrink-0 text-[#b7c8c8] transition group-hover:translate-x-1 group-hover:text-[#176c73]" /></button>)}</div>}

      {selected && <div className="fixed inset-0 z-50 flex justify-end bg-[#09202b]/40" onClick={() => setSelected(null)}><aside className="h-full w-full max-w-md overflow-y-auto bg-[#f8fbfa] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176c73]">Activity detail</p><h2 className="mt-2 text-xl font-bold text-[#18343d]">{selected.action}</h2></div><button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 text-[#71878d] hover:bg-white" aria-label="Close activity details"><X className="h-5 w-5" /></button></div><div className="mt-6 rounded-[12px] border border-[#dfeae8] bg-white p-5 shadow-sm"><div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${statusStyles[selected.status]}`}><EventIcon entity={selected.entity} status={selected.status} /></div><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Status</dt><dd className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${statusStyles[selected.status]}`}>{selected.status}</dd></div><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Entity</dt><dd className="font-bold text-[#3b5660]">{selected.entity}</dd></div><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Entity ID</dt><dd className="font-mono text-xs font-bold text-[#3b5660]">{selected.entityId}</dd></div><div className="flex justify-between gap-4 border-b border-[#eef3f2] pb-3"><dt className="text-[#8ca0a6]">Performed by</dt><dd className="font-bold text-[#3b5660]">{selected.performedBy}</dd></div><div className="flex justify-between gap-4"><dt className="text-[#8ca0a6]">Date and time</dt><dd className="font-bold text-[#3b5660]">{selected.dateTime}</dd></div></dl></div><Link href={selected.entity === "Department" ? `/super-admin/departments/${selected.entityId}` : `/super-admin/hospitals/${selected.entityId.split(" /")[0]}`} onClick={() => setSelected(null)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123f47]">Open related record<ChevronRight className="h-4 w-4" /></Link></aside></div>}
    </div>
  );
}
