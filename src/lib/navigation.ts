import {
  Activity,
  Bell,
  Building2,
  CreditCard,
  FolderCog,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Ticket,
  BarChart3,
  ShieldCheck,
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
  { label: "Modules", href: "/super-admin/modules", icon: Stethoscope },
  { label: "Plans", href: "/super-admin/plans", icon: CreditCard },
  { label: "Notifications", href: "/super-admin/notifications", icon: Bell },
  { label: "Support", href: "/super-admin/support", icon: Ticket },
  { label: "Activity & Audit", href: "/super-admin/activity", icon: Activity },
  { label: "Analytics", href: "/super-admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

export const userMenuItems = [
  { label: "Profile", href: "/super-admin/profile" },
  { label: "Settings", href: "/super-admin/settings" },
  { label: "Platform Service", href: "/super-admin/support", icon: ShieldCheck },
];
