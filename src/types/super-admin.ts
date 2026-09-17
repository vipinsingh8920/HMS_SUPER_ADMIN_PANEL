export type HospitalStatus =
  | "DRAFT"
  | "PENDING"
  | "READY"
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "ARCHIVED"
  | "APPROVED"
  | "REJECTED";

export type DepartmentStatus = "ACTIVE" | "INACTIVE" | "DISABLED";
export type HospitalApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";
export type HospitalAdminStatus = "INVITED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
export type ModuleStatus = "ACTIVE" | "DISABLED";
export type SubscriptionStatus = "TRIAL" | "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "EXPIRED";
export type SupportPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type SupportStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type AnnouncementStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "EXPIRED";
export type PlatformHealthStatus = "OPERATIONAL" | "DEGRADED" | "MAINTENANCE" | "OFFLINE";

export type NotificationCategory =
  | "hospital"
  | "department"
  | "module"
  | "subscription"
  | "system"
  | "profile"
  | "security"
  | "announcement";

export type SuperAdmin = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastLogin: string;
  status: "ACTIVE" | "OFFLINE";
};

export type Hospital = {
  id: string;
  name: string;
  code: string;
  type: string;
  registrationNumber: string;
  email: string;
  phone: string;
  website: string;
  status: HospitalStatus;
  registrationDate: string;
  lastUpdated: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  primaryContact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  platformConfig: {
    subscription: string;
    trialPeriod: string;
    notes: string;
  };
  enabledDepartmentIds: string[];
  logo: string;
};

export type Department = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  status: DepartmentStatus;
  createdAt: string;
  hospitalsUsing: number;
};

export type HospitalDepartment = {
  departmentId: string;
  enabled: boolean;
  enabledDate?: string;
  category?: string;
  status?: DepartmentStatus;
};

export type HospitalAdmin = {
  id: string;
  hospitalId: string;
  name: string;
  email: string;
  phone: string;
  status: HospitalAdminStatus;
  invitationStatus: "INVITED" | "ACTIVE" | "EXPIRED";
  lastLogin: string;
  createdDate: string;
};

export type HMSModule = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  status: ModuleStatus;
  createdAt: string;
  hospitalsUsing: number;
};

export type HospitalModule = {
  moduleId: string;
  enabled: boolean;
  enabledDate?: string;
  category?: string;
  status?: ModuleStatus;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
};
export type PlatformActivity = {
  activity: string;
  entity_type: string;
  entity_id: number;
  hospital_id: number;
  hospital_name: string;
  occurred_at: string;
};

export type PlatformStat = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: string;
};

export type SubscriptionPlan = {
  id: string;
  name: "STARTER" | "PROFESSIONAL" | "ENTERPRISE" | "CUSTOM";
  monthlyPrice: string;
  description: string;
  enabledModules: string[];
};

export type HospitalSubscription = {
  hospitalId: string;
  currentPlan: SubscriptionPlan["name"];
  status: SubscriptionStatus;
  startDate: string;
  renewalDate: string;
  trialStatus: "ACTIVE" | "EXPIRED";
  enabledModules: string[];
};

export type PlatformSetting = {
  key: string;
  label: string;
  value: string | boolean;
  section: "Platform Settings" | "Notification Settings" | "Security Preferences" | "Appearance";
};

export type SupportTicket = {
  id: string;
  hospital: string;
  subject: string;
  priority: SupportPriority;
  status: SupportStatus;
  createdDate: string;
  updatedDate: string;
  description?: string;
};

export type PlatformAnnouncement = {
  id: string;
  title: string;
  message: string;
  audience: "All Hospitals" | "Selected Hospitals";
  status: AnnouncementStatus;
  createdAt: string;
};

export type PlatformHealth = {
  hospitalId: string;
  hospitalName: string;
  platformStatus: PlatformHealthStatus;
  lastActivity: string;
  lastLogin: string;
  systemStatus: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE" | "OFFLINE";
};
