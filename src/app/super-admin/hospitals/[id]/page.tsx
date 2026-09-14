import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, CheckCircle2, MapPin, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { platformDepartments } from "@/mock/super-admin/departments";
import { HospitalStatusBadge } from "@/components/hospitals/HospitalStatusBadge";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const hospital = initialHospitals.find((item) => item.id === params.id);
  if (!hospital) notFound();
  const enabledDepartments = platformDepartments.filter((department) => hospital.enabledDepartmentIds.includes(department.id));

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-bold text-emerald-700">{hospital.logo}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{hospital.name}</h1>
                  <HospitalStatusBadge status={hospital.status} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{hospital.code}</span>
                  <span>{hospital.city}</span>
                  <span>{hospital.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/super-admin/hospitals/${hospital.id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
                <Pencil className="h-4 w-4" />
                Edit Hospital
              </Link>
              <Link href={`/super-admin/hospitals/${hospital.id}/departments`} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
                <CheckCircle2 className="h-4 w-4" />
                Manage Departments
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Hospital Status</p>
            <div className="mt-3"><HospitalStatusBadge status={hospital.status} /></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Registration Date</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{hospital.registrationDate}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Enabled Departments</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{enabledDepartments.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Last Updated</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{hospital.lastUpdated}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Hospital Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Hospital Type</dt><dd className="font-medium text-slate-800">{hospital.type}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Registration Number</dt><dd className="font-medium text-slate-800">{hospital.registrationNumber}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-800">{hospital.email}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Phone</dt><dd className="font-medium text-slate-800">{hospital.phone}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Website</dt><dd className="font-medium text-slate-800">{hospital.website}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Primary Contact</dt><dd className="font-medium text-slate-800">{hospital.primaryContact.name}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Designation</dt><dd className="font-medium text-slate-800">{hospital.primaryContact.designation}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Contact Email</dt><dd className="font-medium text-slate-800">{hospital.primaryContact.email}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Contact Phone</dt><dd className="font-medium text-slate-800">{hospital.primaryContact.phone}</dd></div>
            </dl>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Address</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Country</dt><dd className="font-medium text-slate-800">{hospital.country}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">State</dt><dd className="font-medium text-slate-800">{hospital.state}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">City</dt><dd className="font-medium text-slate-800">{hospital.city}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Postal code</dt><dd className="font-medium text-slate-800">{hospital.postalCode}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Platform Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Subscription</dt><dd className="font-medium text-slate-800">{hospital.platformConfig.subscription}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Trial Period</dt><dd className="font-medium text-slate-800">{hospital.platformConfig.trialPeriod}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Notes</dt><dd className="max-w-sm text-right font-medium text-slate-800">{hospital.platformConfig.notes}</dd></div>
            </dl>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-semibold text-slate-900">Enabled Departments</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {enabledDepartments.map((department) => (
              <span key={department.id} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                {department.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-semibold text-slate-900">Recent Platform Activity</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"><span>Hospital profile updated</span><span className="text-slate-500">2026-09-08</span></div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"><span>Department enabled for hospital</span><span className="text-slate-500">2026-09-12</span></div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"><span>Hospital activated</span><span className="text-slate-500">2026-09-13</span></div>
          </div>
        </div>
      </div>
    </SuperAdminShell>
  );
}
