"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

const FLOWER_QUALITIES = [
  {
    char: "A",
    meaning: "Adored",
    flowerName: "Golden Sunflower",
    flowerType: "sunflower",
    message: "Loved beyond words, cherished beyond measure in every quiet moment of my life.",
  },
  {
    char: "A",
    meaning: "Angelic",
    flowerName: "Velvet Rose",
    flowerType: "rose",
    message: "Your gentle kindness and warm heart bring pure peace and grace into my world.",
  },
  {
    char: "R",
    meaning: "Radiant",
    flowerName: "Sunlit Tulip",
    flowerType: "tulip",
    message: "A glowing warmth that brightens even the darkest, quietest days with your smile.",
  },
  {
    char: "Y",
    meaning: "Youthful",
    flowerName: "Sweet Lavender",
    flowerType: "lavender",
    message: "Your vibrant joy and playful laughter make every day feel like a sweet new adventure.",
  },
  {
    char: "A",
    meaning: "Affectionate",
    flowerName: "Blooming Daisy",
    flowerType: "daisy",
    message: "Your endless love and tender touch create the safest, happiest sanctuary I will ever know.",
  },
];

export default function NameReveal() {
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  const handleFlowerClick = (index: number) => {
    setActiveFlower(index);

    // Sparkle burst with theme colors
    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#ff2a85", "#ffffff", "#ff73b3"],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe catch
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 sm:py-16 px-3 sm:px-6 bg-[#030303] overflow-hidden select-none">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFD700]/10 via-[#ff2a85]/15 to-transparent blur-[150px] pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12 z-10 max-w-lg px-2">
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
          Aarya&apos;s <span className="italic text-[#ff2a85] text-glow">Garden of Qualities</span>
        </h2>
        <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
          Pick a flower to watch it bloom and reveal a heartfelt note 🌸
        </p>
      </div>

      {/* Interactive "Pick a Flower" Grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 z-10 max-w-4xl mb-8 sm:mb-12 px-2">
        {FLOWER_QUALITIES.map((item, index) => {
          const isSelected = activeFlower === index;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleFlowerClick(index)}
              aria-label={`Bloom ${item.flowerName} for letter ${item.char}`}
              className={`relative w-28 xs:w-32 sm:w-36 md:w-40 h-40 xs:h-44 sm:h-48 rounded-2xl p-3 flex flex-col items-center justify-between border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-b from-[#1a1818] via-[#0d0d0d] to-[#141212] border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.4)]"
                  : "bg-white/[0.03] backdrop-blur-md border-white/15 hover:border-[#ff2a85]/50 hover:shadow-[0_0_20px_rgba(255,42,133,0.25)]"
              }`}
            >
              {/* Top Letter Tag */}
              <div className="w-full flex items-center justify-between px-1">
                <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.char}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#FFD700] uppercase tracking-wider opacity-90">
                  {item.meaning}
                </span>
              </div>

              {/* Blooming Ultra-Realistic Vector Flower */}
              <div className="relative my-auto flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isSelected ? 1.25 : [1, 1.05, 1],
                    rotate: isSelected ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{
                    duration: isSelected ? 1 : 4,
                    repeat: isSelected ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="filter drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                >
                  {item.flowerType === "sunflower" && <SunflowerSVG size="w-16 h-16 sm:w-20 sm:h-20" />}
                  {item.flowerType === "rose" && <RoseSVG size="w-14 h-14 sm:w-18 sm:h-18" />}
                  {item.flowerType === "tulip" && <TulipSVG size="w-14 h-14 sm:w-18 sm:h-18" />}
                  {item.flowerType === "lavender" && <LavenderSVG size="w-12 h-12 sm:w-16 sm:h-16" />}
                  {item.flowerType === "daisy" && <DaisySVG size="w-14 h-14 sm:w-18 sm:h-18" />}
                </motion.div>
              </div>

              {/* Bottom Flower Label */}
              <div className="w-full text-center">
                <p className="font-serif italic text-[10px] sm:text-xs text-neutral-300 line-clamp-1">
                  {item.flowerName}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Revealed Message Card */}
      <div className="min-h-[140px] z-10 w-full max-w-lg px-4 text-center">
        <AnimatePresence mode="wait">
          {activeFlower !== null ? (
            <motion.div
              key={activeFlower}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-[#FFD700]">
                <Sparkles className="w-4 h-4 text-[#ff2a85]" />
                <h3 className="font-serif text-base sm:text-xl font-semibold text-white">
                  {FLOWER_QUALITIES[activeFlower].char} is for {FLOWER_QUALITIES[activeFlower].meaning}
                </h3>
                <Sparkles className="w-4 h-4 text-[#ff2a85]" />
              </div>
              <p className="font-serif text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                &ldquo;{FLOWER_QUALITIES[activeFlower].message}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="flex items-center justify-center gap-2 text-neutral-400 font-serif text-xs sm:text-sm italic"
            >
              <Heart className="w-4 h-4 text-[#ff2a85]" />
              <span>Tap a flower above to bloom her garden notes</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}

// --- ULTRA-REALISTIC BOTANICAL SVG FLOWERS ---

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

      {/* Stem & Leaves Base */}
      <path d="M100 130 C100 160 95 180 90 200" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
      <path d="M98 150 C80 145 60 155 45 165 C60 170 85 165 96 156" fill="#388E3C" />
      <path d="M102 150 C120 145 140 155 155 165 C140 170 115 165 104 156" fill="#2E7D32" />

      {/* Outer Layer: 20 Primary Large Petals */}
      {[...Array(20)].map((_, i) => (
        <path
          key={`outer-${i}`}
          d="M100 10 C93 35 90 60 100 80 C110 60 107 35 100 10 Z"
          fill="url(#sunPetalGrad)"
          transform={`rotate(${i * 18} 100 100)`}
        />
      ))}

      {/* Inner Layer: 20 Offset Layered Petals */}
      {[...Array(20)].map((_, i) => (
        <path
          key={`inner-${i}`}
          d="M100 22 C95 45 93 65 100 82 C107 65 105 45 100 22 Z"
          fill="url(#sunPetalShadow)"
          transform={`rotate(${i * 18 + 9} 100 100)`}
          opacity="0.92"
        />
      ))}

      {/* Textured Seed Center */}
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