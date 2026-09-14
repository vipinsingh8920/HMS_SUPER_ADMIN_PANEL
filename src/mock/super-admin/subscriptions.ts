import type { HospitalSubscription, SubscriptionPlan } from "@/types/super-admin";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-01",
    name: "STARTER",
    monthlyPrice: "$199",
    description: "For small hospitals with essential platform coverage.",
    enabledModules: ["OPD", "Appointments", "Billing"],
  },
  {
    id: "plan-02",
    name: "PROFESSIONAL",
    monthlyPrice: "$499",
    description: "For growing hospitals requiring stronger operational coverage.",
    enabledModules: ["OPD", "Appointments", "IPD", "Laboratory", "Radiology", "Billing", "Reports"],
  },
  {
    id: "plan-03",
    name: "ENTERPRISE",
    monthlyPrice: "$899",
    description: "For multi-speciality facilities with advanced readiness and custom workflows.",
    enabledModules: ["OPD", "Appointments", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Billing", "Inventory", "Reports", "Insurance / TPA"],
  },
  {
    id: "plan-04",
    name: "CUSTOM",
    monthlyPrice: "Custom",
    description: "Tailored enterprise configuration for complex hospital groups.",
    enabledModules: ["OPD", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "OT", "Blood Bank", "Advanced Reports"],
  },
];

export const hospitalSubscriptions: HospitalSubscription[] = [
  {
    hospitalId: "HOS-001",
    currentPlan: "ENTERPRISE",
    status: "ACTIVE",
    startDate: "2025-01-12",
    renewalDate: "2026-10-12",
    trialStatus: "EXPIRED",
    enabledModules: ["OPD", "Appointments", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Billing", "Reports"],
  },
  {
    hospitalId: "HOS-002",
    currentPlan: "PROFESSIONAL",
    status: "TRIAL",
    startDate: "2026-08-22",
    renewalDate: "2026-09-22",
    trialStatus: "ACTIVE",
    enabledModules: ["OPD", "Appointments", "IPD", "Laboratory", "Billing", "Reports"],
  },
  {
    hospitalId: "HOS-003",
    currentPlan: "STARTER",
    status: "PAST_DUE",
    startDate: "2024-12-17",
    renewalDate: "2026-09-17",
    trialStatus: "EXPIRED",
    enabledModules: ["OPD", "Appointments"],
  },
  {
    hospitalId: "HOS-004",
    currentPlan: "STARTER",
    status: "TRIAL",
    startDate: "2026-08-26",
    renewalDate: "2026-09-26",
    trialStatus: "ACTIVE",
    enabledModules: ["OPD", "Appointments"],
  },
  {
    hospitalId: "HOS-005",
    currentPlan: "ENTERPRISE",
    status: "ACTIVE",
    startDate: "2025-04-14",
    renewalDate: "2026-10-14",
    trialStatus: "EXPIRED",
    enabledModules: ["OPD", "Appointments", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Billing", "Reports"],
  },
  {
    hospitalId: "HOS-006",
    currentPlan: "ENTERPRISE",
    status: "ACTIVE",
    startDate: "2024-09-06",
    renewalDate: "2026-09-30",
    trialStatus: "EXPIRED",
    enabledModules: ["OPD", "Appointments", "IPD", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Billing", "Inventory", "Reports"],
  },
];
