"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { useDepartments } from "@/hooks/main/useDepartments";
import { useModules } from "@/hooks/main/useModules";
import {
  validateEmail,
  validateMobile,
} from "@/utils/validators";

export type HospitalFormMode = "create" | "edit";

export type HospitalFormData = {
  hospitalName: string;
  code: string;
  type: string;
  registrationNumber: string;
  licenseNumber: string;
  email: string;
  phone: string;
  website: string;

  password: string;
  confirmPassword: string;

  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;

  contactName: string;
  designation: string;
  contactEmail: string;
  contactPhone: string;

  adminName: string;
  adminEmail: string;
  adminPhone: string;
};

export type HospitalFormInitialData = Partial<HospitalFormData> & {
  selectedDepartments?: number[];
  selectedModules?: number[];
};

type HospitalFormProps = {
  mode: HospitalFormMode;

  initialData?: HospitalFormInitialData;

  onSubmit: (
    formData: HospitalFormData,
    selectedDepartments: number[],
    selectedModules: number[],
  ) => Promise<void>;

  isSubmitting?: boolean;
  submitError?: unknown;

  cancelHref?: string;
  title?: string;
  subtitle?: string;
};

const steps = [
  "Hospital Information",
  "Contact & Address",
  "Departments",
  "HMS Modules",
  "Hospital Admin",
  "Review & Activate",
];

const emptyFormData: HospitalFormData = {
  hospitalName: "",
  code: "",
  type: "Multi-Speciality",
  registrationNumber: "",
  licenseNumber: "",
  email: "",
  phone: "",
  website: "",

  password: "",
  confirmPassword: "",

  country: "India",
  state: "",
  city: "",
  address: "",
  postalCode: "",

  contactName: "",
  designation: "",
  contactEmail: "",
  contactPhone: "",

  adminName: "",
  adminEmail: "",
  adminPhone: "",
};

