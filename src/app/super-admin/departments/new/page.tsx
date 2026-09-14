"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, PlusCircle } from "lucide-react";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function NewDepartmentPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform catalog</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create Department</h1>
          </div>
          <Link href="/super-admin/departments" className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
            Back to departments
          </Link>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-medium">Department created successfully</p>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Department Name
              <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="General Medicine" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Department Code
              <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="GEN-MED" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Category
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>Primary Care</option>
                <option>Specialty</option>
                <option>Diagnostics</option>
                <option>Mental Health</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Status
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>ACTIVE</option>
                <option>DISABLED</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Description
              <textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" placeholder="Describe the clinical or administrative service covered by this department." />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Link href="/super-admin/departments" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
              Cancel
            </Link>
            <button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
              <PlusCircle className="h-4 w-4" />
              Save Department
            </button>
          </div>
        </form>
      </div>
    </SuperAdminShell>
  );
}
