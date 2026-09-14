export type HospitalStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type DepartmentStatus = "ACTIVE" | "DISABLED";
export type NotificationCategory =
  | "hospital"
  | "department"
  | "system"
  | "profile"
  | "security";

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
  id: string;
  dateTime: string;
  action: string;
  entity: string;
  entityId: string;
  performedBy: string;
  status: "SUCCESS" | "INFO" | "WARNING" | "ERROR";
};

export type PlatformStat = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: string;
};
