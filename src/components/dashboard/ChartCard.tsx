import type { ReactNode } from "react";

export function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[10px] border border-[#dfeae8] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[#18343d]">{title}</h3>
          {subtitle && <p className="text-xs text-[#71878d]">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
