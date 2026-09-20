import { GetHospitalsParams } from "@/types/hospital";

export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
  },

  dashboard: {
    all: ["dashboard"] as const,

    summary: (
      params: {
        months?: number;
        limit?: number;
      } = {},
    ) => ["dashboard", "summary", params] as const,
  },

  hospitals: {
    all: ["hospitals"] as const,

    list: (
      filters: GetHospitalsParams = {},
    ) => ["hospitals", "list", filters] as const,

    detail: (hospitalId: number) =>
      ["hospitals", "detail", hospitalId] as const,
  },

  patients: {
    all: ["patients"] as const,

    list: (
      filters: Record<string, unknown> = {},
    ) => ["patients", "list", filters] as const,

    detail: (id: string) => ["patients", "detail", id] as const,
  },

  appointments: {
    all: ["appointments"] as const,

    list: (
      filters: Record<string, unknown> = {},
    ) => ["appointments", "list", filters] as const,

    detail: (id: string) => ["appointments", "detail", id] as const,

    byPatient: (patientId: string) =>
      ["appointments", "patient", patientId] as const,
  },
  departments: {
    all: ["departments"] as const,
    list: () => ["departments", "list"] as const,
  },
};