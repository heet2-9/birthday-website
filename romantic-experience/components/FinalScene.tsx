"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function FinalScene() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 sm:py-20 px-3 sm:px-6 bg-[#030303] overflow-hidden text-center">
      <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#ff2a85]/10 via-amber-500/10 to-transparent blur-[100px] sm:blur-[160px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8 px-2"
      >
        <div className="flex items-center justify-center gap-2 text-[#ff2a85]">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-mono text-[9px] sm:text-xs tracking-[0.25em] uppercase">Until Next Year</span>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight">
          May Your Day Be As <br />
          <span className="italic text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent via-rose-300 to-amber-200">
            Beautiful As You
          </span>
        </h2>

        <p className="font-serif text-xs sm:text-base md:text-lg text-neutral-300 max-w-md mx-auto leading-relaxed italic">
          Created with all my heart, especially for Aarya. Happy Birthday!
        </p>

        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="pt-2 sm:pt-4 flex justify-center"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#ff2a85] to-amber-300 p-0.5 shadow-[0_0_25px_rgba(255,42,133,0.6)]">
            <div className="w-full h-full rounded-full bg-[#0d0d0d] flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2a85] fill-[#ff2a85]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-4 inset-x-0 text-center font-mono text-[8px] sm:text-[10px] text-neutral-600 uppercase tracking-widest px-2">
        
      </div>
    </section>
  );
}