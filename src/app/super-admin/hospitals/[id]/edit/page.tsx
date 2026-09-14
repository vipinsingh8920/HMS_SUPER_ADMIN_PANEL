import Link from "next/link";
import { notFound } from "next/navigation";
import { Save } from "lucide-react";
import { initialHospitals } from "@/mock/super-admin/hospitals";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default async function EditHospitalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hospital = initialHospitals.find((item) => item.id === id);
  if (!hospital) notFound();

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">Platform management</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Edit Hospital</h1>
          </div>
          <Link href={`/super-admin/hospitals/${hospital.id}`} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
            Cancel
          </Link>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Name
              <input defaultValue={hospital.name} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Code
              <input defaultValue={hospital.code} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Type
              <select defaultValue={hospital.type} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>Multi-Speciality</option>
                <option>General Hospital</option>
                <option>Teaching Hospital</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Status
              <select defaultValue={hospital.status} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>PENDING</option>
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Email
              <input defaultValue={hospital.email} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Phone
              <input defaultValue={hospital.phone} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Website
              <input defaultValue={hospital.website} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Address
              <input defaultValue={hospital.address} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
              Discard
            </button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </SuperAdminShell>
  );
}
