"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowDown } from "lucide-react";
import confetti from "canvas-confetti";

export default function Hero() {
  const [stage, setStage] = useState<"idle" | "launching" | "fireworks">("idle");
  const fireworkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Massive firework show using canvas-confetti
  const startFireworkShow = () => {
    const duration = 10 * 1000; // 10 seconds of fireworks
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    fireworkIntervalRef.current = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        if (fireworkIntervalRef.current) clearInterval(fireworkIntervalRef.current);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff2a85", "#ff73b3", "#ffffff", "#f5efe2", "#ba1c5c"],
      });
    }, 250);
  };

  const handleLaunch = () => {
    if (stage !== "idle") return;
    setStage("launching");

    setTimeout(() => {
      setStage("fireworks");
      startFireworkShow();
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (fireworkIntervalRef.current) clearInterval(fireworkIntervalRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none z-0" />

      <div className="relative flex items-center justify-center w-full h-[60vh] z-20">
        <AnimatePresence mode="wait">
          
          {/* --- STAGE 1 & 2: THE ROCKET LAUNCHER --- */}
          {(stage === "idle" || stage === "launching") && (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center space-y-3 mt-12">
                <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight">
                  Let's <span className="italic text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light text-glow">Celebrate</span>
                </h1>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  {stage === "idle" ? "Click the rocket to begin the celebration" : "Liftoff initiated..."}
                </p>
              </div>

              <motion.div
                animate={
                  stage === "launching"
                    ? { y: -1000, scale: 0.5, opacity: 0, transition: { duration: 1.5, ease: "easeIn" } }
                    : { y: [0, -10, 0] }
                }
                transition={stage === "idle" ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}}
                whileHover={stage === "idle" ? { scale: 1.1 } : {}}
                onClick={handleLaunch}
                className="glass-panel p-10 rounded-full cursor-pointer flex items-center justify-center text-accent box-glow bg-accent/5 border border-accent/20 relative group mt-8"
              >
                <motion.div
                  animate={stage === "launching" ? { x: [-3, 3, -3, 3, 0], y: [2, -2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Rocket className="w-16 h-16 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110" />
                </motion.div>
                
                {stage === "launching" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 2 }}
                    className="absolute -bottom-10 w-8 h-20 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent blur-md rounded-full"
                  />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* --- STAGE 3: THE FIREWORK TEXT REVEAL --- */}
          {stage === "fireworks" && (
            <motion.div
              key="fireworks-text"
              className="text-center flex flex-col items-center justify-center space-y-4 md:space-y-8 absolute inset-0 w-full h-full"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
              />

              <motion.h2
                initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.2 }}
                className="font-serif text-5xl md:text-8xl lg:text-[7rem] font-bold text-white tracking-tight leading-none text-glow z-20 mt-12"
                style={{ textShadow: "0 0 40px rgba(255, 255, 255, 0.8)" }}
              >
                HAPPY
                <br />
                BIRTHDAY
              </motion.h2>

              <motion.div
                initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.6 }}
                className="font-serif text-6xl md:text-9xl lg:text-[9rem] font-bold text-accent tracking-tighter leading-none box-glow z-20"
                style={{ textShadow: "0 0 60px rgba(255, 42, 133, 1)" }}
              >
                AARYA
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Down Indicator (Only appears after fireworks trigger) */}
      <AnimatePresence>
        {stage === "fireworks" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-500 hover:text-accent transition-colors duration-300 z-30"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll to Discover</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}