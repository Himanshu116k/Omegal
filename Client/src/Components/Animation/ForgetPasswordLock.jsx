import React from "react";
import { Shield } from "lucide-react";

export default function ForgotPasswordLock() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-stone-950 to-black w-full">
      {/* Royal Shield Seal */}
      <div className="relative w-80 h-80 rounded-full flex items-center justify-center overflow-hidden">
        {/* Outer animated protective aura */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fbbf24,transparent_30%,#fbbf24,transparent_65%)] animate-[spin_7s_linear_infinite] blur-md opacity-80" />
        <div className="absolute inset-2 rounded-full bg-[conic-gradient(from_180deg,goldenrod,transparent_25%,goldenrod,transparent_75%)] animate-[spin_12s_linear_infinite_reverse] blur-sm opacity-70" />
        <div className="absolute inset-4 rounded-full border-4 border-yellow-600/40 shadow-[0_0_70px_rgba(255,215,0,0.7)]" />

        {/* Ancient engravings */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,215,0,0.12)_0deg,transparent_15deg,rgba(255,215,0,0.12)_30deg,transparent_45deg,rgba(255,215,0,0.12)_60deg,transparent_75deg,rgba(255,215,0,0.12)_90deg,transparent_105deg,rgba(255,215,0,0.12)_120deg,transparent_135deg,rgba(255,215,0,0.12)_150deg,transparent_165deg,rgba(255,215,0,0.12)_180deg,transparent_195deg,rgba(255,215,0,0.12)_210deg,transparent_225deg,rgba(255,215,0,0.12)_240deg,transparent_255deg,rgba(255,215,0,0.12)_270deg,transparent_285deg,rgba(255,215,0,0.12)_300deg,transparent_315deg,rgba(255,215,0,0.12)_330deg,transparent_345deg,rgba(255,215,0,0.12)_360deg)] animate-[spin_50s_linear_infinite]" />

        {/* Center Shield Icon */}
        <div className="relative z-10 p-8 rounded-full bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800 shadow-[0_0_80px_rgba(255,215,0,1)] animate-pulse">
          <Shield className="w-16 h-16 text-black drop-shadow-[0_0_25px_rgba(255,215,0,1)]" />
        </div>
      </div>
    </div>
  );
}
