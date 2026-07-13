"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayCake() {
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleCandleClick = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);

    // Celebration burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff2a85", "#ff73b3", "#ffffff", "#ffecd2"],
    });
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative bg-[#030303] py-20 overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="text-center space-y-4 mb-16 z-20">
        <h3 className="font-serif text-4xl md:text-6xl text-white tracking-tight">
          Happy Birthday <span className="text-accent text-glow">Aarya!</span>
        </h3>
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          {isBlownOut ? "Your wish has been cast into the cosmos." : "Tap the candle flame to blow it out."}
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-md z-20">
        <div className="relative h-20 w-8 flex items-center justify-center select-none cursor-pointer z-30" onClick={handleCandleClick}>
          <AnimatePresence>
            {!isBlownOut ? (
              <motion.div
                key="flame"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 0.95, 1.1, 1], opacity: 1, y: [0, -3, 1, -2, 0] }}
                exit={{ scale: 0, opacity: 0, filter: "blur(6px)" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-5 h-10 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-full box-glow shadow-[0_0_30px_rgba(255,42,133,0.8)]"
              >
                <div className="w-2 h-5 bg-white rounded-full mx-auto mt-3 opacity-80 filter blur-[0.5px]" />
              </motion.div>
            ) : (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.7, y: 0, scale: 0.4 }}
                animate={{ opacity: 0, y: -60, scale: 2.5, filter: "blur(8px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-3 h-8 bg-neutral-400/30 rounded-full absolute"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="w-3 h-14 bg-gradient-to-r from-accent-light via-white to-accent rounded-t-sm shadow-md relative mt-[-4px]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
        </div>

        <div className="relative flex flex-col items-center mt-[-2px] w-full">
          <div className="w-40 h-20 glass-panel rounded-t-xl border-b-0 relative overflow-hidden flex items-end justify-center z-20 shadow-[inset_0_4px_12px_rgba(255,255,255,0.05)]">
            <div className="absolute top-0 left-0 w-full flex justify-between px-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-5 h-6 bg-gradient-to-b from-accent to-accent-muted rounded-b-full shadow-sm" style={{ height: `${12 + (i % 3) * 6}px` }} />
              ))}
            </div>
            <div className="w-full h-2 flex justify-around absolute bottom-1 px-2 opacity-60">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white" />
              ))}
            </div>
          </div>

          <div className="w-56 h-24 glass-panel border-b-0 relative overflow-hidden flex items-end justify-center z-10 mt-[-4px] shadow-[inset_0_4px_12px_rgba(255,255,255,0.05)]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-muted via-accent-light to-accent-muted shadow-md" />
            <div className="absolute top-2 left-0 w-full flex justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-6 h-8 bg-gradient-to-b from-white/10 to-transparent rounded-b-full" style={{ height: `${10 + (i % 2) * 8}px` }} />
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full opacity-60" />
            </div>
          </div>

          <div className="w-full flex justify-center mt-4 z-20">
            <div className="w-72 h-20 rounded-b-xl glass-panel flex items-center justify-center shadow-lg">
              <div className="text-center">
                <p className="text-sm text-neutral-300">Make a wish</p>
                <p className="text-xs text-neutral-400">Tap the candle above</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
