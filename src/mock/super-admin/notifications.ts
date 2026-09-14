import type { NotificationItem } from "@/types/super-admin";

export const superAdminNotifications: NotificationItem[] = [
  {
    id: "NTF-001",
    title: "New hospital registration",
    message: "Horizon Medical Centre submitted a new registration request and is awaiting platform review.",
    category: "hospital",
    timestamp: "2026-09-14T09:15:00Z",
    read: false,
  },
  {
    id: "NTF-002",
    title: "Hospital activated",
    message: "Aster Wellness Hospital was successfully activated and granted platform access.",
    category: "hospital",
    timestamp: "2026-09-13T17:42:00Z",
    read: false,
  },
  {
    id: "NTF-003",
    title: "Department configuration updated",
    message: "Hospital Apollo Care Hospital enabled Radiology, Pathology, and Emergency departments.",
    category: "department",
    timestamp: "2026-09-12T13:18:00Z",
    read: true,
  },
  {
    id: "NTF-004",
    title: "Hospital deactivated",
    message: "CityCare Hospital was deactivated due to compliance review and platform access removal.",
    category: "hospital",
    timestamp: "2026-09-10T10:05:00Z",
    read: true,
  },
  {
    id: "NTF-005",
    title: "System announcement",
    message: "Platform maintenance window scheduled for Saturday 02:00-04:00 UTC.",
    category: "system",
    timestamp: "2026-09-08T15:10:00Z",
    read: true,
  },
  {
    id: "NTF-006",
    title: "Profile updated",
    message: "A hospital profile change was submitted by Sunrise Multispeciality Hospital for review.",
    category: "profile",
    timestamp: "2026-09-07T11:30:00Z",
    read: false,
  },
];
