"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { platformDepartments } from "@/mock/super-admin/departments";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function NewHospitalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(["dept-01", "dept-02", "dept-13"]);

  const toggleDepartment = (id: string) => {
    setSelectedDepartments((current) =>
      current.includes(id) ? current.filter((departmentId) => departmentId !== id) : [...current, id]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform onboarding</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Register New Hospital</h1>
          </div>
          <Link href="/super-admin/hospitals" className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
            Back to hospitals
          </Link>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-semibold">Hospital registered successfully</h2>
                <p className="text-sm text-emerald-800">The hospital profile has been created on the platform and is awaiting review.</p>
              </div>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Building2 className="h-5 w-5" /></div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Hospital Information</h2>
                <p className="text-sm text-slate-500">Core platform details</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Hospital Name
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Apollo Care Hospital" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Hospital Code
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="HMS-001" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Hospital Type
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                  <option>Multi-Speciality</option>
                  <option>General Hospital</option>
                  <option>Teaching Hospital</option>
                  <option>Speciality Clinic</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Registration Number
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="REG-AP-2025-110" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input type="email" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="admin@hospital.com" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Phone
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="+91 98765 43210" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                Website
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="https://examplehospital.in" />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><MapPin className="h-5 w-5" /></div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Address</h2>
                <p className="text-sm text-slate-500">Geographic info</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                Address
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Street, Road, Sector" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Country
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                  <option>India</option>
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                State
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Delhi" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                City
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Delhi" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Postal Code
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="110001" />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><ShieldCheck className="h-5 w-5" /></div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Primary Hospital Contact</h2>
                <p className="text-sm text-slate-500">Administrative point of contact</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Contact Person Name
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Dr. Rhea Sharma" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Designation
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Operations Director" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input type="email" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="rhea@hospital.com" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Phone
                <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="+91 98765 43211" />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><ShieldCheck className="h-5 w-5" /></div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Platform Configuration</h2>
                <p className="text-sm text-slate-500">Tenant access and department setup</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Hospital Status
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                  <option>PENDING</option>
                  <option>ACTIVE</option>
                  <option>INACTIVE</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Subscription / Plan
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                  <option>Enterprise Plus</option>
                  <option>Enterprise</option>
                  <option>Growth</option>
                  <option>Trial</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Trial Period
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="30 Days" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Notes
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Short platform notes" />
              </label>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-slate-700">Enabled Departments</p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {platformDepartments.slice(0, 12).map((department) => (
                  <label key={department.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(department.id)}
                      onChange={() => toggleDepartment(department.id)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{department.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link href="/super-admin/hospitals" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
              Cancel
            </Link>
            <button type="submit" className="rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
              Save / Register Hospital
            </button>
          </div>
        </form>
      </div>
    </SuperAdminShell>
  );
}
