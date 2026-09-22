
"use client";

import {
  HospitalForm,
  HospitalFormData,
} from "@/components/hospitals/HospitalForm";
import { useHospitals } from "@/hooks/main/useHospitals";
import { CreateHospitalPayload } from "@/types/hospital";

export default function NewHospitalPage() {
  const {
    createHospital,
    createHospitalLoading,
    createHospitalError,
  } = useHospitals();

  const handleCreate = async (
    formData: HospitalFormData,
    selectedDepartments: number[],
    selectedModules: number[],
  ) => {
    const payload: CreateHospitalPayload = {
      name: formData.hospitalName.trim(),
      code: formData.code.trim(),
      hospital_type: formData.type,
      registration_no:
        formData.registrationNumber.trim(),
      license_number:
        formData.licenseNumber.trim(),

      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website_url: formData.website.trim(),
      password: formData.password,

      address: formData.address.trim(),
      country: formData.country.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postal_code:
        formData.postalCode.trim(),

      contact_person_name:
        formData.contactName.trim(),
      contact_person_designation:
        formData.designation.trim(),
      contact_person_phone:
        formData.contactPhone.trim(),
      contact_person_email:
        formData.contactEmail.trim(),

      department_ids:
        selectedDepartments,

      hms_modules:
        selectedModules,

      admin_name:
        formData.adminName.trim(),
      admin_email:
        formData.adminEmail.trim(),
      admin_phone:
        formData.adminPhone.trim(),
    };

    await createHospital(payload);
  };

  return (
    <HospitalForm
      mode="create"
      onSubmit={handleCreate}
      isSubmitting={createHospitalLoading}
      submitError={createHospitalError}
    />
  );
}