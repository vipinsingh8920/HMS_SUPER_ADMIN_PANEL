"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api/query-keys";
import { departmentService } from "@/api/services/department.service";

export const useDepartments = () => {
  const departmentsQuery = useQuery({
    queryKey: queryKeys.departments.list(),
    queryFn: () => departmentService.getDepartments(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    departments: departmentsQuery.data?.data ?? [],
    pagination: departmentsQuery.data?.pagination,

    isLoading: departmentsQuery.isLoading,
    isFetching: departmentsQuery.isFetching,

    error: departmentsQuery.error,

    refetch: departmentsQuery.refetch,
  };
};