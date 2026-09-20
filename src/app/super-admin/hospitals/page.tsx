"use client";
import Link from "next/link";
import { Building2, CheckCircle2, Clock3, MapPinned, Plus } from "lucide-react";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { HospitalTable } from "@/components/hospitals/HospitalTable";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { useHospitals } from "@/hooks/main/useHospitals";
import { useState } from "react";
import { useDebounce } from "@/hooks/common/useDebounce";

type HospitalFilters = {
  city: string;
  status: "" | "active" | "inactive";
};

export default function HospitalsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<HospitalFilters>({
    city: "",
    status: "",
  });

  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchInput, 400);
  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useHospitals({
    search: debouncedSearch || undefined,
    city: filters.city || undefined,
    status: filters.status || undefined,
    page,
    page_size: 20,
  });
  const stats = data?.data?.StatsData ?? [];
  const hospitalsData = data?.data;
console.log('heyyyyyy',data)
  const iconMap = {
    Building2,
    CheckCircle2,
    Clock3,
    MapPinned,
  };

  const resetFilters = () => {
    setSearchInput("");
    setFilters({
      city: "",
      status: "",
    });

    setPage(1);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Platform registry</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Hospitals</h1>
            <p className="mt-2 max-w-xl text-sm text-[#71878d]">Manage every hospital connected to the Appziora HMS platform, from onboarding through ongoing access.</p>
          </div>
          <Link href="/super-admin/hospitals/new" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
            <Plus className="h-4 w-4" />
            Register hospital
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, detail, icon, tone }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];

            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8ca0a6]">
                    {label}
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-[#18343d]">
                    {value}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#8ca0a6]">
                    {detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {hospitalsData && <HospitalTable
          hospitals={hospitalsData}
          filters={filters}
          search={searchInput}
          onSearchChange={setSearchInput}
          onCityChange={(value) => {
            setFilters((previous) => ({
              ...previous,
              city: value,
            }));

            setPage(1);
          }}
          onStatusChange={(value) => {
            setFilters((previous) => ({
              ...previous,
              status: value,
            }));

            setPage(1);
          }}
          onReset={resetFilters}
        />}
      </div>
    </SuperAdminShell>
  );
}
