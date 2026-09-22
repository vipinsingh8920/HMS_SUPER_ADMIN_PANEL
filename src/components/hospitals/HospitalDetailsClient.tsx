"use client";

import Link from "next/link";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useHospitals } from "@/hooks/main/useHospitals";
import { HospitalStatusBadge } from "@/components/hospitals/HospitalStatusBadge";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { formatDate } from "@/utils/date";
type HospitalDetailsClientProps = {
  hospitalId: number;
};

export default function HospitalDetailsClient({
  hospitalId,
}: HospitalDetailsClientProps) {
  const {
    hospitalProfile,
    isLoading,
    isFetching,
    error,
  } = useHospitals({}, hospitalId);

  if (isLoading) {
    return (
      <div>
        Loading hospital...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load hospital.
      </div>
    );
  }

  if (!hospitalProfile) {
    return (
      <div>
        Hospital not found.
      </div>
    );
  }

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-bold text-emerald-700">{hospitalProfile.logo || "AC"}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{hospitalProfile.name}</h1>
                  <HospitalStatusBadge status={hospitalProfile.is_active ? "ACTIVE" : "INACTIVE"} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{hospitalProfile.code}</span>
                  <span>{hospitalProfile.city}</span>
                  <span>{hospitalProfile.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/super-admin/hospitals/${hospitalProfile.id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
                <Pencil className="h-4 w-4" />
                Edit Hospital
              </Link>
              <Link href={`/super-admin/hospitals/${hospitalProfile.id}/departments`} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
                <CheckCircle2 className="h-4 w-4" />
                Manage Departments
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Hospital Status</p>
            <div className="mt-3"><HospitalStatusBadge status={hospitalProfile.is_active ? "ACTIVE" : "INACTIVE"} /></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Registration Date</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{formatDate(hospitalProfile.created_at)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Enabled Departments</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{hospitalProfile.departments?.length ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Last Updated</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{formatDate(hospitalProfile.updated_at)}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Hospital Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Hospital Type</dt><dd className="font-medium text-slate-800">{hospitalProfile.hospital_type}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Registration Number</dt><dd className="font-medium text-slate-800">{hospitalProfile.registration_no}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-800">{hospitalProfile.admin_email}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Phone</dt><dd className="font-medium text-slate-800">{hospitalProfile.admin_phone}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Website</dt><dd className="font-medium text-slate-800">{hospitalProfile.website_url}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Primary Contact</dt><dd className="font-medium text-slate-800">{hospitalProfile.contact_person_name}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Designation</dt><dd className="font-medium text-slate-800">{hospitalProfile.contact_person_designation}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Contact Email</dt><dd className="font-medium text-slate-800">{hospitalProfile.contact_person_email}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Contact Phone</dt><dd className="font-medium text-slate-800">{hospitalProfile.contact_person_phone}</dd></div>
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
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Country</dt><dd className="font-medium text-slate-800">{hospitalProfile.country}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">State</dt><dd className="font-medium text-slate-800">{hospitalProfile.state}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">City</dt><dd className="font-medium text-slate-800">{hospitalProfile.city}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Postal code</dt><dd className="font-medium text-slate-800">{hospitalProfile.postal_code}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-semibold text-slate-900">Platform Information</h2>
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Subscription</dt><dd className="font-medium text-slate-800">{"PROFESSIONAL"}</dd></div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-3"><dt className="text-slate-500">Trial Period</dt><dd className="font-medium text-slate-800">{"07 months"}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-slate-500">Notes</dt><dd className="max-w-sm text-right font-medium text-slate-800">{"Best Values Plan"}</dd></div>
            </dl>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-semibold text-slate-900">Enabled Departments</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {hospitalProfile.departments?.map((department) => (
              <span key={department} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                {department}
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