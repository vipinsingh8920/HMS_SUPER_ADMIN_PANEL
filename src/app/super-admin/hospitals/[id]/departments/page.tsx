import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { initialHospitals, hospitalDepartmentMatrix } from "@/mock/super-admin/hospitals";
import { platformDepartments } from "@/mock/super-admin/departments";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function HospitalDepartmentPage({ params }: { params: { id: string } }) {
  const hospital = initialHospitals.find((item) => item.id === params.id);
  if (!hospital) notFound();
  const departmentMap = hospitalDepartmentMatrix[hospital.id] ?? [];
  const enabledCount = departmentMap.filter((department) => department.enabled).length;

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform configuration</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Manage Departments</h1>
          </div>
          <Link href={`/super-admin/hospitals/${hospital.id}`} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
            Back to hospital
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Hospital</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{hospital.name}</h2>
            </div>
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
              {enabledCount} Departments Enabled
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platformDepartments.map((department) => {
              const assignment = departmentMap.find((item) => item.departmentId === department.id);
              const enabled = Boolean(assignment?.enabled);

              return (
                <div key={department.id} className={['rounded-xl border p-4', enabled ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-slate-50'].join(' ')}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{department.name}</p>
                      <p className="text-xs text-slate-500">{department.category}</p>
                    </div>
                    <span className={['inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide', enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'].join(' ')}>
                      {enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{assignment?.enabledDate ?? 'Not enabled'}</span>
                    <button type="button" className={['inline-flex items-center gap-1 rounded-[7px] px-2.5 py-1.5 text-xs font-bold', enabled ? 'bg-[#123f47] text-white' : 'bg-[#176c73] text-white'].join(' ')}>
                      {enabled ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                      {enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
