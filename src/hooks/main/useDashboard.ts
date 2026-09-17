"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/api/services/dashboard.service";
import { queryKeys } from "@/api/query-keys";

export function useDashboard(
  params: {
    months?: number;
    limit?: number;
  } = {
    months: 12,
    limit: 10,
  },
) {
  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard.summary(params),

    queryFn: () => dashboardService.getSummary(params),

    staleTime: 30 * 1000,

    retry: 1,

    refetchOnWindowFocus: true,
  });

  return {
    data: dashboardQuery.data?.data,

    isLoading: dashboardQuery.isLoading,
    isFetching: dashboardQuery.isFetching,

    error: dashboardQuery.error,

    refetch: dashboardQuery.refetch,
  };
}