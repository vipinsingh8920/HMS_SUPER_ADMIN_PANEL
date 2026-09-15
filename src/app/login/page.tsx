"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { authenticate, demoAccount, getAuthRedirectPath, getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoAccount.email);
  const [password, setPassword] = useState(demoAccount.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getSession()) router.replace(getAuthRedirectPath());
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!authenticate(email, password)) {
      setError("Those credentials do not match an owner account.");
      return;
    }
    router.replace(getAuthRedirectPath());
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#dcefe9] text-[#176c73] shadow-[0_8px_18px_rgba(23,108,115,0.1)]"><ShieldCheck className="h-5 w-5" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176c73]">Owner access</p>
        <h2 className="mt-3 text-[2.45rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#18343d] sm:text-5xl">Welcome back<span className="text-[#25a7a0]">.</span></h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#71878d]">Sign in to keep your hospital network moving with clarity.</p>
      </div>

      {error && <div role="alert" className="mb-5 rounded-xl border border-[#e8c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#a95050]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Work email
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]">
            <Mail className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="owner@company.com" />
          </span>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Password
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]">
            <LockKeyhole className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="text-[#8ca0a6] hover:text-[#176c73]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </span>
        </label>
        <div className="flex items-center justify-between pt-1 text-xs"><label className="inline-flex items-center gap-2 text-[#71878d]"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c7d8d6] text-[#176c73] focus:ring-[#25a7a0]" /> Keep me signed in</label><button type="button" className="font-semibold text-[#176c73] hover:text-[#123f47]">Forgot password?</button></div>
        <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(23,108,115,0.2)] transition hover:-translate-y-0.5 hover:bg-[#123f47]">Sign in to console <ArrowRight className="h-4 w-4" /></button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dfeae8] bg-white/70 p-3.5 text-xs text-[#71878d]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#20a477]" /><p><span className="font-semibold text-[#536b75]">Demo credentials loaded.</span> This preview uses a temporary owner account until real authentication is connected.</p></div>
    </AuthLayout>
  );
}
