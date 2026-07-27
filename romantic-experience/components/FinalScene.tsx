"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

// Romantic & floral emojis for floating particles
const ROMANTIC_EMOJIS = [
  "🌻", "❤️", "💖", "💕", "🌹", "🌸", 
  "🌺", "✨", "💫", "🫶", "🥰", "🌼"
];

// SVG Petal Paths
const ROSE_PETAL_PATH = "M12 2C8 2 4 5 4 10c0 5 4 8 8 10 4-2 8-5 8-10 0-5-4-8-8-8z";
const SUNFLOWER_PETAL_PATH = "M12 2c-2.5 0-4.5 4-4.5 9s2 9 4.5 11c2.5-2 4.5-6 4.5-11s-2-9-4.5-9z";

export default function FinalScene() {
  const [hasFlowerClicked, setHasFlowerClicked] = useState(false);

  // Floating background emojis
  const floatingEmojis = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      emoji: ROMANTIC_EMOJIS[i % ROMANTIC_EMOJIS.length],
      left: `${4 + i * 4.8}%`,
      size: `${1.1 + (i % 3) * 0.4}rem`,
      duration: 6 + (i % 4) * 2.2,
      delay: (i % 5) * 0.7,
      drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 12),
      rotation: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 10),
    }));
  }, []);

  // Drifting petals
  const rosePetals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${6 + i * 8}%`,
      scale: 0.6 + (i % 3) * 0.25,
      duration: 8 + (i % 3) * 2.5,
      delay: (i % 4) * 0.8,
      sway: (i % 2 === 0 ? 1 : -1) * (30 + (i % 3) * 15),
      rotate: (i % 2 === 0 ? 1 : -1) * (120 + (i % 3) * 60),
      isSunflowerPetal: i % 2 === 0,
    }));
  }, []);

  // Background stars
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 96}%`,
      top: `${(i * 23) % 92}%`,
      size: `${2 + (i % 3) * 2}px`,
      duration: 2 + (i % 4) * 0.8,
      delay: (i % 6) * 0.4,
    }));
  }, []);

  const handleFlowerClick = () => {
    setHasFlowerClicked(true);
    
    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#ff2a85", "#ffffff", "#ff73b3", "#f5efe2", "#ffa500"],
      });
    } catch {
      // Safe catch
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 sm:py-16 px-4 bg-[#030303] overflow-hidden text-center select-none">
      
      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full bg-gradient-to-tr from-[#FFD700]/20 via-[#ff2a85]/20 to-amber-400/10 blur-[140px] sm:blur-[190px] pointer-events-none z-0"
      />

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {twinklingStars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            animate={{
              opacity: [0.1, 0.85, 0.1],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      {/* Drifting Petals */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {rosePetals.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            initial={{ opacity: 0, y: "-10vh", x: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              y: "110vh",
              x: [0, petal.sway, -petal.sway, 0],
              rotate: petal.rotate,
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${
              petal.isSunflowerPetal 
                ? "text-[#FFD700]/80 drop-shadow-[0_4px_10px_rgba(255,215,0,0.4)]" 
                : "text-rose-500/80 drop-shadow-[0_4px_10px_rgba(255,42,133,0.3)]"
            }`}
            style={{ left: petal.left, transform: `scale(${petal.scale})` }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d={petal.isSunflowerPetal ? SUNFLOWER_PETAL_PATH : ROSE_PETAL_PATH} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {floatingEmojis.map((item) => (
          <motion.div
            key={`emoji-${item.id}`}
            initial={{ opacity: 0, y: "105vh", x: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.85, 0.85, 0],
              y: "-15vh",
              x: [0, item.drift, -item.drift, 0],
              rotate: item.rotation,
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute drop-shadow-lg filter will-change-transform"
            style={{
              left: item.left,
              fontSize: item.size,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 max-w-2xl space-y-6 sm:space-y-8 px-2">
        
        {/* FLORAL BOUQUET & SUNFLOWER BUTTON */}
        <div className="relative flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px] pt-4">
          
          {/* BOUQUET ARRANGEMENT */}
          <div className="relative flex items-center justify-center w-full">
            
            {/* Stem Wrapper / Ribbon Base */}
            <motion.div
              animate={{
                y: hasFlowerClicked ? [0, -4, 0] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-28px] z-20 flex flex-col items-center"
            >
              {/* Bound Stems */}
              <div className="w-6 h-14 bg-gradient-to-b from-emerald-700 via-green-800 to-emerald-950 rounded-b-md shadow-md border-x border-green-600/30" />
              {/* Satin Gold Ribbon Bow */}
              <div className="absolute top-1 w-12 h-6 bg-gradient-to-r from-amber-400 via-[#FFD700] to-amber-500 rounded-full border border-white/60 shadow-[0_0_12px_rgba(255,215,0,0.8)] flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-700 rounded-full border border-white/40" />
              </div>
            </motion.div>

            {/* BOUQUET FLOWERS LAYER */}

            {/* 1. Left Supporting Mini Sunflower */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? -70 : -35,
                y: hasFlowerClicked ? -45 : -15,
                scale: hasFlowerClicked ? 0.85 : 0.65,
                rotate: hasFlowerClicked ? -25 : -12,
              }}
              transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
              className="absolute z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            >
              <SunflowerSVG size="w-16 h-16 sm:w-20 sm:h-20" />
            </motion.div>

            {/* 2. Right Supporting Mini Sunflower */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? 70 : 35,
                y: hasFlowerClicked ? -45 : -15,
                scale: hasFlowerClicked ? 0.85 : 0.65,
                rotate: hasFlowerClicked ? 25 : 12,
              }}
              transition={{ duration: 1.2, type: "spring", stiffness: 60, delay: 0.05 }}
              className="absolute z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            >
              <SunflowerSVG size="w-16 h-16 sm:w-20 sm:h-20" />
            </motion.div>

            {/* 3. Top Accent Mini Sunflower */}
            <motion.div
              animate={{
                y: hasFlowerClicked ? -95 : -50,
                scale: hasFlowerClicked ? 0.8 : 0.55,
                rotate: hasFlowerClicked ? [0, 10, -10, 0] : 0,
              }}
              transition={{ duration: 1.3, type: "spring", delay: 0.1 }}
              className="absolute z-0 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            >
              <SunflowerSVG size="w-14 h-14 sm:w-18 sm:h-18" />
            </motion.div>

            {/* 4. Far Left Deep Rose */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? -105 : -48,
                y: hasFlowerClicked ? -10 : 5,
                scale: hasFlowerClicked ? 0.85 : 0.45,
                rotate: -35,
              }}
              transition={{ duration: 1.4, type: "spring", delay: 0.15 }}
              className="absolute z-0 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]"
            >
              <RoseSVG />
            </motion.div>

            {/* 5. Far Right Golden Tulip */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? 105 : 48,
                y: hasFlowerClicked ? -10 : 5,
                scale: hasFlowerClicked ? 0.85 : 0.45,
                rotate: 35,
              }}
              transition={{ duration: 1.4, type: "spring", delay: 0.2 }}
              className="absolute z-0 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            >
              <TulipSVG />
            </motion.div>

            {/* 6. Bottom Left White Daisy */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? -55 : -25,
                y: hasFlowerClicked ? 25 : 15,
                scale: hasFlowerClicked ? 0.75 : 0.4,
                rotate: -20,
              }}
              transition={{ duration: 1.4, type: "spring", delay: 0.22 }}
              className="absolute z-0 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
            >
              <DaisySVG />
            </motion.div>

            {/* 7. Bottom Right Lavender Sprig */}
            <motion.div
              animate={{
                x: hasFlowerClicked ? 55 : 25,
                y: hasFlowerClicked ? 25 : 15,
                scale: hasFlowerClicked ? 0.75 : 0.4,
                rotate: 20,
              }}
              transition={{ duration: 1.4, type: "spring", delay: 0.25 }}
              className="absolute z-0 text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]"
            >
              <LavenderSVG />
            </motion.div>

            {/* CENTRAL INTERACTIVE SUNFLOWER BUTTON */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-30 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.12, rotate: 15 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleFlowerClick}
                aria-label="Bloom Everlasting Sunflower Bouquet"
                className="cursor-pointer relative p-3 sm:p-4 rounded-full bg-black/50 backdrop-blur-md border border-[#FFD700]/40 shadow-[0_0_50px_rgba(255,215,0,0.5)] group transition-all"
              >
                {/* Hero Center Sunflower Component */}
                <SunflowerSVG size="w-24 h-24 sm:w-32 sm:h-32" />

                {/* Sparkling Overlay Accent */}
                <Sparkles className="absolute top-2 right-2 w-6 h-6 text-amber-200 animate-pulse pointer-events-none" />
              </motion.button>
            </motion.div>

          </div>
        </div>

        {/* Narrative & Wishes */}
        <div className="space-y-3 sm:space-y-4 pt-2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
           I Love You<span className="italic text-[#ff2a85] text-glow">, My Sunshine🌻❤️</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-base sm:text-xl text-neutral-300 italic max-w-lg mx-auto leading-relaxed"
          >
            &ldquo;Like sunflowers that turn toward the golden sun, my heart will always find its home in you. Happy Birthday, my dearest Aarya.&rdquo;
          </motion.p>
        </div>

        {/* Footer Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-6 border-t border-white/10 max-w-sm mx-auto flex flex-col items-center gap-4"
        >
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {hasFlowerClicked ? "A bouquet that blooms forever 🌻💖" : "Tap the central sunflower to bloom your bouquet ✨"}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Relive The Story</span>
          </button>
        </motion.div>
      </div>

      {/* Expanding Sunflower Burst Ripple */}
      <AnimatePresence>
        {hasFlowerClicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.9, 2.4] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute pointer-events-none z-30"
          >
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#FFD700]/20 blur-xl border-2 border-[#FFD700]/40" />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// --- ELEGANT SVG FLORAL VECTOR COMPONENTS ---

function SunflowerSVG({ size = "w-20 h-20" }: { size?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={size}>
      {/* 16 Golden Petals Ring */}
      {[...Array(16)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="20"
          rx="5.5"
          ry="18"
          fill="#FFD700"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      {/* Inner Orange Petal Ring for Depth */}
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="50"
          cy="26"
          rx="4"
          ry="12"
          fill="#FFA500"
          transform={`rotate(${i * 30 + 15} 50 50)`}
        />
      ))}
      {/* Center Seed Disc */}
      <circle cx="50" cy="50" r="16" fill="#3D2314" />
      <circle cx="50" cy="50" r="14" fill="#2A160A" stroke="#52311D" strokeWidth="2" strokeDasharray="2 2" />
    </svg>
  );
}

function RoseSVG() {
  return (
    <svg width="70" height="70" viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16">
      <path d="M50 15 C30 15 20 35 20 50 C20 70 35 85 50 85 C65 85 80 70 80 50 C80 35 70 15 50 15 Z" fill="#E11D48" />
      <path d="M50 25 C38 25 30 38 30 50 C30 62 40 72 50 72 C60 72 70 62 70 50 C70 38 62 25 50 25 Z" fill="#F43F5E" />
      <path d="M50 35 C42 35 36 42 36 50 C36 58 43 62 50 62 C57 62 64 58 64 50 C64 42 58 35 50 35 Z" fill="#FB7185" />
      <circle cx="50" cy="50" r="6" fill="#FFE4E6" />
    </svg>
  );
}

function TulipSVG() {
  return (
    <svg width="65" height="65" viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16">
      <path d="M50 20 C25 20 20 60 30 85 C45 90 55 90 70 85 C80 60 75 20 50 20 Z" fill="#F59E0B" />
      <path d="M50 20 C40 35 35 60 50 85 C65 60 60 35 50 20 Z" fill="#FBBF24" />
      <path d="M30 85 C40 50 45 30 50 20 C35 30 25 55 30 85 Z" fill="#D97706" />
    </svg>
  );
}

function DaisySVG() {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14">
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="6"
          ry="16"
          fill="#FFFFFF"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill="#FBBF24" />
    </svg>
  );
}

function LavenderSVG() {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14">
      <path d="M50 90 L50 20" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
      {[...Array(6)].map((_, i) => (
        <g key={i} transform={`translate(0, ${-i * 10})`}>
          <circle cx="44" cy="60" r="5" fill="#A855F7" />
          <circle cx="56" cy="60" r="5" fill="#C084FC" />
          <circle cx="50" cy="55" r="4" fill="#E9D5FF" />
        </g>
      ))}
    </svg>
  );
}