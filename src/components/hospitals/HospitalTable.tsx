"use client";

import Link from "next/link";
import { Activity, ArrowUpRight, Building2, ChevronDown, Download, Mail, MapPin, Pencil, Phone, Power, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { Hospital } from "@/types/super-admin";
import { HospitalStatusBadge } from "@/components/hospitals/HospitalStatusBadge";

export function HospitalTable({ hospitals }: { hospitals: Hospital[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");

  const cities = useMemo(() => Array.from(new Set(hospitals.map((hospital) => hospital.city))), [hospitals]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchQuery =
        query.trim() === "" ||
        [hospital.name, hospital.code, hospital.city].join(" ").toLowerCase().includes(query.toLowerCase());

      const matchStatus = statusFilter === "ALL" || hospital.status === statusFilter;
      const matchCity = cityFilter === "ALL" || hospital.city === cityFilter;

      return matchQuery && matchStatus && matchCity;
    });
  }, [hospitals, query, statusFilter, cityFilter]);

  const resetFilters = () => {
    setQuery("");
    setStatusFilter("ALL");
    setCityFilter("ALL");
  };

  const exportHospitals = () => {
    const rows = [
      ["Hospital ID", "Hospital Name", "Code", "City", "Status", "Departments", "Last Updated"],
      ...filteredHospitals.map((hospital) => [hospital.id, hospital.name, hospital.code, hospital.city, hospital.status, String(hospital.enabledDepartmentIds.length), hospital.lastUpdated]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "hospitals.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[#dfeae8] bg-[#fbfdfc] px-5 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-[#176c73]" /><h2 className="text-base font-bold text-[#18343d]">Hospital directory</h2><span className="rounded-full bg-[#e5f5f0] px-2 py-0.5 text-[10px] font-bold text-[#23876d]">{filteredHospitals.length} shown</span></div>
            <p className="mt-1 text-xs text-[#8ca0a6]">Search, filter, and manage registered platform tenants.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm text-[#9aabb1] shadow-sm">
              <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search hospitals, cities, codes"
              className="w-full border-0 bg-transparent text-sm text-[#18343d] outline-none placeholder:text-[#9aabb1] sm:w-56"
            />
            </div>

          <div className="relative">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="appearance-none rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 pr-9 text-sm text-[#536b75] outline-none shadow-sm">
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="PENDING">PENDING</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71878d]" />
          </div>

          <div className="relative">
            <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} className="appearance-none rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 pr-9 text-sm text-[#536b75] outline-none shadow-sm">
              <option value="ALL">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71878d]" />
          </div>
          </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 rounded-[7px] border border-[#dfeae8] bg-white px-3 py-2 text-sm font-bold text-[#536b75] shadow-sm hover:bg-[#f3f7f6]" title="Reset filters">
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
          <button type="button" onClick={exportHospitals} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-b border-[#eef3f2] px-5 py-2.5 text-xs text-[#8ca0a6]"><SlidersHorizontal className="h-3.5 w-3.5 text-[#176c73]" /> Filters update the directory instantly <span className="ml-auto hidden sm:inline">Last synced just now</span></div>

      {filteredHospitals.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center text-[#71878d]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eff5] text-[#3978a5]"><Building2 className="h-7 w-7" /></div>
          <div><p className="font-bold text-[#18343d]">No hospitals match your filters.</p><p className="mt-1 text-xs">Try clearing one of the filters to broaden the directory.</p></div>
        </div>
      ) : (
        <div className="grid gap-4 bg-[#f8fbfa] p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <article key={hospital.id} className="group relative overflow-hidden rounded-[12px] border border-[#dfeae8] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd3] hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <div className="h-1 bg-gradient-to-r from-[#176c73] via-[#25a7a0] to-[#7aafd0]" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcefe9] text-sm font-black text-[#176c73] ring-1 ring-[#bde8df]">{hospital.logo}</div>
                    <div className="min-w-0"><p className="truncate text-base font-bold text-[#18343d]">{hospital.name}</p><p className="mt-1 truncate text-xs text-[#8ca0a6]">{hospital.type}</p></div>
                  </div>
                  <HospitalStatusBadge status={hospital.status} />
                </div>

                <div className="mt-5 flex items-center justify-between border-y border-[#eef3f2] py-3 text-xs">
                  <span className="font-mono font-semibold text-[#536b75]">{hospital.code}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#71878d]"><MapPin className="h-3.5 w-3.5 text-[#7aafd0]" />{hospital.city}</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2.5"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f7f6] text-[#71878d]"><Phone className="h-3.5 w-3.5" /></div><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#3b5660]">{hospital.primaryContact.name}</p><p className="text-[11px] text-[#8ca0a6]">{hospital.phone}</p></div></div>
                  <div className="flex items-center gap-2.5"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f7f6] text-[#71878d]"><Mail className="h-3.5 w-3.5" /></div><p className="truncate text-xs text-[#536b75]">{hospital.email}</p></div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[#f8fbfa] px-3 py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aabb1]">Departments</p><p className="mt-1 text-sm font-bold text-[#18343d]">{hospital.enabledDepartmentIds.length} enabled</p></div>
                  <div className="rounded-lg bg-[#f8fbfa] px-3 py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aabb1]">Plan</p><p className="mt-1 truncate text-sm font-bold text-[#18343d]">{hospital.platformConfig.subscription}</p></div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#eef3f2] bg-[#fbfdfc] px-5 py-3">
                <span className="text-[11px] text-[#9aabb1]">Updated {hospital.lastUpdated}</span>
                <div className="flex items-center gap-1.5">
                  <Link href={`/super-admin/hospitals/${hospital.id}`} className="inline-flex items-center gap-1 rounded-lg bg-[#e5f5f0] px-2.5 py-1.5 text-xs font-bold text-[#176c73] hover:bg-[#dcefe9]" aria-label={`View ${hospital.name}`}><span>View</span><ArrowUpRight className="h-3 w-3" /></Link>
                  <Link href={`/super-admin/hospitals/${hospital.id}/edit`} className="rounded-lg border border-[#dfeae8] p-1.5 text-[#70868f] hover:border-[#8dccbe] hover:bg-[#e5f5f0] hover:text-[#176c73]" aria-label={`Edit ${hospital.name}`}><Pencil className="h-3.5 w-3.5" /></Link>
                  <Link href={`/super-admin/hospitals/${hospital.id}/departments`} className="rounded-lg border border-[#dfeae8] p-1.5 text-[#70868f] hover:border-[#8dccbe] hover:bg-[#e5f5f0] hover:text-[#176c73]" aria-label={`Manage departments for ${hospital.name}`}><Building2 className="h-3.5 w-3.5" /></Link>
                  <button type="button" className="rounded-lg border border-[#dfeae8] p-1.5 text-[#70868f] hover:border-[#e8c2bd] hover:bg-[#fff4f2] hover:text-[#c96968]" aria-label={`Toggle ${hospital.name}`}><Power className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
