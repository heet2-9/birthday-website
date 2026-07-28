"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WishStage } from "@/types";

interface CandleFlameProps {
  stage: WishStage;
}

export function CandleFlame({ stage }: CandleFlameProps) {
  return (
    <>
      <AnimatePresence>
        {(stage === "idle" || stage === "holding") && (
          <motion.div
            key="flame"
            exit={{ opacity: 0, scale: 0, y: -10 }}
            className="absolute -top-14 flex flex-col items-center justify-end h-16 w-10"
          >
            <motion.div
              animate={{
                scale: stage === "holding" ? [1.5, 1.8, 1.6] : [1, 1.2, 1],
                opacity: stage === "holding" ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 0.2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
              className={`absolute bottom-2 w-12 h-12 rounded-full blur-[12px] ${
                stage === "holding" ? "bg-amber-400" : "bg-orange-500"
              }`}
            />
            <motion.div
              animate={{
                y: stage === "holding" ? [0, -6, 0] : [0, -2, 0],
                scale: stage === "holding" ? [1, 1.3, 1] : [1, 1.05, 1],
                rotate: [-2, 2, -1],
              }}
              transition={{ duration: 0.15 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1 w-4 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-[50%_50%_20%_20%] shadow-[0_0_10px_rgba(251,191,36,0.6)] z-10"
              style={{ borderRadius: "50% 50% 20% 20% / 60% 60% 20% 20%" }}
            />
            <motion.div
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute bottom-2 w-1.5 h-4 bg-white rounded-full blur-[1px] z-20 shadow-[0_0_5px_rgba(255,255,255,1)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === "darkness" || stage === "revealed") && (
          <motion.div key="smoke" className="absolute -top-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0.8, y: 0, scale: 0.5, x: 0 }}
              animate={{ opacity: 0, y: -80, scale: 3, filter: "blur(12px)", x: [0, -10, 10, -5] }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="w-3 h-10 bg-neutral-300/40 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
