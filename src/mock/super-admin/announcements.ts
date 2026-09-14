import type { PlatformAnnouncement } from "@/types/super-admin";

export const platformAnnouncements: PlatformAnnouncement[] = [
  {
    id: "ANN-001",
    title: "Scheduled Maintenance",
    message: "The HMS platform will undergo maintenance on Sunday from 02:00-04:00 UTC. Hospitals should plan downtime accordingly.",
    audience: "All Hospitals",
    status: "SCHEDULED",
    createdAt: "2026-09-12",
  },
  {
    id: "ANN-002",
    title: "Department Catalog Update",
    message: "The shared department catalog has been refreshed with new specialty definitions for participating hospitals.",
    audience: "Selected Hospitals",
    status: "PUBLISHED",
    createdAt: "2026-09-10",
  },
  {
    id: "ANN-003",
    title: "Platform Compliance Review",
    message: "A standard compliance review is scheduled for the week ahead. Hospitals may need to confirm documentation updates.",
    audience: "All Hospitals",
    status: "DRAFT",
    createdAt: "2026-09-08",
  },
];
