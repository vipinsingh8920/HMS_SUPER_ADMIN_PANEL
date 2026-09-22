// src/types/module.ts

export type HmsModuleCode =
  | "OP"
  | "IP"
  | "REFERRAL"
  | "EMERGENCY"
  | "ADMISSION"
  | "LAB"
  | "BILLING"
  | "PHARMACY"
  | "PROCUREMENT"
  | "CLINICAL"
  | "APPOINTMENT"
  | "ORDERS"
  | "PATIENT"
  | "OPERATIONS";

export type HmsModule = {
  id: number;
  code: HmsModuleCode;
  name: string;
  description: string;
  is_enabled: boolean;
  is_default: boolean;
};

export type HmsModuleCatalogResponse = {
  success: boolean;
  message: string;
  data: HmsModule[];
};