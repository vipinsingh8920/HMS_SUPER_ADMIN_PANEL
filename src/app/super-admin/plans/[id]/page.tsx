import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CreditCard, Pencil, ShieldCheck, Users } from "lucide-react";
import { hospitalSubscriptions, subscriptionPlans } from "@/mock/super-admin/subscriptions";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";

export default async function PlanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = subscriptionPlans.find((item) => item.id === id);
  if (!plan) notFound();
  const subscribers = hospitalSubscriptions.filter((item) => item.currentPlan === plan.name);
  const activeSubscribers = subscribers.filter((item) => item.status === "ACTIVE").length;

  return (
    <SuperAdminShell>
      <div className="space-y-6">
        <Link href="/super-admin/plans" className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to plans</Link>
        <div className="overflow-hidden rounded-[14px] border border-[#dfeae8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"><div className="h-2 bg-gradient-to-r from-[#176c73] via-[#25a7a0] to-[#7aafd0]" /><div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8f5f3] text-[#176c73]"><CreditCard className="h-6 w-6" /></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Subscription plan</p><h1 className="mt-2 text-2xl font-bold text-[#18343d]">{plan.name}</h1><p className="mt-1 text-sm text-[#71878d]">{plan.description}</p></div></div><Link href={`/super-admin/plans/${plan.id}/edit`} className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#176c73] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(14,143,145,0.15)] hover:bg-[#123f47]"><Pencil className="h-4 w-4" /> Edit plan</Link></div></div>

        <div className="grid gap-4 md:grid-cols-3"><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><CreditCard className="h-5 w-5 text-[#176c73]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Monthly price</p><p className="mt-1 text-3xl font-bold text-[#18343d]">{plan.monthlyPrice}</p></div><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><Users className="h-5 w-5 text-[#3978a5]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Subscribers</p><p className="mt-1 text-3xl font-bold text-[#18343d]">{subscribers.length}</p><p className="mt-1 text-xs text-[#8ca0a6]">{activeSubscribers} active subscriptions</p></div><div className="rounded-[10px] border border-[#dfeae8] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><ShieldCheck className="h-5 w-5 text-[#b47629]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#8ca0a6]">Included modules</p><p className="mt-1 text-3xl font-bold text-[#18343d]">{plan.enabledModules.length}</p><p className="mt-1 text-xs text-[#8ca0a6]">Platform entitlements</p></div></div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]"><div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><div className="mb-5 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5f0] text-[#176c73]"><CheckCircle2 className="h-4 w-4" /></div><div><h2 className="text-lg font-bold text-[#18343d]">Included modules</h2><p className="mt-1 text-xs text-[#8ca0a6]">Features enabled for hospitals on this plan.</p></div></div><div className="flex flex-wrap gap-2">{plan.enabledModules.map((module) => <span key={module} className="rounded-full bg-[#eaf5f2] px-3 py-1.5 text-xs font-semibold text-[#176c73] ring-1 ring-[#cfe9e2]">{module}</span>)}</div></div><div className="rounded-[12px] border border-[#dfeae8] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"><h2 className="text-lg font-bold text-[#18343d]">Subscribed hospitals</h2><div className="mt-5 space-y-3">{subscribers.length ? subscribers.map((item) => <div key={item.hospitalId} className="flex items-center justify-between rounded-lg bg-[#f8fbfa] p-3 text-sm"><span className="font-semibold text-[#536b75]">{item.hospitalId}</span><span className="text-xs font-bold uppercase text-[#8ca0a6]">{item.status}</span></div>) : <p className="text-sm text-[#8ca0a6]">No hospitals are subscribed to this plan yet.</p>}</div></div></div>
      </div>
    </SuperAdminShell>
  );
}
