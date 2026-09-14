import { Activity, CheckCircle2, FolderCog, Plus, Stethoscope } from "lucide-react";
import Link from "next/link";
import { platformDepartments } from "@/mock/super-admin/departments";
import { DepartmentTable } from "@/components/departments/DepartmentTable";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function DepartmentsPage() {
  const activeCount = platformDepartments.filter((department) => department.status === "ACTIVE").length;
  const hospitalsUsing = platformDepartments.reduce((total, department) => total + department.hospitalsUsing, 0);
  const categoryCount = new Set(platformDepartments.map((department) => department.category)).size;

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]"><span className="h-2 w-2 rounded-full bg-[#20a477] shadow-[0_0_0_4px_#d9f4e8]" /> Platform catalog</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Departments</h1>
            <p className="mt-2 max-w-xl text-sm text-[#71878d]">Shape the shared clinical catalog that hospitals can enable across the Appziora HMS platform.</p>
          </div>
          <Link href="/super-admin/departments/new" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
            <Plus className="h-4 w-4" />
            Add department
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Departments", value: platformDepartments.length, detail: "In platform catalog", icon: FolderCog, tone: "bg-[#e6eff5] text-[#3978a5]" },
            { label: "Active services", value: activeCount, detail: "Ready for hospitals", icon: CheckCircle2, tone: "bg-[#dcefe9] text-[#176c73]" },
            { label: "Hospital adoption", value: hospitalsUsing, detail: "Total assignments", icon: Stethoscope, tone: "bg-[#fff1d8] text-[#b47629]" },
            { label: "Categories", value: categoryCount, detail: "Clinical groupings", icon: Activity, tone: "bg-[#f7e6e3] text-[#c96968]" },
          ].map(({ label, value, detail, icon: Icon, tone }) => (
            <div key={label} className="flex items-center gap-3 rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></div>
              <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8ca0a6]">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#18343d]">{value}</p><p className="mt-0.5 truncate text-xs text-[#8ca0a6]">{detail}</p></div>
            </div>
          ))}
        </div>

        <DepartmentTable departments={platformDepartments} />
      </div>
    </SuperAdminShell>
  );
}
