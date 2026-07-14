"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const INTRO_LINES = [
  "Dear Aarya...",
  "There are thousands of people...",
  "Millions of memories...",
  "But today...",
  "This story is only about you."
];

export default function LoveLetter() {
  const [stage, setStage] = useState<"intro" | "outerBox" | "innerBox" | "cardOpen">("intro");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  
  // 1. Tracks when this component actually enters the screen
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const smoothEase = { ease: [0.25, 1, 0.5, 1], duration: 1.2 };
  const springTransition = { type: "spring", stiffness: 50, damping: 14 };

  // Setup typing audio (plays softly if the file exists)
  useEffect(() => {
    audioRef.current = new Audio("/typewriter.mp3");
    audioRef.current.volume = 0.15;
  }, []);

  // 2. Bulletproof Typewriter Logic (Waits for scroll!)
  useEffect(() => {
    // If we aren't in the intro stage OR the user hasn't scrolled to it yet, pause!
    if (stage !== "intro" || !isInView) return;

    const currentLine = INTRO_LINES[currentLineIndex];

    if (displayedText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, displayedText.length + 1));
        
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }, 85); 
      
      return () => clearTimeout(timeout);
    } 
    else {
      const timeout = setTimeout(() => {
        if (currentLineIndex < INTRO_LINES.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedText(""); 
        } else {
          setStage("outerBox"); 
        }
      }, 1600); 
      
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLineIndex, stage, isInView]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ff2a85", "#ff73b3", "#ffffff", "#eaddca"],
    });
  };

  return (
    // Attach the observer ref to the main wrapper
    <section 
      ref={containerRef} 
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative bg-[#030303] py-20 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px] pointer-events-none z-0" />

      {/* Dynamic Sub-Header */}
      {stage !== "intro" && (
        <div className="text-center space-y-3 mb-12 z-10 max-w-md">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-3xl md:text-5xl text-white tracking-tight"
          >
            {stage === "cardOpen" ? (
              <>Today&apos;s <span className="italic text-accent text-glow">Reward</span></>
            ) : (
              <>A Little <span className="italic text-accent text-glow">Surprise</span></>
            )}
          </motion.h3>
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {stage === "outerBox" && "Click the gift box to unpack it ✨"}
            {stage === "innerBox" && "Look inside... there's one more layer ✦"}
            {stage === "cardOpen" && "Your birthday card has arrived."}
          </p>
        </div>
      )}

      {/* Main Presentation Stage */}
      <div className="relative flex items-center justify-center w-full max-w-lg h-96 z-10 perspective-[1200px]">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: CINEMATIC TYPEWRITER INTRO */}
          {stage === "intro" && (
            <motion.div
              key="intro-typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="text-center font-serif text-2xl md:text-4xl text-neutral-200 tracking-wide px-4 min-h-[100px] flex items-center justify-center"
            >
              <p className="leading-relaxed">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[3px] h-[28px] md:h-[38px] bg-accent ml-2 relative top-1"
                />
              </p>
            </motion.div>
          )}

          {/* STAGE 2: PREMIUM MASTER GIFT BOX */}
          {stage === "outerBox" && (
            <motion.div
              key="outer-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              transition={smoothEase}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setStage("innerBox");
                triggerConfetti();
              }}
              className="glass-panel p-12 rounded-full cursor-pointer flex items-center justify-center text-accent box-glow bg-accent/5 border-accent/20 relative group"
            >
              <Gift className="w-20 h-20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" />
            </motion.div>
          )}

          {/* STAGE 3: MINI LUXURY NESTED GIFT */}
          {stage === "innerBox" && (
            <motion.div
              key="inner-box"
              initial={{ scale: 0.4, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={springTransition}
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setStage("cardOpen");
                triggerConfetti();
              }}
              className="p-8 rounded-full cursor-pointer flex items-center justify-center text-accent-light box-glow bg-white/[0.02] border border-white/10 relative group"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-accent-light opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500" />
              <Sparkles className="w-12 h-12 animate-pulse" />
            </motion.div>
          )}

          {/* STAGE 4: HIGH-END UNFOLDED BIRTHDAY CARD */}
          {stage === "cardOpen" && (
            <motion.div
              key="birthday-card"
              initial={{ y: 140, scale: 0.75, opacity: 0, rotateX: -25 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
              transition={springTransition}
              className="w-full max-w-[440px] bg-[#faf6ee] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#eaddca]/60 p-6 md:p-10 text-stone-800 relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-3 border border-[#eaddca]/40 rounded-lg pointer-events-none" />

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.22 } } }}
                className="font-serif text-sm md:text-base leading-relaxed space-y-5 text-stone-800 text-left max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar"
              >
                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }} className="text-xl font-medium text-stone-900">
                  Dear Aarya,
                </motion.p>
                
                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }} className="text-2xl font-bold text-accent-muted tracking-tight">
                  Happy Birthday! 🎉
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  I wanted to make something a little different this year, so instead of sending just another message, I made this small surprise especially for you.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  Thank you for being such a wonderful friend. From all the random conversations to the funny moments and the memories we&apos;ve shared, they&apos;ve all made our friendship special.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  I hope this birthday marks the beginning of another amazing year filled with happiness, success, good health, exciting adventures, and countless reasons to smile.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  Keep being the kind, cheerful, and genuine person you are because that&apos;s what makes you truly special.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  May every dream you&apos;re working towards come true, and may life always bring you people and moments that make you happy.
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}>
                  Enjoy your day to the fullest, make lots of memories, and don&apos;t forget to smile a little extra today—it&apos;s your day after all.
                </motion.p>

                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: smoothEase } }}
                  className="pt-6 border-t border-stone-200 flex flex-col items-end"
                >
                  <p className="font-semibold text-stone-900">Happy Birthday once again! 🎂✨</p>
                  <p className="italic font-medium text-accent-muted mt-1 font-sans tracking-wide">— Heet</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}