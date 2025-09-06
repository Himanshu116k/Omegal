import React from "react";
import { Lock } from "lucide-react";

export default function LoginLock() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-full">
      {/* Golden Royal Seal */}
      <div className="relative w-72 h-72 rounded-full flex items-center justify-center overflow-hidden">
        {/* Outer animated golden aura */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,gold,transparent_40%,gold,transparent_70%)] animate-[spin_6s_linear_infinite] opacity-80 blur-sm" />
        <div className="absolute inset-1 rounded-full bg-[conic-gradient(from_180deg,#facc15,transparent_30%,#facc15,transparent_70%)] animate-[spin_10s_linear_infinite_reverse] opacity-60 blur-sm" />
        <div className="absolute inset-2 rounded-full border-4 border-yellow-600/40 shadow-[0_0_50px_rgba(255,215,0,0.6)]" />

        {/* Glowing lock emblem */}
        <div className="relative z-10 p-8 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 shadow-[0_0_60px_rgba(255,215,0,1)] animate-pulse">
          <Lock className="w-16 h-16 text-black drop-shadow-[0_0_15px_rgba(255,215,0,1)]" />
        </div>

        {/* Soft radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2),transparent_75%)]" />
      </div>
    </div>
  );
}
