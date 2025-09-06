import React from "react";
import { Key } from "lucide-react";

export default function SignupLock() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-stone-950 to-black w-full">
      {/* Royal Key Seal */}
      <div className="relative w-80 h-80 rounded-full flex items-center justify-center overflow-hidden">
        {/* Multi-layer golden rotating rings */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#facc15,transparent_25%,#facc15,transparent_60%)] animate-[spin_8s_linear_infinite] blur-sm opacity-80" />
        <div className="absolute inset-2 rounded-full bg-[conic-gradient(from_90deg,gold,transparent_20%,gold,transparent_70%)] animate-[spin_14s_linear_infinite_reverse] blur-sm opacity-70" />
        <div className="absolute inset-4 rounded-full border-4 border-yellow-500/40 shadow-[0_0_60px_rgba(255,215,0,0.7)]" />

        {/* Decorative engravings effect */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_20%,transparent_80%)]" />
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,215,0,0.1)_0deg,transparent_20deg,rgba(255,215,0,0.1)_40deg,transparent_60deg,rgba(255,215,0,0.1)_80deg,transparent_100deg,rgba(255,215,0,0.1)_120deg,transparent_140deg,rgba(255,215,0,0.1)_160deg,transparent_180deg,rgba(255,215,0,0.1)_200deg,transparent_220deg,rgba(255,215,0,0.1)_240deg,transparent_260deg,rgba(255,215,0,0.1)_280deg,transparent_300deg,rgba(255,215,0,0.1)_320deg,transparent_340deg,rgba(255,215,0,0.1)_360deg)] animate-[spin_60s_linear_infinite]" />

        {/* Center Golden Key */}
        <div className="relative z-10 p-8 rounded-full bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800 shadow-[0_0_70px_rgba(255,215,0,1)] animate-pulse">
          <Key className="w-16 h-16 text-black drop-shadow-[0_0_20px_rgba(255,215,0,1)]" />
        </div>
      </div>
    </div>
  );
}
