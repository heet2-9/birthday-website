"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Upgraded premium color palettes and glow profiles
const RESONANCE_ORBS = [
  { 
    id: 1, 
    color: "from-[#ff2a85] to-[#ff73b3]", 
    glow: "rgba(255,42,133,0.8)",
    hex: ["#ff2a85", "#ff73b3", "#ffffff"]
  },
  { 
    id: 2, 
    color: "from-amber-400 to-orange-500", 
    glow: "rgba(251,191,36,0.8)",
    hex: ["#fbbf24", "#f97316", "#ffffff"]
  },
  { 
    id: 3, 
    color: "from-cyan-300 to-blue-600", 
    glow: "rgba(34,211,238,0.8)",
    hex: ["#22d3ee", "#3b82f6", "#ffffff"]
  },
  { 
    id: 4, 
    color: "from-violet-400 to-fuchsia-600", 
    glow: "rgba(139,92,246,0.8)",
    hex: ["#8b5cf6", "#d946ef", "#ffffff"]
  },
];

export default function Timeline() {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  const handleOrbClick = (id: number, hexColors: string[]) => {
    if (activeOrb === id) return;
    
    setActiveOrb(id);

    // Premium high-velocity confetti burst
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 40,
      origin: { y: 0.5 },
      colors: hexColors,
      disableForReducedMotion: true,
      zIndex: 100,
    });
  };

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center bg-[#030303] overflow-hidden">
      
      {/* Dynamic Cinematic Atmosphere */}
      <AnimatePresence mode="wait">
        {activeOrb !== null && (
          <motion.div
            key={`ambient-${activeOrb}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-tr ${RESONANCE_ORBS.find(o => o.id === activeOrb)?.color} blur-[150px] pointer-events-none z-0`}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center z-10 perspective-[1000px]">
        
        {RESONANCE_ORBS.map((orb, index) => {
          const isActive = activeOrb === orb.id;
          const isSomethingActive = activeOrb !== null;
          
          // Calculate a wider, more elegant circular orbit
          const angle = (index / RESONANCE_ORBS.length) * Math.PI * 2;
          const radius = 220; 
          const xPos = Math.cos(angle) * radius;
          const yPos = Math.sin(angle) * radius;

          return (
            <motion.div
              key={orb.id}
              onClick={() => handleOrbClick(orb.id, orb.hex)}
              animate={{
                x: isActive ? 0 : (isSomethingActive ? xPos * 1.2 : xPos),
                y: isActive ? 0 : (isSomethingActive ? yPos * 1.2 : yPos),
                scale: isActive ? 1.6 : (isSomethingActive ? 0.6 : 1),
                opacity: isActive ? 1 : (isSomethingActive ? 0.3 : 1),
                zIndex: isActive ? 50 : 10,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 45, 
                damping: 15,
                mass: 1.2 
              }}
              className="absolute left-1/2 top-1/2 cursor-pointer group"
              style={{ marginLeft: "-40px", marginTop: "-40px" }} // offset by half of w-20 h-20
            >
              {/* Organic Idle Hovering */}
              <motion.div
                animate={isActive ? {} : {
                  y: [0, -15, 0, 15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + index,
                  ease: "easeInOut",
                  delay: index * 0.4
                }}
                className="relative w-20 h-20 flex items-center justify-center"
              >
                {/* 1. The Glass Casing */}
                <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/[0.02] border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-white/[0.05] transition-colors duration-500" />
                
                {/* 2. The Blurred Energy Core */}
                <motion.div
                  animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className={`absolute w-12 h-12 rounded-full bg-gradient-to-tr ${orb.color} blur-md opacity-80`}
                />

                {/* 3. The Solid Inner Star */}
                <div className={`w-3 h-3 rounded-full bg-white shadow-[0_0_15px_${orb.glow}] z-10`} />

                {/* 4. Active State: Expanding Light Rings */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.div
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                        className={`absolute inset-0 rounded-full border border-white/40`}
                        style={{ boxShadow: `0 0 20px ${orb.glow}` }}
                      />
                      
                      {/* 5. Active State: Orbiting Particles */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute w-[180%] h-[180%] rounded-full border border-white/10 border-dashed opacity-50"
                      >
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px]" style={{ boxShadow: `0 0 10px ${orb.glow}` }} />
                        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white rounded-full blur-[1px]" style={{ boxShadow: `0 0 10px ${orb.glow}` }} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}