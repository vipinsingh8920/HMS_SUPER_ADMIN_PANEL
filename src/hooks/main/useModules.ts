"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { modulesService } from "@/api/services/modules.service";


export function useModules(
) {
  const modulesQuery = useQuery({
    queryKey: queryKeys.modules.list(),
    queryFn: () => modulesService.getModules(),
    staleTime: 30 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return {
    data: modulesQuery.data?.data,
    isLoading: modulesQuery.isLoading,
    isFetching: modulesQuery.isFetching,
    error: modulesQuery.error,
    refetch: modulesQuery.refetch,
  };
}