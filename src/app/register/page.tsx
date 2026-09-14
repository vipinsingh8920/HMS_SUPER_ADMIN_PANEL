"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { getAuthRedirectPath, getSession, registerOwner } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getSession()) router.replace(getAuthRedirectPath());
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password.length < 10) {
      setError("Use at least 10 characters for the owner password.");
      return;
    }
    registerOwner(name, email, password);
    router.replace(getAuthRedirectPath());
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#dcefe9] text-[#176c73]"><UserRound className="h-5 w-5" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176c73]">First-time setup</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#18343d]">Create owner access</h2>
        <p className="mt-2 text-sm leading-6 text-[#71878d]">Set up the primary account that controls your Veya platform workspace.</p>
      </div>

      {error && <div role="alert" className="mb-5 rounded-xl border border-[#e8c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#a95050]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Your name
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]"><UserRound className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="Aarav Mehta" /></span>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Owner email
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]"><Mail className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="owner@company.com" /></span>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Create password
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]"><LockKeyhole className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="At least 10 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="text-[#8ca0a6] hover:text-[#176c73]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span>
        </label>
        <div className="space-y-2 text-xs text-[#71878d]"><p className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#20a477]" /> Owner access includes all platform permissions.</p><p className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#20a477]" /> Add team members later from platform settings.</p></div>
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(23,108,115,0.18)] transition hover:bg-[#123f47]">Create owner account <ArrowRight className="h-4 w-4" /></button>
      </form>
      <p className="mt-7 text-center text-sm text-[#71878d]">Already have owner access? <Link href="/login" className="font-bold text-[#176c73] hover:text-[#123f47]">Sign in</Link></p>
    </AuthLayout>
  );
}
