"use client";

import {
  HospitalForm,
  HospitalFormData,
} from "@/components/hospitals/HospitalForm";
import { useDepartments } from "@/hooks/main/useDepartments";
import { useHospitals } from "@/hooks/main/useHospitals";
import { useModules } from "@/hooks/main/useModules";
import type { UpdateHospitalPayload } from "@/types/hospital";
import { useParams } from "next/navigation";

export default function EditHospitalPage() {
  const params = useParams();
  const hospitalId = Number(params.id);

  const {
    hospitalProfile,
    hospitalLoading,
    hospitalError,
    updateHospital,
    updateHospitalLoading,
    updateHospitalError,
  } = useHospitals({}, hospitalId);

  const { departments = [] } = useDepartments();
  const { data: modules = [] } = useModules();

  if (hospitalLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-slate-500">
        Loading hospital...
      </div>
    );
  }

  if (hospitalError || !hospitalProfile) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Unable to load hospital details.
      </div>
    );
  }

  const initialData: Partial<HospitalFormData> = {
    hospitalName: hospitalProfile.name ?? "",
    code: hospitalProfile.code ?? "",
    type: hospitalProfile.hospital_type ?? "Multi-Speciality",
    registrationNumber: hospitalProfile.registration_no ?? "",
    licenseNumber: hospitalProfile.license_number ?? "",
    email: hospitalProfile.email ?? "",
    phone: hospitalProfile.phone ?? "",
    website: hospitalProfile.website_url ?? "",
    country: hospitalProfile.country ?? "India",
    state: hospitalProfile.state ?? "",
    city: hospitalProfile.city ?? "",
    address: hospitalProfile.address ?? "",
    postalCode: hospitalProfile.postal_code ?? "",
    contactName: hospitalProfile.contact_person_name ?? "",
    designation: hospitalProfile.contact_person_designation ?? "",
    contactEmail: hospitalProfile.contact_person_email ?? "",
    contactPhone: hospitalProfile.contact_person_phone ?? "",
    adminName: hospitalProfile.admin_name ?? "",
    adminEmail: hospitalProfile.admin_email ?? "",
    adminPhone: hospitalProfile.admin_phone ?? "",
    password: "",
    confirmPassword: "",
  };

  const selectedDepartments = departments
    .filter((department) =>
      hospitalProfile.departments?.includes(department.name),
    )
    .map((department) => department.id);

  const selectedModules = modules
    .filter((module) =>
      hospitalProfile.hms_modules?.includes(module.name),
    )
    .map((module) => module.id);

  const handleUpdate = async (
    formData: HospitalFormData,
    nextSelectedDepartments: number[],
    nextSelectedModules: number[],
  ) => {
    const payload: UpdateHospitalPayload = {
      name: formData.hospitalName.trim(),
      code: formData.code.trim(),
      hospital_type: formData.type,
      registration_no: formData.registrationNumber.trim(),
      license_number: formData.licenseNumber.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website_url: formData.website.trim(),
      password: formData.password || undefined,
      address: formData.address.trim(),
      country: formData.country.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postal_code: formData.postalCode.trim(),
      contact_person_name: formData.contactName.trim(),
      contact_person_designation: formData.designation.trim(),
      contact_person_phone: formData.contactPhone.trim(),
      contact_person_email: formData.contactEmail.trim(),
      department_ids: nextSelectedDepartments,
      hms_modules: nextSelectedModules,
      admin_name: formData.adminName.trim(),
      admin_email: formData.adminEmail.trim(),
      admin_phone: formData.adminPhone.trim(),
    };

    await updateHospital(hospitalId, payload);
  };

  return (
    <HospitalForm
      mode="edit"
      initialData={{
        ...initialData,
        selectedDepartments,
        selectedModules,
      }}
      onSubmit={handleUpdate}
      isSubmitting={updateHospitalLoading}
      submitError={updateHospitalError}
      cancelHref={`/super-admin/hospitals/${hospitalId}`}
      title="Edit Hospital"
      subtitle="Update hospital profile details, departments, and modules."
    />
  );
}