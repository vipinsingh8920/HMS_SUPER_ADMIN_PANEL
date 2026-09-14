import type { PlatformHealth } from "@/types/super-admin";

export const platformHealth: PlatformHealth[] = [
  {
    hospitalId: "HOS-001",
    hospitalName: "Apollo Care Hospital",
    platformStatus: "OPERATIONAL",
    lastActivity: "2026-09-14 09:20",
    lastLogin: "2026-09-14 09:10",
    systemStatus: "OPERATIONAL",
  },
  {
    hospitalId: "HOS-002",
    hospitalName: "Sunrise Multispeciality Hospital",
    platformStatus: "DEGRADED",
    lastActivity: "2026-09-13 17:40",
    lastLogin: "2026-09-13 16:55",
    systemStatus: "DEGRADED",
  },
  {
    hospitalId: "HOS-003",
    hospitalName: "CityCare Hospital",
    platformStatus: "MAINTENANCE",
    lastActivity: "2026-09-10 10:05",
    lastLogin: "2026-08-18 15:40",
    systemStatus: "MAINTENANCE",
  },
  {
    hospitalId: "HOS-005",
    hospitalName: "Aster Wellness Hospital",
    platformStatus: "OPERATIONAL",
    lastActivity: "2026-09-13 18:12",
    lastLogin: "2026-09-13 18:05",
    systemStatus: "OPERATIONAL",
  },
];
