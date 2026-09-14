import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

export function StatCard({
  title,
  value,
  change,
  description,
  icon,
  href,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: ReactNode;
  href?: string;
}) {
  const positive = !change.startsWith("-");
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#71878d]">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">{value}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#dcefe9] text-[#176c73]">{icon}</div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className={[
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
          positive ? "bg-[#e7f6f0] text-[#23876d]" : "bg-[#fff1d8] text-[#b47629]",
        ].join(" ")}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {change}
        </div>
        <span className="text-xs text-[#8ca0a6]">{description}</span>
      </div>
    </>
  );

  const className = "block rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-md";

  return href ? <Link href={href} className={className} aria-label={`Open ${title}`}>{content}</Link> : <div className={className}>{content}</div>;
}
