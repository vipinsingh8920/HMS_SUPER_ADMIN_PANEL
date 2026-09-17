import type { PlatformActivity, PlatformStat } from "@/types/super-admin";
import { initialHospitals, hospitalDepartmentMatrix } from "@/mock/super-admin/hospitals";
import { platformDepartments } from "@/mock/super-admin/departments";

export const dashboardStats: PlatformStat[] = [
  { title: "Total Hospitals", value: "128", change: "+12.4%", description: "vs last month", icon: "Building2" },
  { title: "Active Hospitals", value: "112", change: "87.5%", description: "of total", icon: "ShieldCheck" },
  { title: "Inactive Hospitals", value: "10", change: "-2.1%", description: "needs review", icon: "Ban" },
  { title: "Pending Approval", value: "6", change: "+1", description: "awaiting review", icon: "Clock3" },
  { title: "New Hospitals This Month", value: "18", change: "+4.8%", description: "this month", icon: "TrendingUp" },
  { title: "Total Enabled Departments", value: "16", change: "+2", description: "platform catalog", icon: "FolderCog" },
];

export const hospitalGrowthData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 16 },
  { month: "Mar", value: 20 },
  { month: "Apr", value: 24 },
  { month: "May", value: 31 },
  { month: "Jun", value: 39 },
  { month: "Jul", value: 45 },
  { month: "Aug", value: 52 },
  { month: "Sep", value: 58 },
];

export const statusDistribution = [
  { name: "Active", value: 112, fill: "#0f766e" },
  { name: "Inactive", value: 10, fill: "#f59e0b" },
  { name: "Pending", value: 6, fill: "#3b82f6" },
];

export const departmentAdoption = platformDepartments.map((department) => ({
  name: department.name,
  hospitals: Math.max(20, Math.round(department.hospitalsUsing / 2)),
}));

export const recentHospitals = initialHospitals.slice(0, 5).map((hospital) => ({
  ...hospital,
  enabledCount: hospital.enabledDepartmentIds.length,
}));



export const hospitalDepartmentSummary = Object.entries(hospitalDepartmentMatrix).map(
  ([hospitalId, departments]) => ({
    hospitalId,
    enabled: departments.filter((department) => department.enabled).length,
    total: departments.length,
  })
);
