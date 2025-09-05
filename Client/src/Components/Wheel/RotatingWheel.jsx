import React from "react";

export default function RotatingWheel() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-[28rem] h-[28rem] animate-[spin_16s_linear_infinite]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 600"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(255,200,100,0.6)]"
        >
          <circle
            cx="300"
            cy="300"
            r="280"
            stroke="url(#agedGold)"
            strokeWidth="22"
            fill="url(#agedWood)"
          />

          {[...Array(32)].map((_, i) => {
            const angle = (i * 11.25 * Math.PI) / 180;
            const x1 = 300 + 260 * Math.cos(angle);
            const y1 = 300 + 260 * Math.sin(angle);
            const x2 = 300 + 80 * Math.cos(angle);
            const y2 = 300 + 80 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#agedGold)"
                strokeWidth="8"
              />
            );
          })}

          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 300 + 190 * Math.cos(angle);
            const y = 300 + 190 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="20"
                fill="url(#agedGold)"
                stroke="#3b2f2f"
                strokeWidth="5"
              />
            );
          })}

          <circle
            cx="300"
            cy="300"
            r="60"
            fill="url(#agedGold)"
            stroke="#3b2f2f"
            strokeWidth="10"
          />

          <circle
            cx="300"
            cy="300"
            r="120"
            stroke="url(#agedGold)"
            strokeWidth="12"
            fill="none"
          />

          <defs>
            <radialGradient id="agedWood" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#deb887" />
              <stop offset="100%" stopColor="#3b2f2f" />
            </radialGradient>
            <linearGradient id="agedGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5deb3" />
              <stop offset="50%" stopColor="#daa520" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
