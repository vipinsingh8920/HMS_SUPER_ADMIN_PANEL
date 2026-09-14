import Link from "next/link";
import { Building2, CheckCircle2, Clock3, MapPinned, Plus } from "lucide-react";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { HospitalTable } from "@/components/hospitals/HospitalTable";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function HospitalsPage() {
  const activeCount = initialHospitals.filter((hospital) => hospital.status === "ACTIVE").length;
  const pendingCount = initialHospitals.filter((hospital) => hospital.status === "PENDING").length;
  const cityCount = new Set(initialHospitals.map((hospital) => hospital.city)).size;
  const departmentCount = initialHospitals.reduce((total, hospital) => total + hospital.enabledDepartmentIds.length, 0);

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
          {[
            { label: "Total hospitals", value: initialHospitals.length, detail: "Across the platform", icon: Building2, tone: "bg-[#e6eff5] text-[#3978a5]" },
            { label: "Active hospitals", value: activeCount, detail: "Access enabled", icon: CheckCircle2, tone: "bg-[#dcefe9] text-[#176c73]" },
            { label: "Pending review", value: pendingCount, detail: "Awaiting approval", icon: Clock3, tone: "bg-[#fff1d8] text-[#b47629]" },
            { label: "Cities covered", value: cityCount, detail: `${departmentCount} department assignments`, icon: MapPinned, tone: "bg-[#f7e6e3] text-[#c96968]" },
          ].map(({ label, value, detail, icon: Icon, tone }) => (
            <div key={label} className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></div>
              <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8ca0a6]">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#18343d]">{value}</p><p className="mt-0.5 truncate text-xs text-[#8ca0a6]">{detail}</p></div>
            </div>
          ))}
        </div>

        <HospitalTable hospitals={initialHospitals} />
      </div>
    </SuperAdminShell>
  );
}
