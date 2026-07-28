import React from "react";

export function SunflowerSVG({ size = "w-24 h-24 sm:w-32 sm:h-32" }: { size?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${size} filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>
      <defs>
        <linearGradient id="sunPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="45%" stopColor="#FFD54F" />
          <stop offset="85%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>

        <linearGradient id="sunPetalShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="70%" stopColor="#FF8F00" />
          <stop offset="100%" stopColor="#BF360C" />
        </linearGradient>

        <radialGradient id="sunCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B0D06" />
          <stop offset="50%" stopColor="#3E2723" />
          <stop offset="80%" stopColor="#2E1C14" />
          <stop offset="95%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#5D4037" />
        </radialGradient>
      </defs>

      <path d="M100 130 C100 160 95 180 90 200" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
      <path d="M98 150 C80 145 60 155 45 165 C60 170 85 165 96 156" fill="#388E3C" />
      <path d="M102 150 C120 145 140 155 155 165 C140 170 115 165 104 156" fill="#2E7D32" />

      {[...Array(20)].map((_, i) => (
        <path
          key={`outer-${i}`}
          d="M100 10 C93 35 90 60 100 80 C110 60 107 35 100 10 Z"
          fill="url(#sunPetalGrad)"
          transform={`rotate(${i * 18} 100 100)`}
        />
      ))}

      {[...Array(20)].map((_, i) => (
        <path
          key={`inner-${i}`}
          d="M100 22 C95 45 93 65 100 82 C107 65 105 45 100 22 Z"
          fill="url(#sunPetalShadow)"
          transform={`rotate(${i * 18 + 9} 100 100)`}
          opacity="0.92"
        />
      ))}

      <circle cx="100" cy="100" r="34" fill="url(#sunCenterGrad)" />
      <circle cx="100" cy="100" r="32" fill="none" stroke="#D7CCC8" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      <circle cx="100" cy="100" r="24" fill="none" stroke="#A1887F" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />
      <circle cx="100" cy="100" r="14" fill="none" stroke="#5D4037" strokeWidth="2" strokeDasharray="2 2" />
    </svg>
  );
}

export function RoseSVG({ size = "w-20 h-20 sm:w-24 sm:h-24" }: { size?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${size} filter drop-shadow-[0_8px_16px_rgba(225,29,72,0.4)]`}>
      <defs>
        <linearGradient id="roseDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#881337" />
          <stop offset="50%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        <linearGradient id="roseLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="60%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        <radialGradient id="roseCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="40%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#E11D48" />
        </radialGradient>
      </defs>

      <path d="M100 20 C40 20 10 70 30 130 C50 190 150 190 170 130 C190 70 160 20 100 20 Z" fill="url(#roseDarkGrad)" />
      <path d="M100 35 C50 35 25 75 42 120 C58 165 142 165 158 120 C175 75 150 35 100 35 Z" fill="url(#roseLightGrad)" />
      <path d="M100 50 C65 50 45 80 58 112 C70 145 130 145 142 112 C155 80 135 50 100 50 Z" fill="url(#roseDarkGrad)" />
      <path d="M100 68 C80 68 65 90 75 110 C85 130 115 130 125 110 C135 90 120 68 100 68 Z" fill="url(#roseLightGrad)" />
      <path d="M100 82 C88 82 78 95 85 108 C92 120 108 120 115 108 C122 95 112 82 100 82 Z" fill="url(#roseCoreGrad)" />
      <path d="M96 92 C92 95 95 102 100 102 C105 102 108 95 102 91 Z" fill="#FFF1F2" />
    </svg>
  );
}

export function TulipSVG({ size = "w-20 h-20 sm:w-24 sm:h-24" }: { size?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${size} filter drop-shadow-[0_8px_16px_rgba(245,158,11,0.4)]`}>
      <defs>
        <linearGradient id="tulipMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="85%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="tulipBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      <path d="M100 120 C100 150 105 180 110 200" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" />
      <path d="M100 30 C70 30 50 80 70 130 C90 150 110 150 130 130 C150 80 130 30 100 30 Z" fill="url(#tulipBack)" />
      <path d="M95 30 C50 40 40 100 75 140 C100 150 115 135 105 100 C95 65 110 40 95 30 Z" fill="url(#tulipMain)" />
      <path d="M105 30 C150 40 160 100 125 140 C100 150 85 135 95 100 C105 65 90 40 105 30 Z" fill="url(#tulipMain)" />
      <path d="M100 45 C80 60 75 110 100 142 C125 110 120 60 100 45 Z" fill="#FEF08A" opacity="0.85" />
    </svg>
  );
}

export function DaisySVG({ size = "w-18 h-18 sm:w-22 sm:h-22" }: { size?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${size} filter drop-shadow-[0_6px_14px_rgba(255,255,255,0.4)]`}>
      <defs>
        <linearGradient id="daisyPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F3F4F6" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>

        <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {[...Array(16)].map((_, i) => (
        <path
          key={i}
          d="M100 15 C92 40 92 70 100 85 C108 70 108 40 100 15 Z"
          fill="url(#daisyPetal)"
          transform={`rotate(${i * 22.5} 100 100)`}
        />
      ))}

      <circle cx="100" cy="100" r="25" fill="url(#daisyCenter)" />
      <circle cx="100" cy="100" r="22" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="2 3" />
    </svg>
  );
}

export function LavenderSVG({ size = "w-16 h-16 sm:w-20 sm:h-20" }: { size?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`${size} filter drop-shadow-[0_6px_14px_rgba(168,85,247,0.4)]`}>
      <defs>
        <linearGradient id="lavenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
      </defs>

      <path d="M100 200 L100 30" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />

      {[...Array(9)].map((_, i) => (
        <g key={i} transform={`translate(100, ${160 - i * 16})`}>
          <ellipse cx="-12" cy="0" rx="9" ry="6" fill="url(#lavenderGrad)" transform="rotate(-20 -12 0)" />
          <ellipse cx="12" cy="0" rx="9" ry="6" fill="url(#lavenderGrad)" transform="rotate(20 12 0)" />
          <ellipse cx="0" cy="-6" rx="8" ry="5" fill="#E9D5FF" />
        </g>
      ))}
    </svg>
  );
}
