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

type Stage = "intro" | "outerBox" | "innerBox" | "envelope" | "opening" | "sliding" | "unfolding" | "letterOpen";

export default function LoveLetter() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const smoothEase = { ease: [0.25, 1, 0.5, 1], duration: 1.2 };
  const springTransition = { type: "spring", stiffness: 50, damping: 14 };

  useEffect(() => {
    audioRef.current = new Audio("/typewriter.mp3");
    audioRef.current.volume = 0.15;
  }, []);

  // Typewriter logic
  useEffect(() => {
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
      colors: ["#ff2a85", "#ff73b3", "#ffffff", "#f5efe2"],
    });
  };

  const handleEnvelopeClick = () => {
    if (stage !== "envelope") return;
    
    // Sparkle burst from both sides
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.55 },
      colors: ["#FFD700", "#ff2a85", "#ffffff"],
      startVelocity: 18,
      disableForReducedMotion: true
    });

    setStage("opening");
    setTimeout(() => {
      setStage("sliding");
      setTimeout(() => {
        setStage("unfolding");
        setTimeout(() => {
          setStage("letterOpen");
        }, 800);
      }, 800);
    }, 700);
  };

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative bg-[#030303] py-20 overflow-hidden"
    >
      {/* Ambient background glow */}
      <motion.div 
        animate={{
          scale: stage === "letterOpen" ? 1.2 : 1,
          opacity: stage === "letterOpen" ? 0.2 : 0.1
        }}
        transition={{ duration: 1.5 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[#ff2a85] blur-[160px] pointer-events-none z-0" 
      />

      {/* Dynamic Sub-Header */}
      {stage !== "intro" && (
        <div className="text-center space-y-3 mb-12 z-10 max-w-md">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-3xl md:text-5xl text-white tracking-tight"
          >
            {stage === "letterOpen" ? (
              <>Your <span className="italic text-[#ff2a85] text-glow">Invitation</span></>
            ) : (
              <>A Little <span className="italic text-[#ff2a85] text-glow">Surprise</span></>
            )}
          </motion.h3>
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {stage === "outerBox" && "Click the gift box to unpack it ✨"}
            {stage === "innerBox" && "Look inside... there's one more layer ✦"}
            {stage === "envelope" && "Tap the frosted card to reveal your message ✨"}
            {(stage === "opening" || stage === "sliding" || stage === "unfolding") && "Unlocking your birthday invitation..."}
            {stage === "letterOpen" && "Created especially for you"}
          </p>
        </div>
      )}

      {/* Main Presentation Stage */}
      <div className="relative flex items-center justify-center w-full max-w-lg min-h-[480px] z-10 perspective-[1400px]">
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
                  className="inline-block w-[3px] h-[28px] md:h-[38px] bg-[#ff2a85] ml-2 relative top-1"
                />
              </p>
            </motion.div>
          )}

          {/* STAGE 2: MASTER GIFT BOX */}
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
              className="glass-panel p-12 rounded-full cursor-pointer flex items-center justify-center text-[#ff2a85] box-glow bg-[#ff2a85]/5 border border-[#ff2a85]/20 relative group"
            >
              <Gift className="w-20 h-20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" />
            </motion.div>
          )}

          {/* STAGE 3: MINI NESTED GIFT */}
          {stage === "innerBox" && (
            <motion.div
              key="inner-box"
              initial={{ scale: 0.4, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={springTransition}
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setStage("envelope");
                triggerConfetti();
              }}
              className="p-8 rounded-full cursor-pointer flex items-center justify-center text-pink-300 box-glow bg-white/[0.02] border border-white/10 relative group"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#ff2a85] to-pink-300 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500" />
              <Sparkles className="w-12 h-12 animate-pulse" />
            </motion.div>
          )}

          {/* STAGE 4: MODERN FROSTED GLASS ENVELOPE & LUXURY INVITATION CARD */}
          {stage !== "intro" && stage !== "outerBox" && stage !== "innerBox" && (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={springTransition}
              className="relative flex items-center justify-center w-full"
            >
              {/* Subtle Floating Sparkles */}
              <div className="absolute inset-0 -m-12 pointer-events-none z-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${25 + (i % 3) * 25}%`,
                    }}
                  />
                ))}
              </div>

              {/* MODERN FROSTED GLASS ENVELOPE */}
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={stage === "envelope" ? { scale: 1.02, y: -6 } : {}}
                onClick={handleEnvelopeClick}
                className={`relative w-[340px] sm:w-[420px] h-[250px] rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col justify-between overflow-visible transition-all duration-300 ${stage === "envelope" ? "cursor-pointer hover:border-[#ff2a85]/50 hover:shadow-[0_0_40px_rgba(255,42,133,0.3)]" : ""}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glowing Border Accent */}
                <div className="absolute inset-0 rounded-2xl border border-[#ff2a85]/20 pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a85]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Minimal Top Flap */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: stage !== "envelope" ? -180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-0 left-0 right-0 h-[120px] bg-white/[0.08] backdrop-blur-3xl border-b border-white/20 rounded-t-2xl z-30 shadow-lg flex justify-center items-center"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Subtle Metallic Emblem */}
                  <AnimatePresence>
                    {stage === "envelope" && (
                      <motion.div
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute bottom-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f5efe2] to-[#ff2a85]/30 border border-white/40 shadow-[0_0_20px_rgba(255,42,133,0.4)] flex items-center justify-center cursor-pointer z-40"
                      >
                        <Sparkles className="w-4 h-4 text-[#ff2a85]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* LUXURY INVITATION CARD (Sliding & Unfolding) */}
                <motion.div
                  initial={{ y: 0, scale: 0.95, opacity: 0 }}
                  animate={{
                    y: stage === "envelope" || stage === "opening" ? 0 : stage === "sliding" ? -170 : -30,
                    scale: stage === "unfolding" || stage === "letterOpen" ? 1 : 0.95,
                    opacity: stage === "envelope" ? 0 : 1,
                    zIndex: stage === "sliding" || stage === "unfolding" || stage === "letterOpen" ? 50 : 5
                  }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute left-3 right-3 top-3 bg-[#fdfbf7] rounded-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 md:p-8 text-stone-800 text-left overflow-hidden max-h-[75vh]"
                >
                  {/* Modern Subtle Gold Divider Accent */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-70" />

                  {/* Letter Content */}
                  <div className="max-h-[58vh] overflow-y-auto pr-2 custom-scrollbar font-serif text-sm md:text-base leading-relaxed space-y-4 text-stone-800">
                    <motion.div
                      initial="hidden"
                      animate={stage === "letterOpen" ? "visible" : "hidden"}
                      variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                      }}
                      className="space-y-4"
                    >
                      <motion.p 
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                        className="text-xl font-medium text-stone-900 font-serif"
                      >
                        Dear Aarya,
                      </motion.p>
                      
                      <motion.p 
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                        className="text-2xl font-bold text-[#ff2a85] tracking-tight font-serif"
                      >
                        Happy Birthday! 🎉
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        I wanted to make something a little different this year, so instead of sending just another message, I made this small surprise especially for you.
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        Thank you for being such a wonderful friend. From all the random conversations to the funny moments and the memories we&apos;ve shared, they&apos;ve all made our friendship special.
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        I hope this birthday marks the beginning of another amazing year filled with happiness, success, good health, exciting adventures, and countless reasons to smile.
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        Keep being the kind, cheerful, and genuine person you are because that&apos;s what makes you truly special.
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        May every dream you&apos;re working towards come true, and may life always bring you people and moments that make you happy.
                      </motion.p>

                      <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                        Enjoy your day to the fullest, make lots of memories, and don&apos;t forget to smile a little extra today—it&apos;s your day after all.
                      </motion.p>

                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                        className="pt-4 border-t border-stone-200 flex flex-col items-end"
                      >
                        <p className="font-semibold text-stone-900">Happy Birthday once again! 🎂✨</p>
                        <p className="italic font-medium text-[#ff2a85] mt-1 font-sans tracking-wide">— Heet</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}