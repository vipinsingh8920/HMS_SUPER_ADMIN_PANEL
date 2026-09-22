"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldCheck, ShieldOff } from "lucide-react";

import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { useDepartments } from "@/hooks/main/useDepartments";
import { useHospitals } from "@/hooks/main/useHospitals";

export default function HospitalDepartmentPage() {
  const params = useParams();
  const hospitalId = Number(params.id);

  const {
    hospitalProfile,
    hospitalLoading,
    hospitalError,
  } = useHospitals({}, hospitalId);

  const { departments = [], isLoading: departmentsLoading } = useDepartments();

  if (hospitalLoading || departmentsLoading) {
    return (
      <SuperAdminShell>
        <div className="flex min-h-[300px] items-center justify-center text-sm text-slate-500">
          Loading hospital departments...
        </div>
      </SuperAdminShell>
    );
  }

  if (hospitalError || !hospitalProfile) {
    return (
      <SuperAdminShell>
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Unable to load hospital departments.
        </div>
      </SuperAdminShell>
    );
  }

  const enabledDepartmentNames = new Set(
    (hospitalProfile.departments ?? []).map((department) =>
      department.trim().toLowerCase(),
    ),
  );

  const enabledCount = departments.filter((department) =>
    enabledDepartmentNames.has(department.name.trim().toLowerCase()),
  ).length;

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform configuration</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Manage Departments</h1>
          </div>
          <Link href={`/super-admin/hospitals/${hospitalProfile.id}`} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
            Back to hospital
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Hospital</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{hospitalProfile.name}</h2>
            </div>
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
              {enabledCount} Departments Enabled
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((department) => {
              const enabled = enabledDepartmentNames.has(
                department.name.trim().toLowerCase(),
              );

              return (
                <div
                  key={department.id}
                  className={[
                    "rounded-xl border p-4",
                    enabled
                      ? "border-emerald-200 bg-emerald-50/40"
                      : "border-slate-200 bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{department.name}</p>
                      <p className="text-xs text-slate-500">{department.category}</p>
                    </div>
                    <span
                      className={[
                        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
                        enabled
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600",
                      ].join(" ")}
                    >
                      {enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{enabled ? department.updated_at : "Not enabled"}</span>
                    <button
                      type="button"
                      className={[
                        "inline-flex items-center gap-1 rounded-[7px] px-2.5 py-1.5 text-xs font-bold",
                        enabled
                          ? "bg-[#123f47] text-white"
                          : "bg-[#176c73] text-white",
                      ].join(" ")}
                    >
                      {enabled ? (
                        <ShieldOff className="h-3.5 w-3.5" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5" />
                      )}
                      {enabled ? "Disable" : "Enable"}
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
