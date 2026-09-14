import type { DepartmentStatus } from "@/types/super-admin";

const departmentStatusClasses: Record<DepartmentStatus, string> = {
  ACTIVE: "bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]",
  DISABLED: "bg-[#f3f7f6] text-[#71878d] ring-1 ring-[#dfeae8]",
};

export function DepartmentStatusBadge({ status }: { status: DepartmentStatus }) {
  return (
    <span className={["inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide", departmentStatusClasses[status]].join(" ")}>
      {status}
    </span>
  );
}
