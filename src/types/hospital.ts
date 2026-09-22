export type HospitalApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type Hospital = {
  id: number;
  name: string;
  code: string;
  hospital_type: string | null;
  registration_no: string | null;
  license_number: string | null;
  email: string | null;
  phone: string | null;
  website_url: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  status: string;
  contact_person_name: string | null;
  contact_person_designation: string | null;
  contact_person_phone: string | null;
  contact_person_email: string | null;
  logo: string;
  departments: string[] | null;
  hms_modules: string[] | null;
  departments_count: number;
  admin_name: string | null;
  admin_email: string | null;
  admin_phone: string | null;
  is_active: boolean;
  approval_status: HospitalApprovalStatus;
  created_at: string;
  updated_at: string;
};

export type FilterOption = {
  id: number;
  label: string;
};

export type HospitalStat = {
  label: string;
  value: number;
  detail: string;
  icon: string;
  tone: string;
};

export type HospitalPagination = {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

/**
 * Actual API response:
 *
 * {
 *   success: true,
 *   message: "...",
 *   data: {
 *     hospitals: [],
 *     cities: [],
 *     statuses: [],
 *     StatsData: []
 *   }
 * }
 */
export type HospitalListData = {
  hospitals: Hospital[];
  statuses: FilterOption[];
  cities: FilterOption[];
  StatsData: HospitalStat[];
  pagination: HospitalPagination;
};

export type HospitalListResponse = {
  success: boolean;
  message: string;
  data: HospitalListData;
};

export type HospitalFilters = {
  city: string;
  status: "" | "active" | "inactive";
};

export type HospitalTableProps = {
  hospitals: HospitalListData;
  filters: HospitalFilters;
  search: string;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStatusChange: (value: "" | "active" | "inactive") => void;
  onReset: () => void;
};

export type GetHospitalsParams = {
  search?: string;
  city?: string;
  status?: "active" | "inactive";
  page?: number;
  page_size?: number;
};

export type HospitalProfileResponse = {
  success: boolean;
  message: string;
  data: Hospital;
};

export type CreateHospitalPayload = {
  name: string;
  code: string;
  hospital_type: string;
  registration_no: string;
  license_number: string;
  email: string;
  phone: string;
  website_url: string;
  password: string;

  address: string;
  country: string;
  city: string;
  state: string;
  postal_code: string;

  contact_person_name: string;
  contact_person_designation: string;
  contact_person_phone: string;
  contact_person_email: string;

  department_ids: number[];
  hms_modules: number[];

  admin_name: string;
  admin_email: string;
  admin_phone: string;
};

export type UpdateHospitalPayload = Omit<
  CreateHospitalPayload,
  "password"
> & {
  password?: string;
};