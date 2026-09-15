"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, Search, ShieldAlert } from "lucide-react";
import { supportTickets } from "@/mock/super-admin/support-tickets";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return supportTickets.filter((ticket) => {
      const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
      const haystack = [ticket.hospital, ticket.subject, ticket.priority, ticket.id].join(" ").toLowerCase();
      const matchesQuery = normalized === "" || haystack.includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Support desk</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Hospital Support</h1>
            <p className="mt-2 max-w-xl text-sm text-[#71878d]">Track onboarding issues, escalations, and platform queries across your network.</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Open</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{supportTickets.filter((ticket) => ticket.status === "OPEN").length}</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">In progress</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{supportTickets.filter((ticket) => ticket.status === "IN_PROGRESS").length}</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Resolved</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{supportTickets.filter((ticket) => ticket.status === "RESOLVED").length}</p></div>
          <div className="rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Urgent</p><p className="mt-2 text-2xl font-bold text-[#18343d]">{supportTickets.filter((ticket) => ticket.priority === "URGENT").length}</p></div>
        </div>

        <div className="rounded-[14px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#9aabb1] shadow-sm"><Search className="h-4 w-4 shrink-0" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tickets" className="w-full min-w-0 border-0 bg-transparent text-sm text-[#18343d] outline-none placeholder:text-[#9aabb1] sm:w-56" /></div>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#536b75] outline-none shadow-sm"><option value="ALL">All statuses</option><option value="OPEN">OPEN</option><option value="IN_PROGRESS">IN_PROGRESS</option><option value="RESOLVED">RESOLVED</option><option value="CLOSED">CLOSED</option></select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#dfeae8]">
            <table className="min-w-[680px] divide-y divide-[#e7eef0] text-left text-sm">
              <thead className="bg-[#f7faf9] text-[#8ca0a6]">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Ticket</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Hospital</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Priority</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Status</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f1] bg-white">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-[#f9fbfb]">
                    <td className="px-4 py-3"><div className="font-semibold text-[#18343d]">{ticket.subject}</div><div className="mt-1 text-xs text-[#8ca0a6]">{ticket.id}</div></td>
                    <td className="px-4 py-3 text-[#536b75]">{ticket.hospital}</td>
                    <td className="px-4 py-3"><span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', ticket.priority === 'URGENT' ? 'bg-[#fce9e8] text-[#c96968] ring-1 ring-[#e8c2bd]' : ticket.priority === 'HIGH' ? 'bg-[#fff1d8] text-[#b47629] ring-1 ring-[#f0d39f]' : 'bg-[#eaf3fb] text-[#3978a5] ring-1 ring-[#c6dce9]'].join(' ')}>{ticket.priority}</span></td>
                    <td className="px-4 py-3"><span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', ticket.status === 'OPEN' ? 'bg-[#eaf3fb] text-[#3978a5] ring-1 ring-[#c6dce9]' : ticket.status === 'IN_PROGRESS' ? 'bg-[#fff1d8] text-[#b47629] ring-1 ring-[#f0d39f]' : ticket.status === 'RESOLVED' ? 'bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]' : 'bg-[#f3f7f6] text-[#536b75] ring-1 ring-[#dfeae8]'].join(' ')}>{ticket.status}</span></td>
                    <td className="px-4 py-3 text-[#536b75]">{ticket.updatedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
