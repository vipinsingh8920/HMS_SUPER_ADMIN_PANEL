"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/api/query-keys";
import { hospitalService } from "@/api/services/hospital.service";

import type {
  CreateHospitalPayload,
  GetHospitalsParams,
  UpdateHospitalPayload,
} from "@/types/hospital";

export const useHospitals = (
  params: GetHospitalsParams = {},
  hospitalId?: number,
) => {
  const queryClient = useQueryClient();

  // --------------------------------------------------
  // CREATE HOSPITAL
  // --------------------------------------------------

  const createHospitalMutation = useMutation({
    mutationFn: (payload: CreateHospitalPayload) =>
      hospitalService.createHospital(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.all,
      });
    },
  });

  const updateHospitalMutation = useMutation({
    mutationFn: ({
      hospitalId,
      payload,
    }: {
      hospitalId: number;
      payload: UpdateHospitalPayload;
    }) => hospitalService.updateHospital(hospitalId, payload),

    onSuccess: async (_, { hospitalId }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.all,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.detail(hospitalId),
      });
    },
  });

  // --------------------------------------------------
  // LIST HOSPITALS
  // --------------------------------------------------

  const hospitalsQuery = useQuery({
    queryKey: queryKeys.hospitals.list(params),

    queryFn: () => hospitalService.getHospitals(params),

    staleTime: 30 * 1000,

    retry: 1,

    refetchOnWindowFocus: true,

    placeholderData: keepPreviousData,

    enabled: !hospitalId,
  });

  // --------------------------------------------------
  // VIEW HOSPITAL
  // --------------------------------------------------

  const viewHospitalQuery = useQuery({
    queryKey: queryKeys.hospitals.detail(hospitalId!),

    queryFn: () => hospitalService.viewHospital(hospitalId!),

    staleTime: 30 * 1000,

    retry: 1,

    refetchOnWindowFocus: true,

    enabled: !!hospitalId,
  });

  return {
    // --------------------------------------------------
    // LIST HOSPITALS
    // --------------------------------------------------

    data: hospitalsQuery.data,
    isLoading: hospitalsQuery.isLoading,
    isFetching: hospitalsQuery.isFetching,
    error: hospitalsQuery.error,
    refetch: hospitalsQuery.refetch,

    // --------------------------------------------------
    // VIEW HOSPITAL PROFILE
    // --------------------------------------------------

    hospitalProfile: viewHospitalQuery.data?.data,
    hospitalLoading: viewHospitalQuery.isLoading,
    hospitalFetching: viewHospitalQuery.isFetching,
    hospitalError: viewHospitalQuery.error,
    refetchHospital: viewHospitalQuery.refetch,

    // --------------------------------------------------
    // CREATE HOSPITAL
    // --------------------------------------------------

    createHospital: createHospitalMutation.mutateAsync,
    createHospitalLoading: createHospitalMutation.isPending,
    createHospitalError: createHospitalMutation.error,
    createHospitalData: createHospitalMutation.data,
    createHospitalSuccess: createHospitalMutation.isSuccess,
    resetCreateHospital: createHospitalMutation.reset,

    updateHospital: async (
      hospitalId: number,
      payload: UpdateHospitalPayload,
    ) =>
      updateHospitalMutation.mutateAsync({
        hospitalId,
        payload,
      }),
    updateHospitalLoading: updateHospitalMutation.isPending,
    updateHospitalError: updateHospitalMutation.error,
    updateHospitalData: updateHospitalMutation.data,
    updateHospitalSuccess: updateHospitalMutation.isSuccess,
    resetUpdateHospital: updateHospitalMutation.reset,
  };
};