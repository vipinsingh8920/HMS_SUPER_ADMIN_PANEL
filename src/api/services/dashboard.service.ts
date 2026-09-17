import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints"
import {DashboardSummaryParams, DashboardSummaryResponse} from "@/types/dashboard"


export const dashboardService = {
  getSummary: (params: DashboardSummaryParams = {}) =>
    apiClient<DashboardSummaryResponse>(
      ENDPOINTS.DASHBOARD.OVERVIEW,
      {
        method: "GET",
        params,
      },
    ),
};