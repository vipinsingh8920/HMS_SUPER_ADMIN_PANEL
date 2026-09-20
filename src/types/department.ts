export type DepartmentStatus = "ACTIVE" | "INACTIVE";

export type DepartmentCatalogStatus = "ACTIVE" | "INACTIVE";

export type GetDepartmentsParams = {
  search?: string;
  status?: "active" | "inactive";
  page?: number;
  page_size?: number;
};

export type DepartmentAdoptionReviewStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type Department = {
  id: number;
  code: string;
  name: string;
  category: string;
  description: string;
  status: DepartmentStatus;
  is_active: boolean;
  catalog_status: DepartmentCatalogStatus;
  platform_activity: string;
  added_by_platform: boolean;
  adoption_review_status: DepartmentAdoptionReviewStatus;
  reviewed_by_platform_admin_id: number | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DepartmentPagination = {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

export type DepartmentListResponse = {
  success: boolean;
  message: string;
  data: Department[];
  total_count: number;
  pagination: DepartmentPagination;
};