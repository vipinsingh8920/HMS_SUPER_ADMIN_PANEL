"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, ChevronLeft, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { platformDepartments } from "@/mock/super-admin/departments";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

const steps = [
  "Hospital Information",
  "Contact & Address",
  "Departments",
  "HMS Modules",
  "Hospital Admin",
  "Review & Activate",
];

export default function NewHospitalPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(["dept-01", "dept-02", "dept-13"]);
  const [selectedModules, setSelectedModules] = useState<string[]>(["mod-01", "mod-02", "mod-03", "mod-05", "mod-06", "mod-08"]);
  const [formData, setFormData] = useState({
    hospitalName: "Apollo Care Hospital",
    code: "HMS-001",
    type: "Multi-Speciality",
    registrationNumber: "REG-AP-2025-110",
    email: "admin@apollocare.in",
    phone: "+91 98765 43210",
    website: "https://apollocare.in",
    country: "India",
    state: "Delhi",
    city: "Delhi",
    address: "Rohini Sector 18, Delhi",
    postalCode: "110001",
    contactName: "Dr. Rhea Sharma",
    designation: "Operations Director",
    contactEmail: "rhea.sharma@apollocare.in",
    contactPhone: "+91 98765 43211",
    adminName: "Nisha Kapoor",
    adminEmail: "nisha.kapoor@apollocare.in",
    adminPhone: "+91 98989 66554",
  });

  const canGoNext = currentStep < steps.length - 1;

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  const toggleDepartment = (id: string) => {
    setSelectedDepartments((current) =>
      current.includes(id) ? current.filter((departmentId) => departmentId !== id) : [...current, id]
    );
  };

  const toggleModule = (id: string) => {
    setSelectedModules((current) =>
      current.includes(id) ? current.filter((moduleId) => moduleId !== id) : [...current, id]
    );
  };

  const handleFieldChange = (key: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const currentStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Name
              <input value={formData.hospitalName} onChange={(event) => handleFieldChange("hospitalName", event.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Code
              <input value={formData.code} onChange={(event) => handleFieldChange("code", event.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Type
              <select value={formData.type} onChange={(event) => handleFieldChange("type", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>Multi-Speciality</option>
                <option>General Hospital</option>
                <option>Teaching Hospital</option>
                <option>Speciality Clinic</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Registration Number
              <input value={formData.registrationNumber} onChange={(event) => handleFieldChange("registrationNumber", event.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Email
              <input type="email" value={formData.email} onChange={(event) => handleFieldChange("email", event.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Phone
              <input value={formData.phone} onChange={(event) => handleFieldChange("phone", event.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Website
              <input value={formData.website} onChange={(event) => handleFieldChange("website", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
          </div>
        );
      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Address
              <input value={formData.address} onChange={(event) => handleFieldChange("address", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Country
              <select value={formData.country} onChange={(event) => handleFieldChange("country", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white">
                <option>India</option>
                <option>United Arab Emirates</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              State
              <input value={formData.state} onChange={(event) => handleFieldChange("state", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              City
              <input value={formData.city} onChange={(event) => handleFieldChange("city", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Postal Code
              <input value={formData.postalCode} onChange={(event) => handleFieldChange("postalCode", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Person Name
              <input value={formData.contactName} onChange={(event) => handleFieldChange("contactName", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Designation
              <input value={formData.designation} onChange={(event) => handleFieldChange("designation", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Email
              <input type="email" value={formData.contactEmail} onChange={(event) => handleFieldChange("contactEmail", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Phone
              <input value={formData.contactPhone} onChange={(event) => handleFieldChange("contactPhone", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {platformDepartments.map((department) => (
                <label key={department.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <input type="checkbox" checked={selectedDepartments.includes(department.id)} onChange={() => toggleDepartment(department.id)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <span>{department.name}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                "OPD",
                "Appointments",
                "IPD",
                "Emergency",
                "Laboratory",
                "Radiology",
                "Pharmacy",
                "Billing",
                "Inventory",
                "Reports",
                "OT",
                "Blood Bank",
              ].map((module) => (
                <label key={module} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <input type="checkbox" checked={selectedModules.includes(module)} onChange={() => {
                    const key = module === "OPD" ? "mod-01" : module === "Appointments" ? "mod-02" : module === "IPD" ? "mod-03" : module === "Emergency" ? "mod-04" : module === "Laboratory" ? "mod-05" : module === "Radiology" ? "mod-06" : module === "Pharmacy" ? "mod-07" : module === "Billing" ? "mod-08" : module === "Inventory" ? "mod-09" : module === "Reports" ? "mod-10" : module === "OT" ? "mod-11" : "mod-12";
                    toggleModule(key);
                  }} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <span>{module}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Admin Name
              <input value={formData.adminName} onChange={(event) => handleFieldChange("adminName", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Admin Email
              <input type="email" value={formData.adminEmail} onChange={(event) => handleFieldChange("adminEmail", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Admin Phone
              <input value={formData.adminPhone} onChange={(event) => handleFieldChange("adminPhone", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white" />
            </label>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="text-slate-500">Hospital</span><strong className="text-slate-900">{formData.hospitalName}</strong></div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="text-slate-500">Code</span><strong className="text-slate-900">{formData.code}</strong></div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="text-slate-500">Departments</span><strong className="text-slate-900">{selectedDepartments.length} enabled</strong></div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="text-slate-500">Modules</span><strong className="text-slate-900">{selectedModules.length} enabled</strong></div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="text-slate-500">Hospital Admin</span><strong className="text-slate-900">{formData.adminName}</strong></div>
          </div>
        );
      default:
        return null;
    }
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
                <p className="text-sm text-emerald-800">The hospital profile has been created and is currently in review for activation.</p>
              </div>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Building2 className="h-5 w-5" /></div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Hospital onboarding</h2>
                  <p className="text-sm text-slate-500">{steps[currentStep]}</p>
                </div>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p className="font-semibold text-slate-900">Step {currentStep + 1} of {steps.length}</p>
                <p>{Math.round(progress)}% complete</p>
              </div>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-[#176c73] transition-all" style={{ width: `${progress}%` }} />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <div key={step} className={['rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]', index === currentStep ? 'bg-[#176c73] text-white' : index < currentStep ? 'bg-[#e7f6f0] text-[#23876d]' : 'bg-slate-100 text-slate-500'].join(' ')}>
                  {step}
                </div>
              ))}
            </div>

            {currentStepContent()}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link href="/super-admin/hospitals" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                <ArrowLeft className="h-4 w-4" /> Cancel
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button type="button" onClick={previousStep} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}
              {canGoNext ? (
                <button type="button" onClick={nextStep} className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]">
                  <CheckCircle2 className="h-4 w-4" /> Activate hospital
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </SuperAdminShell>
  );
}
