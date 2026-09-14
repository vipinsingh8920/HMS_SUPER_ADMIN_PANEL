import Link from "next/link";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#18343d] lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#123f47] px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=85')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,32,43,0.55)_0%,rgba(18,63,71,0.62)_42%,rgba(9,32,43,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[#25a7a0]/10 mix-blend-screen" />
        <div className="relative">
          <Link href="/login" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#25a7a0] text-sm font-black">A</span>
            <span>
              <span className="block text-sm font-semibold">Appziora HMS</span>
              <span className="block text-[10px] font-bold tracking-[0.14em] text-[#80a8b1]">HOSPITAL OS</span>
            </span>
          </Link>
        </div>
        <div className="relative max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#80e1d1]"><Sparkles className="h-4 w-4" /> The operating layer for care</p>
          <h1 className="max-w-lg text-5xl font-bold leading-[1.02] tracking-tight xl:text-6xl">Make every hospital feel connected.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#c1d9d8]">A focused command center for the people who keep your care network moving.</p>
          <div className="mt-10 flex max-w-md items-center gap-3 border-t border-white/20 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10"><Building2 className="h-4 w-4 text-[#7ee4d1]" /></div>
            <div><p className="text-sm font-semibold">One platform. Every connection.</p><p className="mt-1 text-xs text-[#a9c9c9]">Hospitals, departments, access, and insight.</p></div>
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-4 text-xs text-[#a6c4c5]"><span>Appziora HMS Platform Console</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#80e1d1]" /> Secure workspace access</span></div>
      </section>

      <section className="flex min-h-screen flex-col justify-center px-5 py-6 sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-[430px]">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#25a7a0] text-sm font-black text-white">A</span>
            <span><span className="block text-sm font-semibold">Appziora HMS</span><span className="block text-[10px] font-bold tracking-[0.14em] text-[#71878d]">HOSPITAL OS</span></span>
          </div>
          <div className="mb-7 h-28 overflow-hidden rounded-2xl bg-[#123f47] bg-cover bg-[center_28%] shadow-[0_14px_30px_rgba(18,63,71,0.14)] lg:hidden" style={{ backgroundImage: "linear-gradient(90deg,rgba(18,63,71,0.7),rgba(18,63,71,0.08)),url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80')" }}>
            <div className="flex h-full items-end p-4 text-white"><p className="text-sm font-semibold">Your care network, in focus.</p></div>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
