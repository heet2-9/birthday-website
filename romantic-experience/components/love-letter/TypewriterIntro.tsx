"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { INTRO_LINES } from "@/data/story";

interface TypewriterIntroProps {
  isInView: boolean;
  onComplete: () => void;
}

export function TypewriterIntro({ isInView, onComplete }: TypewriterIntroProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio("/typewriter.mp3");
      audio.volume = 0.15;
      audio.addEventListener("error", () => {
        audioRef.current = null;
      });
      audioRef.current = audio;
    } catch {
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const currentLine = INTRO_LINES[currentLineIndex];

    if (displayedText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, displayedText.length + 1));
        if (audioRef.current && audioRef.current.readyState >= 2) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }, 85);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (currentLineIndex < INTRO_LINES.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedText("");
        } else {
          onComplete();
        }
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLineIndex, isInView, onComplete]);

  return (
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
  );
}
