"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function SurpriseBox() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to trigger a premium Apple-style confetti burst
  const handleRewardClick = () => {
    // Left side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ["#ff2a85", "#ba1c5c", "#ff73b3", "#ffffff"],
    });
    
    // Right side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ["#ff2a85", "#ba1c5c", "#ff73b3", "#ffffff"],
    });
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center px-4 relative">
      <h3 className="font-serif text-3xl md:text-5xl text-center mb-12 tracking-tight">
        A Little <span className="italic text-accent">Birthday Gift</span>
      </h3>

      <div className="relative flex items-center justify-center h-64 w-64">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="box"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIsOpen(true);
                // Also trigger an initial burst right when the box opens!
                setTimeout(handleRewardClick, 200);
              }}
              className="glass-panel p-10 rounded-full cursor-pointer flex items-center justify-center text-accent group box-glow bg-accent/5"
            >
              <Gift className="w-16 h-16 transition-transform duration-500 group-hover:rotate-12" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center space-y-4"
            >
              <div className="text-4xl">✨✨</div>
              <h4 
                className="font-serif text-2xl text-white cursor-pointer hover:text-accent transition-colors duration-300 select-none text-glow"
                onClick={handleRewardClick}
              >
                Today&apos;s Reward
              </h4>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest max-w-xs whitespace-pre-line">
                Unlimited smiles,{"\n"}
                lots of happiness,{"\n"}
                and an unforgettable birthday.{"\n\n"}
                Have the best day ever !! 🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}