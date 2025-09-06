import React from "react";

 function SudarshanChakra({
    w=600,
  size = 450,
  teeth = 48,
  speed = 10,
  className = "",
}) {
  const center = 256;
  const outerR = 220;
  const innerR = 140;
  const hubR = 46;
  const petalCount = 8;

  const teethElements = Array.from({ length: teeth }).map((_, i) => {
    const angle = (360 / teeth) * i;
    return (
      <rect
        key={`t-${i}`}
        x={center - 6}
        y={center - outerR}
        width={12}
        height={56}
        rx={3}
        transform={`rotate(${angle} ${center} ${center}) translate(0,-28)`}
        fill="url(#goldGrad)"
        stroke="#4b2f10"
        strokeWidth="1"
        opacity="0.99"
      />
    );
  });

  const petalElements = Array.from({ length: petalCount }).map((_, i) => {
    const angle = (360 / petalCount) * i;
    const petalPath =
      "M256 116 C290 116, 338 140, 338 196 C338 240, 300 260, 256 260 C212 260, 174 240, 174 196 C174 140, 222 116, 256 116 Z";
    return (
      <g key={`p-${i}`} transform={`rotate(${angle} ${center} ${center})`}>
        <path
          d={petalPath}
          fill="url(#lotusGrad)"
          opacity="0.98"
          stroke="#3b2b20"
          strokeWidth="1.2"
          className="petal"
        />
      </g>
    );
  });

  const serrations = Array.from({ length: teeth * 2 }).map((_, i) => {
    const angle = (360 / (teeth * 2)) * i;
    return (
      <rect
        key={`s-${i}`}
        x={center - 2}
        y={center - outerR - 12}
        width={4}
        height={20}
        rx={2}
        transform={`rotate(${angle} ${center} ${center})`}
        fill="rgba(255,238,170,0.95)"
        opacity={0.78}
      />
    );
  });

  const outerSpin = (speed * 1.5).toFixed(2);
  const innerSpin = Math.max(3, (speed * 0.5)).toFixed(2);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        minHeight: "100vh",
        background:
          "black",
      }}
    >
      <style>{`
        @keyframes spinChakra { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinChakraReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes slowPulse { 0% { filter: drop-shadow(0 0 6px rgba(255, 200, 60, 0.5)); } 50% { filter: drop-shadow(0 0 34px rgba(255, 200, 60, 0.95)); } 100% { filter: drop-shadow(0 0 6px rgba(255, 200, 60, 0.5)); } }
        @keyframes petalSway { 0% { transform: rotate(0deg); } 50% { transform: rotate(2deg); } 100% { transform: rotate(0deg); } }

        .chakra-rotate { transform-box: fill-box; transform-origin: 50% 50%; animation: spinChakra ${speed}s linear infinite; }
        .outer-rotate { transform-box: fill-box; transform-origin: 50% 50%; animation: spinChakraReverse ${outerSpin}s linear infinite; }
        .inner-rotate { transform-box: fill-box; transform-origin: 50% 50%; animation: spinChakra ${innerSpin}s linear infinite; }
        .chakra-glow { animation: slowPulse 3.6s ease-in-out infinite; }
        .petal { transform-box: fill-box; transform-origin: 50% 50%; animation: petalSway 6s ease-in-out infinite; }
      `}</style>

      <svg
        viewBox="0 0 512 512"
        width={w}
        height={size}
        role="img"
        aria-label="Sudarshan Chakra - rotating"
        className="chakra-glow"
      >
        <defs>
          <radialGradient id="goldGrad" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff8e6" />
            <stop offset="25%" stopColor="#ffdf91" />
            <stop offset="55%" stopColor="#e0b14a" />
            <stop offset="100%" stopColor="#7a4f10" />
          </radialGradient>

          <linearGradient id="lotusGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#fff3d6" />
            <stop offset="45%" stopColor="#ffd27a" />
            <stop offset="100%" stopColor="#c98e2b" />
          </linearGradient>

          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="innerShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feOffset dx="0" dy="6" in="SourceAlpha" result="off" />
            <feGaussianBlur stdDeviation="6" in="off" result="blur" />
            <feComposite in="blur" in2="SourceAlpha" operator="out" result="comp" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6" />
            <feBlend in="SourceGraphic" in2="comp" mode="normal" />
          </filter>
        </defs>

        <g className="outer-rotate">
          <g filter="url(#softGlow)">
            <circle cx={center} cy={center} r={outerR + 28} fill="rgba(20,35,70,0.04)" />
            <circle cx={center} cy={center} r={outerR + 54} fill="rgba(255,200,60,0.03)" />
          </g>

          <g>{petalElements}</g>

          <g>
            <circle
              cx={center}
              cy={center}
              r={outerR}
              fill="url(#goldGrad)"
              stroke="#4b2f10"
              strokeWidth="6"
              opacity="0.995"
              filter="url(#innerShadow)"
            />
            <circle
              cx={center}
              cy={center}
              r={outerR - 18}
              fill="none"
              stroke="#f7e3a8"
              strokeWidth="2"
              opacity="0.92"
            />
          </g>

          <g opacity="0.95">{serrations}</g>

          <g>{teethElements}</g>

          <g opacity="0.18">
            {Array.from({ length: 18 }).map((_, i) => {
              const a = (360 / 18) * i;
              const long = outerR + 16;
              const short = outerR + 46;
              return (
                <path
                  key={`flame-${i}`}
                  d={`M ${center} ${center - long} C ${center + 8} ${center - long - 10}, ${center + 8} ${center - short + 10}, ${center} ${center - short}`}
                  transform={`rotate(${a} ${center} ${center})`}
                  fill="none"
                  stroke="#ffd86b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </g>
        </g>

        <g className="inner-rotate">
          <g>
            <circle
              cx={center}
              cy={center}
              r={innerR + 6}
              fill="none"
              stroke="#4a2e12"
              strokeWidth="6"
              opacity="0.85"
            />
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (360 / 24) * i;
              return (
                <rect
                  key={`etch-${i}`}
                  x={center - 2}
                  y={center - (innerR + 6)}
                  width={4}
                  height={28}
                  rx={2}
                  transform={`rotate(${a} ${center} ${center})`}
                  fill="#e6c27a"
                  opacity="0.95"
                />
              );
            })}
          </g>

          <g>
            <circle cx={center} cy={center} r={hubR + 6} fill="url(#goldGrad)" stroke="#3b2716" strokeWidth="4" />
            <circle cx={center} cy={center} r={hubR - 10} fill="#112b46" opacity="0.98" />
            <circle cx={center} cy={center} r={10} fill="#ffd86b" />
          </g>
        </g>

        <g>
          <circle cx={center} cy={center} r={outerR + 10} fill="none" stroke="rgba(255,215,120,0.06)" strokeWidth="22" />
          <circle cx={center} cy={center} r={outerR + 50} fill="none" stroke="rgba(60,110,200,0.03)" strokeWidth="80" />
        </g>
      </svg>

      <div className="sr-only">Sudarshan Chakra: rotating divine disc with lotus motif</div>
    </div>
  );
}
export default SudarshanChakra
