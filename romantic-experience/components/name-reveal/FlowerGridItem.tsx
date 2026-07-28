"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FlowerQuality } from "@/types";
import { SunflowerSVG, RoseSVG, TulipSVG, LavenderSVG, DaisySVG } from "./BotanicalSVGs";

interface FlowerGridItemProps {
  item: FlowerQuality;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function FlowerGridItemComponent({ item, isSelected, onSelect }: FlowerGridItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -6 }}
      whileTap={{ scale: 0.94 }}
      onClick={onSelect}
      aria-label={`Bloom ${item.flowerName} for letter ${item.char}`}
      className={`relative w-28 xs:w-32 sm:w-36 md:w-40 h-40 xs:h-44 sm:h-48 rounded-2xl p-3 flex flex-col items-center justify-between border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bg-gradient-to-b from-[#1a1818] via-[#0d0d0d] to-[#141212] border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.4)]"
          : "bg-white/[0.03] backdrop-blur-md border-white/15 hover:border-[#ff2a85]/50 hover:shadow-[0_0_20px_rgba(255,42,133,0.25)]"
      }`}
    >
      <div className="w-full flex items-center justify-between px-1">
        <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
          {item.char}
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] text-[#FFD700] uppercase tracking-wider opacity-90">
          {item.meaning}
        </span>
      </div>

      <div className="relative my-auto flex items-center justify-center">
        <motion.div
          animate={{
            scale: isSelected ? 1.25 : 1,
            rotate: isSelected ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            duration: isSelected ? 1 : 0.3,
            ease: "easeInOut",
          }}
          className="drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]"
        >
          {item.flowerType === "sunflower" && <SunflowerSVG size="w-16 h-16 sm:w-20 sm:h-20" />}
          {item.flowerType === "rose" && <RoseSVG size="w-14 h-14 sm:w-18 sm:h-18" />}
          {item.flowerType === "tulip" && <TulipSVG size="w-14 h-14 sm:w-18 sm:h-18" />}
          {item.flowerType === "lavender" && <LavenderSVG size="w-12 h-12 sm:w-16 sm:h-16" />}
          {item.flowerType === "daisy" && <DaisySVG size="w-14 h-14 sm:w-18 sm:h-18" />}
        </motion.div>
      </div>

      <div className="w-full text-center">
        <p className="font-serif italic text-[10px] sm:text-xs text-neutral-300 line-clamp-1">
          {item.flowerName}
        </p>
      </div>
    </motion.button>
  );
}

export const FlowerGridItem = memo(FlowerGridItemComponent);
