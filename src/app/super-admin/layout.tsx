import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default function SuperAdminLayout({ children }: LayoutProps<"/super-admin">) {
  return <SuperAdminShell>{children}</SuperAdminShell>;
}