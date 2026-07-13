"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const { x, y } = useMousePosition();
  
  // Parallax dynamic mapping values
  const transformX = (x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * 0.03;
  const transformY = (y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * 0.03;

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Background radial soft light aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <motion.div
        style={{ x: transformX, y: transformY }}
        className="text-center z-20 space-y-6 max-w-4xl"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-8xl tracking-tight leading-none bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
        >
         Happiest Birthday✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-neutral-400 text-sm md:text-lg tracking-widest max-w-lg mx-auto uppercase"
        >
          
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-500 hover:text-accent transition-colors duration-300"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Open Your Surprise 🎁</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}