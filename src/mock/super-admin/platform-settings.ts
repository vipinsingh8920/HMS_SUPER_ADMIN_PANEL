import type { PlatformSetting } from "@/types/super-admin";

export const platformSettings: PlatformSetting[] = [
  { key: "platform_name", label: "Platform Name", value: "Appziora HMS", section: "Platform Settings" },
  { key: "support_email", label: "Support Email", value: "support@appziora.health", section: "Platform Settings" },
  { key: "default_timezone", label: "Default Timezone", value: "UTC+05:30", section: "Platform Settings" },
  { key: "default_currency", label: "Default Currency", value: "INR", section: "Platform Settings" },
  { key: "maintenance_mode", label: "Maintenance Mode", value: false, section: "Platform Settings" },
  { key: "email_alerts", label: "Email alerts for hospital registrations", value: true, section: "Notification Settings" },
  { key: "sms_status_updates", label: "SMS updates for hospital status changes", value: true, section: "Notification Settings" },
  { key: "weekly_digest", label: "Weekly platform compliance digest", value: false, section: "Notification Settings" },
  { key: "mfa_required", label: "Two-factor authentication required", value: true, section: "Security Preferences" },
  { key: "session_timeout", label: "Session timeout after inactivity", value: true, section: "Security Preferences" },
  { key: "role_approval", label: "Approval needed for platform role changes", value: true, section: "Security Preferences" },
  { key: "theme", label: "Default theme", value: "Light", section: "Appearance" },
  { key: "compact_density", label: "Compact density", value: false, section: "Appearance" },
];
