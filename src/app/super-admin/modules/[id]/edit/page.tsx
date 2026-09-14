import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { platformModules } from "@/mock/super-admin/modules";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { ModuleEditForm } from "./ModuleEditForm";

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = platformModules.find((item) => item.id === id);
  if (!module) notFound();

  return (
    <SuperAdminShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href={`/super-admin/modules/${module.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#176c73] hover:text-[#123f47]"><ArrowLeft className="h-4 w-4" /> Back to module</Link>
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176c73]">Platform catalog</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Edit {module.name}</h1><p className="mt-2 text-sm text-[#71878d]">Update the shared module definition used by platform hospitals.</p></div>
        <ModuleEditForm module={module} />
      </div>
    </SuperAdminShell>
  );
}
