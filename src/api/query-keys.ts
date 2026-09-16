export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
  },
  patients: {
    all: ["patients"] as const,
    list: (filters: Record<string, unknown> = {}) => ["patients", "list", filters] as const,
    detail: (id: string) => ["patients", "detail", id] as const,
  },
  appointments: {
    all: ["appointments"] as const,
    list: (filters: Record<string, unknown> = {}) => ["appointments", "list", filters] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    byPatient: (patientId: string) => ["appointments", "patient", patientId] as const,
  },
};