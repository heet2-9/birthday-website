"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

const NAME_LETTERS = [
  { char: "A", meaning: "Adored", message: "Loved beyond words, cherished beyond measure in every quiet moment." },
  { char: "A", meaning: "Angelic", message: "Your gentle kindness and warm heart bring pure peace into my world." },
  { char: "R", meaning: "Radiant", message: "A glowing warmth that lights up even the darkest, quietest days." },
  { char: "Y", meaning: "Youthful", message: "Your vibrant joy and playful laughter make every day feel brand new." },
  { char: "A", meaning: "Affectionate", message: "Your endless love is the safest, sweetest sanctuary I will ever know." },
];

export default function NameReveal() {
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  const handleLetterClick = (index: number) => {
    setActiveLetter(index);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#ff2a85", "#FFD700", "#ffffff"],
    });
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-16 px-4 bg-[#030303] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#ff2a85]/10 blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12 sm:mb-16 z-10 max-w-lg">
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
          The Meaning Of <span className="italic text-[#ff2a85] text-glow">Aarya</span>
        </h2>
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          Tap each letter to reveal what makes you so special
        </p>
      </div>

      {/* Letters Grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 z-10 max-w-3xl mb-12">
        {NAME_LETTERS.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLetterClick(index)}
            aria-label={`Reveal meaning for letter ${item.char}`}
            className={`relative w-14 h-18 sm:w-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 ${
              activeLetter === index
                ? "bg-gradient-to-b from-[#ff2a85] to-rose-700 border-white text-white shadow-[0_0_30px_rgba(255,42,133,0.6)]"
                : "bg-white/[0.04] backdrop-blur-md border-white/15 text-neutral-200 hover:border-[#ff2a85]/50"
            }`}
          >
            <span className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">{item.char}</span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-80 mt-1">
              {item.meaning}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Message Modal / Card */}
      <div className="min-h-[120px] z-10 w-full max-w-md px-4 text-center">
        <AnimatePresence mode="wait">
          {activeLetter !== null ? (
            <motion.div
              key={activeLetter}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/15 shadow-2xl relative"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-[#ff2a85]">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-lg font-semibold text-white">
                  {NAME_LETTERS[activeLetter].char} is for {NAME_LETTERS[activeLetter].meaning}
                </h3>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="font-serif text-sm sm:text-base text-neutral-300 leading-relaxed italic">
                &ldquo;{NAME_LETTERS[activeLetter].message}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="flex items-center justify-center gap-2 text-neutral-400 font-serif text-sm italic"
            >
              <Heart className="w-4 h-4 text-[#ff2a85]" />
              <span>Tap a letter above to discover a heartfelt note</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}