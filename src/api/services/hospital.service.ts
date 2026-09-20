// hospital.service.ts

import { apiClient } from "@/api/client"
import { CreateHospitalPayload, GetHospitalsParams, HospitalListResponse, HospitalProfileResponse } from "@/types/hospital";
import { ENDPOINTS } from "../endpoints";



export const hospitalService = {

  createHospital: async (
    payload: CreateHospitalPayload,
  ): Promise<HospitalProfileResponse> => {
    return apiClient<HospitalProfileResponse>(
      ENDPOINTS.HOSPITALS.CREATE,
      {
        method: "POST",
        data: payload,
      },
    );
  },

  getHospitals: async (
    params?: GetHospitalsParams,
  ): Promise<HospitalListResponse> => {
    return apiClient<HospitalListResponse>(ENDPOINTS.HOSPITALS.LIST, {
      method: 'GET',
      params,
    });
  },

  viewHospital: async (
    hospitalId: number,
  ): Promise<HospitalProfileResponse> => {
    return apiClient<HospitalProfileResponse>(
      ENDPOINTS.HOSPITALS.DETAIL(hospitalId),
      {
        method: "GET",
      },
    );
  },

};