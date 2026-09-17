import { apiClient } from "@/api/client";

export type DashboardResponse = {
  success: boolean;
  message: string;
  data: {
    total_hospitals: number;
    active_hospitals: number;
    inactive_hospitals: number;
    total_departments: number;
    // Add other fields according to your actual backend response
  };
};

export const dashboardService = {
  getDashboard: () =>
    apiClient<DashboardResponse>(
      "/api/v1/super-admin/dashboard",
    ),
};