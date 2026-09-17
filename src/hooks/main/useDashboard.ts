"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/api/services/dashboard.service";
import { queryKeys } from "@/api/query-keys";

export function useDashboard() {
  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard.overview,
    queryFn: dashboardService.getDashboard,

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