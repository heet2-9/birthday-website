"use client";

import { motion } from "framer-motion";

export default function FinalScene() {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4 text-center">
      {/* Aurora Radial Center Ambient Backdrop */}
      <div className="absolute w-[800px] h-[400px] bottom-0 rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="space-y-6 max-w-2xl z-20"
      >
        <motion.div 
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-accent text-6xl md:text-7xl mb-6 select-none"
        >
          ✦
        </motion.div>
        
        <h2 className="font-serif text-4xl md:text-7xl tracking-tight text-white">
          Finis et Principium.
        </h2>
        
        <p className="font-sans text-neutral-400 text-xs md:text-sm tracking-[0.3em] uppercase max-w-md mx-auto leading-relaxed">
          Thank you for exploring this architecture. May our telemetry run perfectly indefinitely.
        </p>
      </motion.div>
    </section>
  );
}