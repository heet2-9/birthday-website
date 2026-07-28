"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { MemoryItem } from "@/types";

interface PhotoLightboxProps {
  memory: MemoryItem;
  onClose: () => void;
}

export function PhotoLightbox({ memory, onClose }: PhotoLightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6"
      onClick={onClose}
    >
      <button
        aria-label="Close photo preview"
        className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors p-2"
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <motion.img
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        src={memory.src}
        alt={memory.title}
        className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}
