export type DashboardStat = {
  title: string;
  value: number;
  description: string;
  icon: string;
  href:string;
};

export type HospitalGrowth = {
  month: string;
  value: number;
};

export type HospitalStatusDistribution = {
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  value: number;
};

export type DepartmentAdoptionData = {
  department_code: string;
  department_name: string;
  category: string;
  hospitals_count: number;
};

export type DepartmentAdoptionStatusDistribution = {
  status: "APPROVED" | "PENDING" | "REJECTED";
  value: number;
};

export type RecentHospitalRegistration = {
  id: number;
  name: string;
  code: string;
  city: string;
  state: string;
  is_active: boolean;
  approval_status: "APPROVED" | "PENDING" | "REJECTED";
  created_at: string;
};

export type RecentPlatformActivity = {
  activity: string;
  entity_type: string;
  entity_id: number;
  hospital_id: number;
  hospital_name: string;
  department_name?: string;
  occurred_at: string;
};

export type DashboardSummary = {
  dashboardStats: DashboardStat[];

  hospital_growth: HospitalGrowth[];

  hospital_status_distribution: HospitalStatusDistribution[];

  department_adoption_data: DepartmentAdoptionData[];

  department_adoption_status_distribution: DepartmentAdoptionStatusDistribution[];

  recent_hospital_registrations: RecentHospitalRegistration[];

  recent_platform_activities: RecentPlatformActivity[];
};

export type DashboardSummaryParams = {
  months?: number;
  limit?: number;
};

export type DashboardSummaryResponse = {
  success: boolean;
  data: DashboardSummary;
};