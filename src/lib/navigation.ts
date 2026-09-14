import {
  Activity,
  Building2,
  CreditCard,
  FolderCog,
  LayoutDashboard,
  Bell,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  description?: string;
};

export const superAdminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
  { label: "Hospitals", href: "/super-admin/hospitals", icon: Building2 },
  { label: "Departments", href: "/super-admin/departments", icon: FolderCog },
  { label: "Notifications", href: "/super-admin/notifications", icon: Bell },
  { label: "Activity", href: "/super-admin/activity", icon: Activity },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

export const userMenuItems = [
  { label: "Profile", href: "/super-admin/profile" },
  { label: "Settings", href: "/super-admin/settings" },
  { label: "Platform Billing", href: "/super-admin/settings", icon: CreditCard },
];
