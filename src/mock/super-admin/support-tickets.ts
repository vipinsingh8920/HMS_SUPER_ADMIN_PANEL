import type { SupportTicket } from "@/types/super-admin";

export const supportTickets: SupportTicket[] = [
  {
    id: "TKT-1042",
    hospital: "Apollo Care Hospital",
    subject: "Need platform access for new onboarding team",
    priority: "HIGH",
    status: "OPEN",
    createdDate: "2026-09-12",
    updatedDate: "2026-09-14",
    description: "The onboarding coordinator needs additional platform access to manage hospital admin setup.",
  },
  {
    id: "TKT-1048",
    hospital: "Sunrise Multispeciality Hospital",
    subject: "Department sync issue after module activation",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdDate: "2026-09-10",
    updatedDate: "2026-09-13",
    description: "The hospital reported that departments were not reflecting correctly after enabling modules.",
  },
  {
    id: "TKT-1053",
    hospital: "CityCare Hospital",
    subject: "Compliance review follow-up",
    priority: "URGENT",
    status: "RESOLVED",
    createdDate: "2026-09-03",
    updatedDate: "2026-09-06",
    description: "Platform access has been reviewed and compliance documents have been verified.",
  },
  {
    id: "TKT-1058",
    hospital: "Aster Wellness Hospital",
    subject: "Billing configuration request",
    priority: "LOW",
    status: "CLOSED",
    createdDate: "2026-08-28",
    updatedDate: "2026-09-01",
    description: "Requested billing module configuration before go-live for finance staff.",
  },
];
