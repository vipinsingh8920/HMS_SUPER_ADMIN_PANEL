"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { demoAccount, getAuthRedirectPath, getSession } from "@/lib/auth";
import { useAuth } from "@/hooks/auth/useAuth";
import { ApiError } from "@/api/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoAccount.email);
  const [password, setPassword] = useState(demoAccount.password);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(email);
  const [recoverySubmitted, setRecoverySubmitted] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoggingIn, forgotPassword, isForgotPasswordLoading } = useAuth();

  useEffect(() => {
    if (getSession()) router.replace(getAuthRedirectPath());
  }, [router]);

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    try {
      const res = await login({ email, password });
      console.log(res);
      router.replace(getAuthRedirectPath());
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong",
      );
    }
  };

  const handleForgotPassword = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    try {
      await forgotPassword(recoveryEmail);
      // API succeeded
      setRecoverySubmitted(true);
    } catch (err) {
      console.error("Forgot password failed:", err);
      // API failed
      setRecoverySubmitted(false);
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to send reset link. Please try again."
      );
    }
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
            <Mail className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="owner@company.com" />
          </span>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-[#536b75]">Password
          <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]">
            <LockKeyhole className="h-4 w-4 shrink-0 text-[#8ca0a6]" /><input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="text-[#8ca0a6] hover:text-[#176c73]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </span>
        </label>
        <div className="flex items-center justify-between pt-1 text-xs"><label className="inline-flex items-center gap-2 text-[#71878d]"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c7d8d6] text-[#176c73] focus:ring-[#25a7a0]" /> Keep me signed in</label><button type="button" onClick={() => { setShowForgotPassword(true); setRecoverySubmitted(false); setRecoveryEmail(email); }} className="font-semibold text-[#176c73] hover:text-[#123f47]">Forgot password?</button></div>
        <button type="submit" disabled={isLoggingIn} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(23,108,115,0.2)] transition hover:-translate-y-0.5 hover:bg-[#123f47] disabled:opacity-60 disabled:hover:translate-y-0">
          {isLoggingIn ? "Signing in..." : "Sign in to console"} <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {showForgotPassword && (
        <div className="mt-5 rounded-2xl border border-[#cfe4df] bg-[#f8fbfa] p-5">
          {recoverySubmitted ? (
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#dcefe9] text-[#176c73]">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <h3 className="mt-3 text-base font-bold text-[#18343d]">
                Check your inbox
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#71878d]">
                If an account exists for {recoveryEmail}, we&apos;ll send password
                reset instructions shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#18343d]">
                  Reset your password
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#71878d]">
                  Enter your work email and we&apos;ll send you a reset link.
                </p>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-[#536b75]">
                Work email

                <span className="flex items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3.5 py-3 shadow-sm focus-within:border-[#25a7a0] focus-within:ring-4 focus-within:ring-[#dcefe9]">
                  <Mail className="h-4 w-4 shrink-0 text-[#8ca0a6]" />

                  <input
                    required
                    type="email"
                    value={recoveryEmail}
                    onChange={(event) => setRecoveryEmail(event.target.value)}
                    className="w-full bg-transparent text-sm font-normal text-[#18343d] outline-none"
                    placeholder="owner@company.com"
                  />
                </span>
              </label>

              <button
                type="submit"
                disabled={isForgotPasswordLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#123f47] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isForgotPasswordLoading
                  ? "Sending..."
                  : "Send reset link"}

                {!isForgotPasswordLoading && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(false);
              setRecoverySubmitted(false);
              setError("");
            }}
            className="mt-4 w-full text-center text-xs font-semibold text-[#176c73] hover:text-[#123f47]"
          >
            Back to sign in
          </button>
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dfeae8] bg-white/70 p-3.5 text-xs text-[#71878d]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#20a477]" /><p><span className="font-semibold text-[#536b75]">Demo credentials loaded.</span> This preview uses a temporary owner account until real authentication is connected.</p></div>
    </AuthLayout>
  );
}