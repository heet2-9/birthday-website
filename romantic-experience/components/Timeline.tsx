"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type WishStage = "idle" | "holding" | "darkness" | "revealed";

export default function Timeline() {
  const [stage, setStage] = useState<WishStage>("idle");

  // Prevent right-click menu when holding down on mobile[cite: 3]
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const handlePointerDown = () => {
    if (stage === "idle") {
      setStage("holding");
    }
  };

  const handlePointerUp = () => {
    if (stage === "holding") {
      setStage("darkness");

      setTimeout(() => {
        setStage("revealed");
        triggerStardust();
      }, 600);
    }
  };

  const triggerStardust = () => {
    // A massive, slow-falling golden and pink stardust explosion from both sides[cite: 3]
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#FFD700", "#FFA500", "#ffffff", "#ff2a85"];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 120,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 120,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section 
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#030303] overflow-hidden select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Invisible Click Overlay */}
      <div className="absolute inset-0 z-0 cursor-pointer" />

      {/* Dynamic Ambient Room Lighting */}
      <motion.div
        animate={{
          opacity: (stage === "darkness" || stage === "revealed") ? 0 : [0.15, 0.25, 0.15],
          scale: (stage === "darkness" || stage === "revealed") ? 0.8 : [1, 1.05, 1],
        }}
        transition={{ 
          duration: (stage === "darkness" || stage === "revealed") ? 1.5 : 4, 
          repeat: (stage === "darkness" || stage === "revealed") ? 0 : Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-radial from-amber-500/20 via-[#ff2a85]/5 to-transparent blur-[120px] pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-4 mt-20 md:mt-10">
        
        {/* INSTRUCTIONS TEXT */}
        <div className="h-20 flex items-center justify-center mb-16 text-center">
          <AnimatePresence mode="wait">
            {stage === "idle" && (
              <motion.div
                key="text-idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 pointer-events-none"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-300 drop-shadow-md">
                  Close your eyes & make a wish.
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff2a85] drop-shadow-[0_0_8px_rgba(255,42,133,0.5)]">
                  Click and hold the screen
                </p>
              </motion.div>
            )}

            {stage === "holding" && (
              <motion.div
                key="text-holding"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="pointer-events-none"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-amber-200 italic tracking-wide drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                  Keep holding... focus on it...
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500/80 mt-2">
                  Release to send it to the universe
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- PREMIUM 3D LUXURY CAKE --- */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-lg z-20 pointer-events-none mb-10">
          
          {/* Subtle Shimmering Particles around the cake */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                animate={{ 
                  y: [0, -30, -60],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,1)]"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
              />
            ))}
          </div>

          {/* Floating Cake Container */}
          <motion.div 
            animate={{ y: [-3, 3, -3] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center scale-[0.85] md:scale-100 mt-8"
          >
            
            {/* Candles & Flames */}
            <div className="relative z-50 flex justify-center gap-8 mb-[-12px]">
              {[1, 2, 3].map((candle, idx) => (
                <motion.div 
                  key={`candle-${candle}`} 
                  animate={{ rotate: [-1, 1, -1] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut", delay: idx }}
                  className="relative flex flex-col items-center"
                >
                  {/* Lifelike Flame */}
                  <AnimatePresence>
                    {(stage === "idle" || stage === "holding") && (
                      <motion.div
                        key="flame"
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        className="absolute -top-14 flex flex-col items-center justify-end h-16 w-10"
                      >
                        {/* Soft Ambient Bloom */}
                        <motion.div
                          animate={{ 
                            scale: stage === "holding" ? [1.5, 1.8, 1.6] : [1, 1.2, 1], 
                            opacity: stage === "holding" ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 0.2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute bottom-2 w-12 h-12 rounded-full blur-[12px] ${stage === "holding" ? "bg-amber-400" : "bg-orange-500"}`}
                        />
                        {/* Outer Orange Flame */}
                        <motion.div
                          animate={{ 
                            y: stage === "holding" ? [0, -6, 0] : [0, -2, 0], 
                            scale: stage === "holding" ? [1, 1.3, 1] : [1, 1.05, 1],
                            rotate: [-2, 2, -1]
                          }}
                          transition={{ duration: 0.15 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                          className="absolute bottom-1 w-4 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-[50%_50%_20%_20%] shadow-[0_0_10px_rgba(251,191,36,0.6)] z-10"
                          style={{ borderRadius: "50% 50% 20% 20% / 60% 60% 20% 20%" }}
                        />
                        {/* Inner White Core */}
                        <motion.div
                          animate={{ y: [0, -1, 0] }}
                          transition={{ duration: 0.1, repeat: Infinity }}
                          className="absolute bottom-2 w-1.5 h-4 bg-white rounded-full blur-[1px] z-20 shadow-[0_0_5px_rgba(255,255,255,1)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Smooth Smoke Plumes (When blown out) */}
                  <AnimatePresence>
                    {(stage === "darkness" || stage === "revealed") && (
                      <motion.div
                        key="smoke"
                        className="absolute -top-12 flex flex-col items-center"
                      >
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.5, x: 0 }}
                          animate={{ opacity: 0, y: -80, scale: 3, filter: "blur(12px)", x: [0, -10, 10, -5] }}
                          transition={{ duration: 2.5, ease: "easeOut" }}
                          className="w-3 h-10 bg-neutral-300/40 rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Luxury Striped Candle Stick */}
                  <div className="w-2.5 h-16 bg-gradient-to-r from-[#ffe4e1] via-white to-[#f5c6cb] rounded-t-sm shadow-md z-20 overflow-hidden relative border border-white/50">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(255,42,133,0.35)_4px,rgba(255,42,133,0.35)_8px)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* --- TOP TIER --- */}
            <div className="relative z-40 flex flex-col items-center">
              {/* Top Face */}
              <div className="w-36 h-14 bg-gradient-to-b from-[#ffffff] to-[#faf5f0] rounded-[50%] border border-white shadow-[inset_0_-3px_6px_rgba(0,0,0,0.04)] absolute -top-7 z-20" />
              {/* Body */}
              <div className="w-36 h-20 bg-gradient-to-r from-[#e8dfd8] via-[#ffffff] to-[#d6c7b8] rounded-b-[50%] shadow-[0_15px_25px_rgba(0,0,0,0.25)] relative overflow-hidden border-b border-[#c2b2a3]/30">
                {/* Gloss Reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 left-1/4 skew-x-12" />
                {/* Drips */}
                <div className="absolute top-0 w-full flex justify-between px-3 opacity-90">
                  <div className="w-3 h-7 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-2.5 h-10 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-1" />
                  <div className="w-3.5 h-6 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-2 h-8 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-2" />
                </div>
                {/* Pink Ribbon */}
                <div className="absolute bottom-5 w-full h-3 bg-gradient-to-r from-[#cc1a66] via-[#ff2a85] to-[#990a47] shadow-sm opacity-90" />
                {/* Gold Pearls */}
                <div className="absolute bottom-[26px] left-6 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-[22px] right-8 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
              </div>
              {/* Piped Border */}
              <div className="absolute -bottom-2 w-[105%] flex justify-around px-1 z-30 drop-shadow-md">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-white to-[#f0e6d9] shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.1)]" />
                ))}
              </div>
            </div>

            {/* --- MIDDLE TIER --- */}
            <div className="relative z-30 flex flex-col items-center -mt-10">
              <div className="w-52 h-16 bg-gradient-to-b from-[#ffffff] to-[#faf5f0] rounded-[50%] border border-white shadow-[inset_0_-3px_6px_rgba(0,0,0,0.04)] absolute -top-8 z-20" />
              <div className="w-52 h-24 bg-gradient-to-r from-[#e8dfd8] via-[#ffffff] to-[#d6c7b8] rounded-b-[50%] shadow-[0_20px_35px_rgba(0,0,0,0.3)] relative overflow-hidden border-b border-[#c2b2a3]/30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 left-1/4 skew-x-12" />
                {/* Drips */}
                <div className="absolute top-0 w-full flex justify-around px-2 opacity-90">
                  <div className="w-3 h-9 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-1" />
                  <div className="w-4 h-6 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-2.5 h-12 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-3.5 h-7 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-2" />
                  <div className="w-3 h-10 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                </div>
                {/* Pink Ribbon */}
                <div className="absolute bottom-6 w-full h-3.5 bg-gradient-to-r from-[#cc1a66] via-[#ff2a85] to-[#990a47] shadow-sm opacity-90" />
                {/* Gold Pearls */}
                <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_4px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-10 right-14 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-[30px] right-24 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
              </div>
              {/* Piped Border */}
              <div className="absolute -bottom-2 w-[105%] flex justify-around px-1 z-30 drop-shadow-md">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-[#f0e6d9] shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.1)]" />
                ))}
              </div>
              {/* Floral Decor (Left edge) */}
              <div className="absolute -bottom-1 left-2 z-40 flex items-center justify-center drop-shadow-md scale-75">
                 <div className="absolute w-4 h-4 bg-gradient-to-br from-pink-200 to-[#ff2a85] rounded-[50%_0_50%_50%] rotate-45 transform -translate-x-2 -translate-y-1" />
                 <div className="absolute w-4 h-4 bg-gradient-to-br from-pink-200 to-[#ff2a85] rounded-[50%_50%_0_50%] rotate-45 transform translate-x-2 -translate-y-1" />
                 <div className="absolute w-2 h-2 bg-amber-300 rounded-full z-10 shadow-sm" />
              </div>
            </div>

            {/* --- BOTTOM TIER --- */}
            <div className="relative z-20 flex flex-col items-center -mt-12">
              <div className="w-72 h-20 bg-gradient-to-b from-[#ffffff] to-[#faf5f0] rounded-[50%] border border-white shadow-[inset_0_-3px_6px_rgba(0,0,0,0.04)] absolute -top-10 z-20" />
              <div className="w-72 h-32 bg-gradient-to-r from-[#e8dfd8] via-[#ffffff] to-[#c7b7a7] rounded-b-[50%] shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden border-b border-[#a39485]/40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 left-1/4 skew-x-12" />
                {/* Drips */}
                <div className="absolute top-0 w-full flex justify-around px-4 opacity-90">
                  <div className="w-3 h-14 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-2" />
                  <div className="w-4 h-8 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-2.5 h-16 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-4 h-10 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-3" />
                  <div className="w-3 h-12 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm" />
                  <div className="w-3.5 h-7 bg-gradient-to-b from-white to-[#fdfbf9] rounded-b-full shadow-sm mt-1" />
                </div>
                {/* Pink Ribbon */}
                <div className="absolute bottom-8 w-full h-4 bg-gradient-to-r from-[#cc1a66] via-[#ff2a85] to-[#990a47] shadow-sm opacity-90" />
                {/* Gold Pearls */}
                <div className="absolute bottom-16 left-12 w-2 h-2 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-14 right-16 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                <div className="absolute bottom-[42px] right-28 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-100 to-amber-500 shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
              </div>
              {/* Piped Border */}
              <div className="absolute -bottom-2.5 w-[104%] flex justify-around px-1 z-30 drop-shadow-lg">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-[#f0e6d9] shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.15)]" />
                ))}
              </div>
              {/* Floral Decor (Right edge) */}
              <div className="absolute -bottom-2 right-4 z-40 flex items-center justify-center drop-shadow-md scale-90">
                 <div className="absolute w-5 h-5 bg-gradient-to-br from-pink-200 to-[#ff2a85] rounded-[50%_0_50%_50%] rotate-45 transform -translate-x-2.5 -translate-y-1.5" />
                 <div className="absolute w-5 h-5 bg-gradient-to-br from-pink-200 to-[#ff2a85] rounded-[50%_50%_0_50%] rotate-45 transform translate-x-2.5 -translate-y-1.5" />
                 <div className="absolute w-5 h-5 bg-gradient-to-br from-pink-200 to-[#ff2a85] rounded-[50%_50%_50%_0] rotate-45 transform translate-y-2" />
                 <div className="absolute w-2.5 h-2.5 bg-amber-300 rounded-full z-10 shadow-sm" />
              </div>
            </div>

            {/* --- PREMIUM GLASS CAKE STAND --- */}
            <div className="relative z-0 -mt-14">
              {/* Stand Plate */}
              <div className="w-[340px] h-28 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-[50%] border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(255,255,255,0.15)] relative flex justify-center">
                 <div className="absolute top-2 w-[95%] h-[90%] rounded-[50%] border border-white/10" />
                 {/* Glass Stem */}
                 <div className="absolute -bottom-6 w-16 h-12 bg-gradient-to-r from-white/5 via-white/20 to-white/5 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] border-x border-white/10 z-0" />
                 {/* Glass Base */}
                 <div className="absolute -bottom-10 w-32 h-10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl rounded-[50%] border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10" />
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* FINAL REVEAL MESSAGE (Anchored top, un-altered) */}
      <div className="absolute top-[12%] left-0 w-full flex justify-center pointer-events-none z-50 px-4">
        <AnimatePresence>
          {stage === "revealed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center space-y-4 md:space-y-6"
            >
              <motion.h2 
                animate={{ textShadow: ["0 0 20px rgba(255,42,133,0)", "0 0 40px rgba(255,42,133,0.4)", "0 0 20px rgba(255,42,133,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="font-serif text-4xl md:text-6xl text-white tracking-tight"
              >
                Cheers to 17🥳<br/> 
                <span className="italic text-amber-200">Wishing you endless happiness.</span>
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}