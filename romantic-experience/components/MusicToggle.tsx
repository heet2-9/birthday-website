"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-calculated particle data for performance
const DUST_PARTICLES = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  x: (i % 2 === 0 ? 1 : -1) * (10 + i * 6),
  delay: i * 0.4,
  duration: 2.5 + i * 0.3,
}));

const MUSIC_NOTES = ["♪", "♫", "♩", "♬"];

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [notes, setNotes] = useState<{ id: number; char: string; x: number }[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio("/birthday-piano.mpeg");
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Periodically generate musical notes while playing
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const newNote = {
        id: Date.now(),
        char: MUSIC_NOTES[Math.floor(Math.random() * MUSIC_NOTES.length)],
        x: (Math.random() - 0.5) * 40,
      };
      setNotes((prev) => [...prev.slice(-4), newNote]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Audio Fade In / Fade Out Logic
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (!isPlaying) {
      // PLAY WITH FADE IN
      audioRef.current.play().catch((err) => {
        console.log("Audio playback hurdle: ", err);
      });

      setIsPlaying(true);
      
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && vol < 0.8) {
          vol = Math.min(0.8, vol + 0.08);
          audioRef.current.volume = vol;
        } else {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 100);
    } else {
      // PAUSE WITH FADE OUT
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && vol > 0.05) {
          vol = Math.max(0, vol - 0.08);
          audioRef.current.volume = vol;
        } else {
          if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.pause();
          }
          setIsPlaying(false);
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 100);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col items-center">
      
      {/* Ambient Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {DUST_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [-5, -25, -5],
              x: [p.x, p.x + (p.id % 2 === 0 ? 8 : -8), p.x],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-[#FFD700] shadow-[0_0_6px_#FFD700]"
          />
        ))}
      </div>

      {/* Floating Musical Notes */}
      <AnimatePresence>
        {isPlaying &&
          notes.map((note) => (
            <motion.span
              key={note.id}
              initial={{ opacity: 0, y: 0, x: note.x, scale: 0.6, rotate: 0 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: -50,
                x: note.x + (note.id % 2 === 0 ? 15 : -15),
                scale: [0.6, 1.1, 0.8],
                rotate: note.id % 2 === 0 ? 20 : -20,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute top-0 font-serif text-amber-200 text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] pointer-events-none select-none z-50"
            >
              {note.char}
            </motion.span>
          ))}
      </AnimatePresence>

      {/* MAIN VINTAGE MUSIC BOX CONTAINER */}
      <motion.div
        animate={{
          y: isPlaying ? [-2, 2, -2] : [-3, 3, -3],
          rotate: isHovered && !isPlaying ? [-1, 1, -1] : [0, 0.5, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: isHovered ? 0.3 : 6, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={toggleMusic}
        className="relative cursor-pointer select-none group perspective-[800px]"
      >
        {/* Golden Base Aura Glow */}
        <motion.div
          animate={{
            opacity: isPlaying ? [0.6, 0.9, 0.6] : isHovered ? 0.5 : 0.25,
            scale: isPlaying ? [1.1, 1.25, 1.1] : isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-500/30 via-[#ff2a85]/30 to-amber-400/30 blur-md pointer-events-none"
        />

        {/* 1. BALLERINA FIGURINE (Rises out when opened) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 flex flex-col items-center pointer-events-none z-10">
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ y: 15, opacity: 0, scale: 0.5 }}
                animate={{ y: -26, opacity: 1, scale: 1 }}
                exit={{ y: 15, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="flex flex-col items-center"
              >
                {/* Rotating Ballerina Silhouette */}
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-8 relative flex flex-col items-center justify-center filter drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Ballerina Head & Arms */}
                  <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-200 to-white" />
                  <div className="w-4 h-0.5 bg-amber-200 rounded-full my-0.5" />
                  {/* Dress / Tutu */}
                  <div className="w-3.5 h-3 bg-gradient-to-b from-[#ff2a85] to-amber-300 rounded-[50%_50%_20%_20%]" />
                  {/* Legs */}
                  <div className="w-0.5 h-2.5 bg-amber-200" />
                </motion.div>

                {/* Pedestal Mirror Base Inside Box */}
                <div className="w-5 h-1 bg-amber-300 rounded-full shadow-[0_0_5px_#ffd700] -mt-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. THE WOODEN MUSIC BOX BODY */}
        <div className="relative w-16 h-12 rounded-xl bg-gradient-to-b from-[#3a2012] via-[#2a150a] to-[#1a0b04] border border-[#8b5a2b]/60 shadow-[0_12px_25px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col justify-between overflow-hidden p-1.5 z-20">
          
          {/* Gold Filigree Corner Accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-400/80 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-amber-400/80 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-amber-400/80 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-400/80 rounded-br-sm pointer-events-none" />

          {/* Front Center Keyhole / Lock Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 border border-amber-300/60 shadow-sm flex items-center justify-center">
            <div className="w-1 h-1.5 bg-[#1a0b04] rounded-full" />
          </div>

          {/* Wood Grain Texture Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_50%,transparent_100%)] pointer-events-none" />
        </div>

        {/* 3. HINGED BOX LID (Opens 3D backward when playing) */}
        <motion.div
          animate={{
            rotateX: isPlaying ? -110 : isHovered ? -12 : 0,
            y: isPlaying ? -2 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          className="absolute inset-x-0 top-0 h-6 rounded-t-xl bg-gradient-to-b from-[#4a2b18] via-[#3a2012] to-[#2a150a] border border-amber-500/50 shadow-md z-30 flex items-center justify-center overflow-hidden"
        >
          {/* Gold Inlay Frame on Top of Lid */}
          <div className="w-12 h-3.5 rounded-md border border-amber-400/60 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#ffd700]" />
          </div>
        </motion.div>

        {/* Brass Winding Key (Visible on right side) */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-400 bg-amber-600 shadow-sm flex items-center justify-center z-10"
        >
          <div className="w-1 h-1 bg-amber-200 rounded-full" />
        </motion.div>

      </motion.div>

      {/* Tiny Status Label under the Music Box */}
      <motion.span 
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        className="font-mono text-[9px] uppercase tracking-widest text-amber-200/80 mt-2 text-glow select-none"
      >
        {isPlaying ? "Music On" : "Music Off"}
      </motion.span>

    </div>
  );
}