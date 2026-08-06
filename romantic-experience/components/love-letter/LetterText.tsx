"use client";

import React from "react";
import { motion } from "framer-motion";

interface LetterTextProps {
  stage: string;
}

export function LetterText({ stage }: LetterTextProps) {
  return (
    <div className="max-h-[58vh] overflow-y-auto pr-2 custom-scrollbar font-serif text-sm md:text-base leading-relaxed space-y-4 text-stone-800">
      <motion.div
        initial="hidden"
        animate={stage === "letterOpen" ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="space-y-4"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="text-xl font-medium text-stone-900 font-serif"
        >
          My Dearest Madam Jii🤭🥹,
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="text-2xl font-bold text-[#ff2a85] tracking-tight font-serif"
        >
          Happiest Birthday Ever😘💕
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          Aarya you&apos;re a very very special person in my life❤️.....
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          I&apos;m the luckiest guy in the world to have you babyy !!🤭🥰
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          On your special day, my deepest wish is for your heart to be as full of happiness as you make mine every single day
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          I promise to stand by your side always, holding your hand through life&apos;s quiet moments and loving you to my fullest🫣😘❤️
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="pt-4 border-t border-stone-200 flex flex-col items-end"
        >
          <p className="font-semibold text-stone-900">Forever and always.. 💖</p>
          <p className="italic font-medium text-[#ff2a85] mt-1 font-sans tracking-wide">— Yours, Heetudaa🤭❤️🥹</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
