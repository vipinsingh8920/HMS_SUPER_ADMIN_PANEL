"use client";

import { Activity } from "lucide-react";

type AppzioraLoaderProps = {
  fullScreen?: boolean;
  message?: string;
};

export function AppzioraLoader({
  fullScreen = true,
  message = "Preparing your healthcare workspace...",
}: AppzioraLoaderProps) {
  return (
    <div
      className={[
        "flex items-center justify-center bg-[#f8fbfc]",
        fullScreen ? "fixed inset-0 z-[9999]" : "min-h-[400px] w-full",
      ].join(" ")}
    >
      <div className="flex flex-col items-center">

        {/* Logo animation */}
        <div className="relative flex h-28 w-28 items-center justify-center">

          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-full border border-[#176c73]/20 border-t-[#176c73]" />

          {/* Second rotating ring */}
          <div className="absolute inset-3 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-[#0e8f91]/10 border-b-[#0e8f91]/60" />

          {/* Orbit dots */}
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#176c73] shadow-[0_0_12px_rgba(23,108,115,0.6)]" />

          <span className="absolute bottom-1 left-4 h-2 w-2 rounded-full bg-[#0e8f91]/70" />

          <span className="absolute right-3 top-8 h-1.5 w-1.5 rounded-full bg-[#176c73]/60" />

          {/* Logo container */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(23,108,115,0.15)]">

            {/* Pulse glow */}
            <div className="absolute inset-0 animate-ping rounded-2xl bg-[#176c73]/5" />

            {/* Medical symbol */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#176c73] shadow-[0_6px_18px_rgba(23,108,115,0.3)]">

              <div className="absolute h-6 w-2 rounded-sm bg-white" />

              <div className="absolute h-2 w-6 rounded-sm bg-white" />

            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#18343d]">
            Appziora
            <span className="ml-1 text-[#176c73]">HMS</span>
          </h1>

          <div className="mt-2 flex items-center justify-center gap-2">
            <Activity className="h-3.5 w-3.5 animate-pulse text-[#176c73]" />

            <p className="text-xs font-medium tracking-wide text-slate-400">
              {message}
            </p>
          </div>
        </div>

        {/* Loading progress */}
        <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-[loader_1.6s_ease-in-out_infinite] rounded-full bg-[#176c73]" />
        </div>

        {/* Tagline */}
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
          Smarter Healthcare • Simpler Management
        </p>
      </div>

      <style jsx>{`
        @keyframes loader {
          0% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}