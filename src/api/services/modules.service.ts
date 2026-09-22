// modules.service.ts
import { apiClient } from "@/api/client"
import { ENDPOINTS } from "../endpoints";
import { HmsModuleCatalogResponse } from "@/types/modules";

export const modulesService = {
    getModules: async (
    ): Promise<HmsModuleCatalogResponse> => {
        return apiClient<HmsModuleCatalogResponse>(ENDPOINTS.MODULES.LIST, {
            method: 'GET'
        });
    },

};