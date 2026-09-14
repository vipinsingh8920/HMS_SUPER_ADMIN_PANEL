import type { HospitalStatus } from "@/types/super-admin";

const statusClasses: Record<HospitalStatus, string> = {
  ACTIVE: "bg-[#e7f6f0] text-[#23876d] ring-1 ring-[#bde8df]",
  INACTIVE: "bg-[#fff1d8] text-[#b47629] ring-1 ring-[#f0d39f]",
  PENDING: "bg-[#eaf3fb] text-[#3978a5] ring-1 ring-[#c6dce9]",
  SUSPENDED: "bg-[#fce9e8] text-[#c96968] ring-1 ring-[#e8c2bd]",
};

export function HospitalStatusBadge({ status }: { status: HospitalStatus }) {
  return (
    <span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', statusClasses[status]].join(' ')}>
      {status}
    </span>
  );
}
