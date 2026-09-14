import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { subscriptionPlans } from "@/mock/super-admin/subscriptions";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { PlanEditForm } from "./PlanEditForm";

export default async function EditPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = subscriptionPlans.find((item) => item.id === id);
  if (!plan) notFound();

  return <SuperAdminShell><div className="mx-auto max-w-4xl space-y-6"><Link href={`/super-admin/plans/${plan.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to plan</Link><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Subscription console</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Edit {plan.name}</h1><p className="mt-2 text-sm text-[#71878d]">Update pricing, description, and hospital entitlements for this plan.</p></div><PlanEditForm plan={plan} /></div></SuperAdminShell>;
}
