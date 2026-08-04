"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WishStage } from "@/types";
import { safeConfetti, triggerCelebrationConfetti } from "@/lib/confetti";
import { playWhooshSound } from "@/lib/audioSynthesis";
import { Cake3D } from "./timeline/Cake3D";

export default function Timeline() {
  const [stage, setStage] = useState<WishStage>("idle");
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isBlownRef = useRef<boolean>(false);

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      if (stage === "holding" || stage === "idle") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu, { passive: false });
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, [stage]);

  const triggerStardust = useCallback(() => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#FFD700", "#FFA500", "#ffffff", "#ff2a85"];

    (function frame() {
      safeConfetti({
        particleCount: 8,
        angle: 60,
        spread: 120,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        disableForReducedMotion: true,
      });
      safeConfetti({
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
  }, []);

  // Blow Out / Extinguish Candles Handler (Triggered by Tap or Press & Hold)
  const handleBlowOut = useCallback(() => {
    if (isBlownRef.current || stage === "darkness" || stage === "revealed") return;
    isBlownRef.current = true;

    // 1. Play soft organic blowing sound
    playWhooshSound();

    // 2. Extinguish candle flames, darken wicks, and puff smoke
    setStage("darkness");

    // 3. Reveal wish message and launch celebration confetti after 600ms
    setTimeout(() => {
      setStage("revealed");
      triggerCelebrationConfetti();
      triggerStardust();
    }, 600);
  }, [stage, triggerStardust]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      touchStartY.current = e.clientY;
      if (stage === "idle" && !isBlownRef.current) {
        holdTimerRef.current = setTimeout(() => {
          setStage("holding");
        }, 150);
      }
    },
    [stage]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (touchStartY.current !== null && Math.abs(e.clientY - touchStartY.current) > 20) {
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        if (stage === "holding") {
          setStage("idle");
        }
      }
    },
    [stage]
  );

  const handlePointerUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    touchStartY.current = null;

    if (stage === "holding" && !isBlownRef.current) {
      handleBlowOut();
    }
  }, [stage, handleBlowOut]);

  return (
    <section
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#030303] overflow-hidden select-none touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="absolute inset-0 z-0 cursor-pointer pointer-events-auto" />

      {/* Radial Ambient Background Glow */}
      <motion.div
        animate={{
          opacity: stage === "darkness" || stage === "revealed" ? 0 : [0.15, 0.25, 0.15],
          scale: stage === "darkness" || stage === "revealed" ? 0.8 : [1, 1.05, 1],
        }}
        transition={{
          duration: stage === "darkness" || stage === "revealed" ? 1.5 : 4,
          repeat: stage === "darkness" || stage === "revealed" ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-radial from-amber-500/20 via-[#ff2a85]/5 to-transparent blur-[120px] pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-4 mt-12 md:mt-8 py-4">
        {/* Header Text, Instructions & Revealed Wish */}
        <div className="min-h-[5rem] md:min-h-[7rem] flex flex-col items-center justify-center mb-4 md:mb-6 text-center w-full">
          <AnimatePresence mode="wait">
            {stage === "idle" && (
              <motion.div
                key="text-idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 pointer-events-none"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-200 drop-shadow-md">
                  Close your eyes & make a wish.
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff2a85] drop-shadow-[0_0_8px_rgba(255,42,133,0.5)]">
                  Press and hold the screen or tap the candles
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

            {stage === "revealed" && (
              <motion.div
                key="text-revealed"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center space-y-3 md:space-y-5 max-w-xl mx-auto pointer-events-none"
              >
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-serif text-xl md:text-3xl text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] italic"
                >
                  ✨ Your wish has been made. Happy Birthday! ❤️
                </motion.p>

                <motion.h2
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,42,133,0)",
                      "0 0 40px rgba(255,42,133,0.5)",
                      "0 0 20px rgba(255,42,133,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
                >
                  Cheers to 17🥳<br />
                  <span className="italic text-amber-200">Wishing you endless happiness.</span>
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3D Birthday Cake */}
        <Cake3D stage={stage} onCakeClick={handleBlowOut} />
      </div>
    </section>
  );
}