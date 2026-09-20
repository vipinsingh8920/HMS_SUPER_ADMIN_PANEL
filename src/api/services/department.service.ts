// hospital.service.ts

import { apiClient } from "@/api/client"
import { ENDPOINTS } from "../endpoints";
import { DepartmentListResponse, GetDepartmentsParams } from "@/types/department";



export const departmentService = {

//   createDepartment: async (
//     payload: CreateHospitalPayload,
//   ): Promise<HospitalProfileResponse> => {
//     return apiClient<HospitalProfileResponse>(
//       ENDPOINTS.HOSPITALS.CREATE,
//       {
//         method: "POST",
//         data: payload,
//       },
//     );
//   },

  getDepartments: async (
    params?: GetDepartmentsParams,
  ): Promise<DepartmentListResponse> => {
    return apiClient<DepartmentListResponse>(ENDPOINTS.DEPARTMENTS.LIST, {
      method: 'GET',
      params,
    });
  },

//   viewDepartment: async (
//     departmentId: number,
//   ): Promise<HospitalProfileResponse> => {
//     return apiClient<HospitalProfileResponse>(
//       ENDPOINTS.HOSPITALS.DETAIL(departmentId),
//       {
//         method: "GET",
//       },
//     );
//   },

};