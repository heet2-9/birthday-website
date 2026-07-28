"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { FLOWER_QUALITIES } from "@/data/flowers";
import { safeConfetti } from "@/lib/confetti";
import { FlowerGridItem } from "./name-reveal/FlowerGridItem";

export default function NameReveal() {
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  const handleFlowerClick = useCallback((index: number) => {
    setActiveFlower(index);
    safeConfetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#ff2a85", "#ffffff", "#ff73b3"],
      disableForReducedMotion: true,
    });
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 sm:py-16 px-3 sm:px-6 bg-[#030303] overflow-hidden select-none">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFD700]/10 via-[#ff2a85]/15 to-transparent blur-[150px] pointer-events-none z-0" />

      <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12 z-10 max-w-lg px-2">
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
          Aarya&apos;s <span className="italic text-[#ff2a85] text-glow">Garden of Qualities</span>
        </h2>
        <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
          Pick a flower to watch it bloom and reveal a heartfelt note 🌸
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 z-10 max-w-4xl mb-8 sm:mb-12 px-2">
        {FLOWER_QUALITIES.map((item, index) => (
          <FlowerGridItem
            key={index}
            item={item}
            index={index}
            isSelected={activeFlower === index}
            onSelect={() => handleFlowerClick(index)}
          />
        ))}
      </div>

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