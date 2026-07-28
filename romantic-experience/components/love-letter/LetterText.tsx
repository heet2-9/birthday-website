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
          My Dearest Aarya,
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="text-2xl font-bold text-[#ff2a85] tracking-tight font-serif"
        >
          Happy Birthday, My Love ❤️
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          They say that home is a place, but ever since you walked into my life, I realised home is a person. It is in the gentle sound of your voice, the warmth of your laughter, and the peace I feel whenever you are near.
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          You bring a light into this world that cannot be described—only felt. Thank you for your warmth, your boundless kindness, your strength, and for making every ordinary day feel like an extraordinary blessing.
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          On your special day, my deepest wish is for your heart to be as full of happiness as you make mine every single day. May all your dreams unfold gracefully, and may life always treat you with the sweetness you deserve.
        </motion.p>

        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          I promise to stand by your side through every season, celebrating your triumphs, holding your hand through life&apos;s quiet moments, and loving you more with each passing sunset.
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="pt-4 border-t border-stone-200 flex flex-col items-end"
        >
          <p className="font-semibold text-stone-900">Forever and always, 💖</p>
          <p className="italic font-medium text-[#ff2a85] mt-1 font-sans tracking-wide">— Yours, Heet</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