export function HospitalForm({
  mode,
  initialData,
  onSubmit,
  isSubmitting = false,
  submitError,
  cancelHref = "/super-admin/hospitals",
  title,
  subtitle,
}: HospitalFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [selectedDepartments, setSelectedDepartments] =
    useState<number[]>(
      initialData?.selectedDepartments ?? [],
    );

  const [selectedModules, setSelectedModules] =
    useState<number[]>(
      initialData?.selectedModules ?? [],
    );

  const [formError, setFormError] =
    useState<string | null>(null);

  const [formData, setFormData] =
    useState<HospitalFormData>({
      ...emptyFormData,
      ...initialData,
    });

  const {
    data,
    isLoading: modulesLoading,
    error: modulesError,
  } = useModules();

  const {
    departments,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useDepartments();

  const canGoNext =
    currentStep < steps.length - 1;

  const progress = useMemo(
    () =>
      ((currentStep + 1) / steps.length) * 100,
    [currentStep],
  );

  /*
   * Edit mode:
   * populate hospital values when initialData arrives.
   */
  useEffect(() => {
    if (mode !== "edit" || !initialData) {
      return;
    }

    setFormData((current) => ({
      ...current,
      ...initialData,
    }));

    if (initialData.selectedDepartments) {
      setSelectedDepartments(
        initialData.selectedDepartments,
      );
    }

    if (initialData.selectedModules) {
      setSelectedModules(
        initialData.selectedModules,
      );
    }
  }, [mode, initialData]);

  /*
   * Create mode:
   * automatically select default HMS modules.
   */
  useEffect(() => {
    if (mode !== "create") {
      return;
    }

    if (!data?.length) {
      return;
    }

    setSelectedModules((current) => {
      if (current.length > 0) {
        return current;
      }

      return data
        .filter((module) => module.is_default)
        .map((module) => module.id);
    });
  }, [mode, data]);

  const toggleDepartment = (id: number) => {
    setSelectedDepartments((current) =>
      current.includes(id)
        ? current.filter(
            (departmentId) =>
              departmentId !== id,
          )
        : [...current, id],
    );
  };

  const toggleModule = (moduleId: number) => {
    setSelectedModules((current) =>
      current.includes(moduleId)
        ? current.filter(
            (id) => id !== moduleId,
          )
        : [...current, moduleId],
    );
  };

  const handleFieldChange = (
    key: keyof HospitalFormData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const validateCurrentStep = () => {
    setFormError(null);

    if (currentStep === 0) {
      if (
        !formData.hospitalName.trim() ||
        !formData.code.trim() ||
        !formData.registrationNumber.trim() ||
        !formData.licenseNumber.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.website.trim()
      ) {
        setFormError(
          "Please complete all required hospital information.",
        );

        return false;
      }

      const emailError = validateEmail(
        formData.email,
      );

      if (emailError) {
        setFormError(emailError);
        return false;
      }

      const phoneError = validateMobile(
        formData.phone,
      );

      if (phoneError) {
        setFormError(phoneError);
        return false;
      }
    }

    if (currentStep === 1) {
      if (
        !formData.address.trim() ||
        !formData.country.trim() ||
        !formData.state.trim() ||
        !formData.city.trim() ||
        !formData.postalCode.trim() ||
        !formData.contactName.trim() ||
        !formData.designation.trim() ||
        !formData.contactEmail.trim() ||
        !formData.contactPhone.trim()
      ) {
        setFormError(
          "Please complete all required contact and address information.",
        );

        return false;
      }

      const emailError = validateEmail(
        formData.contactEmail,
      );

      if (emailError) {
        setFormError(
          `Contact person: ${emailError}`,
        );

        return false;
      }

      const phoneError = validateMobile(
        formData.contactPhone,
      );

      if (phoneError) {
        setFormError(
          `Contact person: ${phoneError}`,
        );

        return false;
      }
    }

    if (currentStep === 2) {
      if (departmentsLoading) {
        setFormError(
          "Departments are still loading. Please wait.",
        );

        return false;
      }

      if (departmentsError) {
        setFormError(
          "Unable to load departments. Please try again.",
        );

        return false;
      }

      if (selectedDepartments.length === 0) {
        setFormError(
          "Please select at least one department.",
        );

        return false;
      }
    }

    if (currentStep === 3) {
      if (modulesLoading) {
        setFormError(
          "HMS modules are still loading. Please wait.",
        );

        return false;
      }

      if (modulesError) {
        setFormError(
          "Unable to load HMS modules. Please try again.",
        );

        return false;
      }

      if (!data?.length) {
        setFormError(
          "No HMS modules are currently available.",
        );

        return false;
      }

      if (selectedModules.length === 0) {
        setFormError(
          "Please select at least one HMS module.",
        );

        return false;
      }
    }

    if (currentStep === 4) {
      if (
        !formData.adminName.trim() ||
        !formData.adminEmail.trim() ||
        !formData.adminPhone.trim()
      ) {
        setFormError(
          "Please complete the hospital admin information.",
        );

        return false;
      }

      const emailError = validateEmail(
        formData.adminEmail,
      );

      if (emailError) {
        setFormError(
          `Hospital admin: ${emailError}`,
        );

        return false;
      }

      const phoneError = validateMobile(
        formData.adminPhone,
      );

      if (phoneError) {
        setFormError(
          `Hospital admin: ${phoneError}`,
        );

        return false;
      }

      /*
       * Password is required only during creation.
       */
      if (mode === "create") {
        if (formData.password.length < 8) {
          setFormError(
            "Password must be at least 8 characters.",
          );

          return false;
        }

        if (
          formData.password !==
          formData.confirmPassword
        ) {
          setFormError(
            "Password and confirm password do not match.",
          );

          return false;
        }
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((step) =>
      Math.min(
        step + 1,
        steps.length - 1,
      ),
    );
  };

  const previousStep = () => {
    setFormError(null);

    setCurrentStep((step) =>
      Math.max(step - 1, 0),
    );
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setFormError(null);

    /*
     * Validate the final step before submitting.
     */
    if (!validateCurrentStep()) {
      return;
    }

    try {
      await onSubmit(
        formData,
        selectedDepartments,
        selectedModules,
      );

      setSubmitted(true);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : mode === "create"
            ? "Error in creating hospital!"
            : "Error in updating hospital!",
      );
    }
  };

  const submitErrorMessage: string =
    submitError instanceof Error
      ? submitError.message
      : typeof submitError === "string"
        ? submitError
        : mode === "create"
          ? "Unable to register hospital. Please try again."
          : "Unable to update hospital. Please try again.";

  const hasSubmitError =
    submitError !== undefined &&
    submitError !== null;

  const currentStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Name

              <input
                value={formData.hospitalName}
                onChange={(event) =>
                  handleFieldChange(
                    "hospitalName",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Code

              <input
                value={formData.code}
                onChange={(event) =>
                  handleFieldChange(
                    "code",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Type

              <select
                value={formData.type}
                onChange={(event) =>
                  handleFieldChange(
                    "type",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              >
                <option>Multi-Speciality</option>
                <option>General Hospital</option>
                <option>Teaching Hospital</option>
                <option>Speciality Clinic</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Registration Number

              <input
                value={formData.registrationNumber}
                onChange={(event) =>
                  handleFieldChange(
                    "registrationNumber",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              License Number

              <input
                value={formData.licenseNumber}
                onChange={(event) =>
                  handleFieldChange(
                    "licenseNumber",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Email

              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  handleFieldChange(
                    "email",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Phone

              <input
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={(event) =>
                  handleFieldChange(
                    "phone",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Website

              <input
                type="url"
                value={formData.website}
                onChange={(event) =>
                  handleFieldChange(
                    "website",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>
          </div>
        );

      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              Address

              <input
                value={formData.address}
                onChange={(event) =>
                  handleFieldChange(
                    "address",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Country

              <select
                value={formData.country}
                onChange={(event) =>
                  handleFieldChange(
                    "country",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              >
                <option>India</option>
                <option>United Arab Emirates</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              State

              <input
                value={formData.state}
                onChange={(event) =>
                  handleFieldChange(
                    "state",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              City

              <input
                value={formData.city}
                onChange={(event) =>
                  handleFieldChange(
                    "city",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Postal Code

              <input
                value={formData.postalCode}
                onChange={(event) =>
                  handleFieldChange(
                    "postalCode",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Person Name

              <input
                value={formData.contactName}
                onChange={(event) =>
                  handleFieldChange(
                    "contactName",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Designation

              <input
                value={formData.designation}
                onChange={(event) =>
                  handleFieldChange(
                    "designation",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Email

              <input
                type="email"
                value={formData.contactEmail}
                onChange={(event) =>
                  handleFieldChange(
                    "contactEmail",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Contact Phone

              <input
                type="tel"
                inputMode="numeric"
                value={formData.contactPhone}
                onChange={(event) =>
                  handleFieldChange(
                    "contactPhone",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {departmentsLoading && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Loading departments...
              </div>
            )}

            {departmentsError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <p className="font-semibold">
                  Unable to load departments
                </p>

                <p className="mt-1">
                  {departmentsError instanceof Error
                    ? departmentsError.message
                    : "Unable to load departments. Please try again."}
                </p>
              </div>
            )}

            {!departmentsLoading &&
              !departmentsError &&
              departments.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  No departments are currently available.
                </div>
              )}

            {!departmentsLoading &&
              !departmentsError &&
              departments.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {departments.map((department) => (
                    <label
                      key={department.id}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(
                          department.id,
                        )}
                        onChange={() =>
                          toggleDepartment(
                            department.id,
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />

                      <span>
                        {department.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {modulesLoading && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Loading HMS modules...
              </div>
            )}

            {modulesError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <p className="font-semibold">
                  Unable to load HMS modules
                </p>

                <p className="mt-1">
                  {modulesError instanceof Error
                    ? modulesError.message
                    : "Unable to load HMS modules. Please try again."}
                </p>
              </div>
            )}

            {!modulesLoading &&
              !modulesError &&
              (!data || data.length === 0) && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  No HMS modules are currently available.
                </div>
              )}

            {!modulesLoading &&
              !modulesError &&
              data &&
              data.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {data.map((module) => (
                    <label
                      key={module.id}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedModules.includes(
                          module.id,
                        )}
                        onChange={() =>
                          toggleModule(module.id)
                        }
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />

                      <div>
                        <p className="font-medium text-slate-900">
                          {module.name}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {module.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
          </div>
        );

      case 4:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hospital Admin Name

              <input
                value={formData.adminName}
                onChange={(event) =>
                  handleFieldChange(
                    "adminName",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Admin Email

              <input
                type="email"
                value={formData.adminEmail}
                onChange={(event) =>
                  handleFieldChange(
                    "adminEmail",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Admin Phone

              <input
                type="tel"
                inputMode="numeric"
                value={formData.adminPhone}
                onChange={(event) =>
                  handleFieldChange(
                    "adminPhone",
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </label>

            {mode === "create" && (
              <>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Password

                  <input
                    type="password"
                    value={formData.password}
                    onChange={(event) =>
                      handleFieldChange(
                        "password",
                        event.target.value,
                      )
                    }
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Confirm Password

                  <input
                    type="password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={(event) =>
                      handleFieldChange(
                        "confirmPassword",
                        event.target.value,
                      )
                    }
                    required
                    minLength={8}
                    className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:bg-white ${
                      formData.confirmPassword &&
                      formData.password !==
                        formData.confirmPassword
                        ? "border-red-300 focus:border-red-400"
                        : "border-slate-200 focus:border-emerald-400"
                    }`}
                  />

                  {formData.confirmPassword &&
                    formData.password !==
                      formData.confirmPassword && (
                      <p className="text-xs font-medium text-red-600">
                        Passwords do not match.
                      </p>
                    )}
                </label>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-slate-500">
                Hospital
              </span>

              <strong className="text-slate-900">
                {formData.hospitalName}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-slate-500">
                Code
              </span>

              <strong className="text-slate-900">
                {formData.code}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-slate-500">
                Departments
              </span>

              <strong className="text-slate-900">
                {selectedDepartments.length} enabled
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-slate-500">
                Modules
              </span>

              <strong className="text-slate-900">
                {selectedModules.length} enabled
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-slate-500">
                Hospital Admin
              </span>

              <strong className="text-slate-900">
                {formData.adminName}
              </strong>
            </div>
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
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
              {mode === "create"
                ? "Platform onboarding"
                : "Platform management"}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {title ??
                (mode === "create"
                  ? "Register New Hospital"
                  : "Edit Hospital")}
            </h1>

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          <Link
            href={cancelHref}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700"
          >
            Back to hospitals
          </Link>
        </div>

        {submitted && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />

              <div>
                <h2 className="text-lg font-semibold">
                  {mode === "create"
                    ? "Hospital registered successfully"
                    : "Hospital updated successfully"}
                </h2>

                <p className="text-sm text-emerald-800">
                  {mode === "create"
                    ? "The hospital profile has been created and is currently in review for activation."
                    : "The hospital profile has been updated successfully."}
                </p>
              </div>
            </div>
          </div>
        )}

        {formError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {formError}
          </div>
        )}

        {hasSubmitError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {submitErrorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Hospital onboarding
                  </h2>

                  <p className="text-sm text-slate-500">
                    {steps[currentStep]}
                  </p>
                </div>
              </div>

              <div className="text-right text-sm text-slate-500">
                <p className="font-semibold text-slate-900">
                  Step {currentStep + 1} of{" "}
                  {steps.length}
                </p>

                <p>
                  {Math.round(progress)}% complete
                </p>
              </div>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#176c73] transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={[
                    "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
                    index === currentStep
                      ? "bg-[#176c73] text-white"
                      : index < currentStep
                        ? "bg-[#e7f6f0] text-[#23876d]"
                        : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {step}
                </div>
              ))}
            </div>

            {currentStepContent()}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Link
              href={cancelHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Link>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}

              {canGoNext ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-[7px] bg-[#176c73] px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      {mode === "create"
                        ? "Registering..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />

                      {mode === "create"
                        ? "Activate hospital"
                        : "Save Changes"}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </SuperAdminShell>
  );
}