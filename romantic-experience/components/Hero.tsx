"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowDown, Sparkles, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

// --- CUSTOMIZABLE ALBUM / KEEPSAKE PHOTO PATH ---
const PLAYER_BG_IMAGE = "/images/music-player-bg.jpeg";

// --- PRE-CALCULATED RANDOM DATA FOR HERO EFFECTS ---
const STARS = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 2,
  duration: 1.5 + Math.random() * 2,
}));

const DUST = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
  duration: 8 + Math.random() * 7,
  size: Math.random() * 3 + 1,
}));

const EMOJIS = ["🎉", "🎂", "🎈", "✨", "💖", "🎁", "🎊", "🌟"];
const FLOATING_EMOJIS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  left: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 2,
  duration: 6 + Math.random() * 4,
  rotation: (Math.random() - 0.5) * 45,
}));

const BALLOONS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  delay: Math.random() * 1.5,
  duration: 7 + Math.random() * 5,
  color: ["#ff2a85", "#ffffff", "#f5efe2"][Math.floor(Math.random() * 3)],
  scale: 0.7 + Math.random() * 0.6,
}));

// Pre-calculated bar heights for the bottom decorative audio waveform visualizer (compact fit)
const VISUALIZER_BARS = [8, 15, 10, 18, 9, 21, 13, 24, 12, 17, 10, 20, 15, 10, 17, 8];

export default function Hero() {
  const [stage, setStage] = useState<"idle" | "launching" | "fireworks">("idle");
  const fireworkIntervalRef = useRef<number | null>(null);

  // --- MUSIC PLAYER STATE & LOGIC ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/birthday-piano.mpeg");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 180);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (!isPlaying) {
      audioRef.current.play().catch((err) => console.log("Audio playback:", err));
      setIsPlaying(true);

      let vol = 0;
      audioRef.current.volume = 0;
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && vol < volume) {
          vol = Math.min(volume, vol + 0.08);
          audioRef.current.volume = vol;
        } else {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 80);
    } else {
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
      }, 80);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // --- FIREWORKS LOGIC ---
  const startFireworkShow = () => {
    if (fireworkIntervalRef.current) {
      window.clearInterval(fireworkIntervalRef.current);
      fireworkIntervalRef.current = null;
    }

    const duration = 3_500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 22, spread: 360, ticks: 45, zIndex: 0, disableForReducedMotion: true };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    fireworkIntervalRef.current = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        if (fireworkIntervalRef.current) {
          window.clearInterval(fireworkIntervalRef.current);
          fireworkIntervalRef.current = null;
        }
        return;
      }

      const particleCount = Math.max(10, Math.round(18 * (timeLeft / duration)));

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.35) },
        colors: ["#ff2a85", "#ff73b3", "#ffffff", "#f5efe2", "#ba1c5c"],
      });
    }, 400);
  };

  const triggerPartyPoppers = () => {
    const popperColors = ["#ff2a85", "#ffffff", "#FFD700"];
    confetti({ particleCount: 80, spread: 70, origin: { x: 0, y: 1 }, angle: 60, colors: popperColors, startVelocity: 45, zIndex: 100 });
    confetti({ particleCount: 80, spread: 70, origin: { x: 1, y: 1 }, angle: 120, colors: popperColors, startVelocity: 45, zIndex: 100 });
  };

  const handleLaunch = () => {
    if (stage !== "idle") return;
    setStage("launching");

    setTimeout(() => {
      setStage("fireworks");
      triggerPartyPoppers();
      startFireworkShow();
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (fireworkIntervalRef.current) {
        window.clearInterval(fireworkIntervalRef.current);
        fireworkIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 py-4">
      {/* Ambient background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />

      {/* STAGE 3 BACKGROUND ENHANCEMENTS */}
      <AnimatePresence>
        {stage === "fireworks" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,42,133,0.03)_15deg,transparent_30deg,rgba(255,42,133,0.03)_45deg,transparent_60deg)] rounded-full"
            />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center justify-center w-full z-20 my-auto">
        <AnimatePresence mode="wait">
          
          {/* --- STAGE 1 & 2: LAUNCHER & NARROWER, SHORTER KEEPSAKE MUSIC PLAQUE DISPLAY --- */}
          {(stage === "idle" || stage === "launching") && (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
              className="flex flex-col items-center gap-2.5 sm:gap-3 w-full max-w-lg"
            >
              <div className="text-center space-y-0.5 mt-0.5">
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  Let&apos;s <span className="italic text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light text-glow">Celebrate</span>
                </h1>
                <p className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest">
                  {stage === "idle" ? "Click the rocket to begin the celebration" : "Liftoff initiated..."}
                </p>
              </div>

              {/* Rocket Launcher Icon */}
              <motion.div
                animate={
                  stage === "launching"
                    ? { y: -1000, scale: 0.5, opacity: 0, transition: { duration: 1.5, ease: "easeIn" } }
                    : { y: [0, -5, 0] }
                }
                transition={stage === "idle" ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}}
                whileHover={stage === "idle" ? { scale: 1.06 } : {}}
                onClick={handleLaunch}
                className="glass-panel p-3.5 sm:p-4 rounded-full cursor-pointer flex items-center justify-center text-accent box-glow bg-accent/5 border border-accent/20 relative group my-0.5"
              >
                <motion.div
                  animate={stage === "launching" ? { x: [-3, 3, -3, 3, 0], y: [2, -2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Rocket className="w-7 h-8 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                </motion.div>
                
                {stage === "launching" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 2 }}
                    className="absolute -bottom-8 w-5 h-14 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent blur-md rounded-full"
                  />
                )}
              </motion.div>

              {/* --- KEEPSAKE MUSIC PLAQUE DISPLAY (18% NARROWER, 12% SHORTER) --- */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full flex justify-center items-center relative select-none mt-0.5"
              >
                {/* Dynamic Ambient Aura Behind Plaque */}
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.12, 1] : 1,
                    opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.18,
                  }}
                  transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
                  className="absolute w-[200px] h-[240px] rounded-2xl bg-gradient-to-tr from-[#ff2a85] via-amber-400/20 to-transparent blur-[60px] pointer-events-none z-0"
                />

                {/* Main Acrylic Frosted Plaque Card (18% Narrower, Tighter Heights & Paddings) */}
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative w-[185px] sm:w-[200px] rounded-2xl bg-[#0d0d0d]/85 backdrop-blur-2xl border border-white/20 p-2.5 sm:p-3 shadow-[0_18px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.3)] z-20 overflow-hidden flex flex-col items-center gap-2 transition-all duration-300 hover:border-[#ff2a85]/40 hover:shadow-[0_0_24px_rgba(255,42,133,0.25)]"
                >
                  {/* Subtle Champagne Gold Inner Rim */}
                  <div className="absolute inset-1 rounded-[13px] border border-[#FFD700]/30 pointer-events-none z-10" />

                  {/* Glass Glare Sweep Across Card */}
                  <motion.div
                    animate={{ x: ["-100%", "250%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none z-30"
                  />

                  {/* --- 1. LARGE TOP ALBUM / PHOTO BOX (NARROWER & PROPORTIONALLY SHORTER) --- */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.8)] border border-white/20 z-20 bg-black/40">
                    <Image
                      src={PLAYER_BG_IMAGE}
                      alt="Keep Sake Album Photo"
                      fill
                      sizes="200px"
                      className="object-cover"
                      priority
                    />
                    {/* Glass sheen on image top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />
                  </div>

                  {/* --- 2. SONG TITLE & SUBTITLE --- */}
                  <div className="text-center space-y-0.5 w-full z-20 px-0.5">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles className="w-2 h-2 text-[#ff2a85]" />
                      <h3 className="font-serif text-xs sm:text-sm text-white tracking-tight font-semibold">
                        For Aarya <span className="text-[#ff2a85]">❤️</span>
                      </h3>
                      <Sparkles className="w-2 h-2 text-[#ff2a85]" />
                    </div>
                    <p className="font-mono text-[7px] sm:text-[7.5px] text-amber-200/80 uppercase tracking-[0.16em]">
                      Birthday Symphony • Special Edition
                    </p>
                  </div>

                  {/* --- 3. PROGRESS BAR & TIMESTAMPS --- */}
                  <div className="w-full space-y-0.5 z-20 px-0.5">
                    <div className="relative w-full flex items-center">
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-0.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#ff2a85] focus:outline-none shadow-sm"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[7.5px] font-mono text-neutral-300">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* --- 4. PLAYBACK CONTROLS --- */}
                  <div className="flex items-center justify-between w-full z-20 px-1 pt-0.5">
                    
                    {/* Volume Button + Hover Slider */}
                    <div 
                      className="relative flex items-center"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <button
                        onClick={toggleMute}
                        className="p-0.5 text-neutral-300 hover:text-[#ff2a85] transition-colors duration-200"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-3 h-3 text-[#ff2a85]" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </button>

                      <AnimatePresence>
                        {showVolumeSlider && (
                          <motion.div
                            initial={{ opacity: 0, x: -5, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -5 }}
                            className="absolute left-5 bg-black/90 border border-white/20 rounded-full px-1.5 py-0.5 flex items-center shadow-xl z-50 backdrop-blur-md"
                          >
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.01}
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-10 h-0.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ff2a85]"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Media Control Buttons */}
                    <div className="flex items-center gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-0.5 text-neutral-300 hover:text-white transition-colors"
                      >
                        <SkipBack className="w-3 h-3" />
                      </motion.button>

                      {/* Main Play / Pause Button */}
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={togglePlay}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-white via-amber-100 to-[#ff2a85] text-black flex items-center justify-center shadow-[0_0_12px_rgba(255,42,133,0.5)] hover:shadow-[0_0_20px_rgba(255,42,133,0.8)] transition-all duration-300"
                      >
                        {isPlaying ? (
                          <Pause className="w-3 h-3 fill-black" />
                        ) : (
                          <Play className="w-3 h-3 fill-black ml-0.5" />
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-0.5 text-neutral-300 hover:text-white transition-colors"
                      >
                        <SkipForward className="w-3 h-3" />
                      </motion.button>
                    </div>

                    {/* Right spacer for alignment */}
                    <div className="w-4" />
                  </div>

                  {/* --- 5. CUSTOM DECORATIVE AUDIO SOUNDWAVE VISUALIZER --- */}
                  <div className="w-full flex items-center justify-center gap-0.5 pt-0.5 pb-0.5 z-20">
                    {VISUALIZER_BARS.map((height, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          height: isPlaying 
                            ? [height * 0.4, height * 1.1, height * 0.5] 
                            : [3, 4, 3],
                          opacity: isPlaying ? [0.6, 1, 0.6] : 0.35,
                        }}
                        transition={{
                          duration: isPlaying ? 0.4 + (idx % 5) * 0.1 : 3,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                          delay: idx * 0.05,
                        }}
                        className="w-0.5 rounded-full bg-gradient-to-t from-[#ff2a85] via-pink-300 to-[#FFD700] shadow-[0_0_3px_rgba(255,42,133,0.6)]"
                        style={{ minHeight: "2.5px" }}
                      />
                    ))}
                  </div>

                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* --- STAGE 3: THE FIREWORK TEXT REVEAL & CELEBRATION --- */}
          {stage === "fireworks" && (
            <motion.div
              key="fireworks-text"
              className="text-center flex flex-col items-center justify-center space-y-4 md:space-y-8 absolute inset-0 w-full h-full"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
              />

              {/* Magical Dust */}
              {DUST.map((p) => (
                <motion.div
                  key={`dust-${p.id}`}
                  initial={{ opacity: 0, y: "100vh", x: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: "-20vh", x: [0, 30, -30, 0] }}
                  transition={{ duration: p.duration, delay: p.delay, ease: "linear", repeat: Infinity }}
                  className="absolute rounded-full bg-accent z-10 pointer-events-none shadow-[0_0_8px_rgba(255,42,133,0.8)]"
                  style={{ left: p.left, width: p.size, height: p.size }}
                />
              ))}

              {/* Twinkling Stars */}
              {STARS.map((s) => (
                <motion.div
                  key={`star-${s.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
                  className="absolute w-1 h-1 bg-white rounded-full z-10 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  style={{ left: s.left, top: s.top }}
                />
              ))}

              {/* Floating Balloons */}
              {BALLOONS.map((b) => (
                <motion.div
                  key={`balloon-${b.id}`}
                  initial={{ opacity: 0, y: "100vh", rotate: -10 }}
                  animate={{ opacity: 1, y: "-20vh", rotate: 10 }}
                  transition={{ duration: b.duration, delay: b.delay, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  className="absolute z-10 pointer-events-none flex flex-col items-center"
                  style={{ left: b.left, transform: `scale(${b.scale})` }}
                >
                  <div 
                    className="w-12 h-16 relative shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.2)]" 
                    style={{ backgroundColor: b.color, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%" }}
                  >
                    <div className="absolute top-2 left-2 w-3 h-5 bg-white/40 rounded-full blur-[2px] rotate-45" />
                    <div 
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-t-[6px] border-l-[4px] border-r-[4px] border-transparent" 
                      style={{ borderTopColor: b.color }} 
                    />
                  </div>
                  <div className="w-[1px] h-20 bg-white/20 -mt-1" />
                </motion.div>
              ))}

              {/* Celebration Emojis */}
              {FLOATING_EMOJIS.map((e) => (
                <motion.div
                  key={`emoji-${e.id}`}
                  initial={{ opacity: 0, y: "100vh", rotate: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], y: "-20vh", rotate: e.rotation }}
                  transition={{ duration: e.duration, delay: e.delay, ease: "linear", repeat: Infinity }}
                  className="absolute text-2xl md:text-3xl z-10 pointer-events-none drop-shadow-lg"
                  style={{ left: e.left }}
                >
                  {e.emoji}
                </motion.div>
              ))}

              {/* Gift Boxes */}
              <motion.div 
                initial={{ opacity: 0, x: -100, scale: 0.5, rotate: -20 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 4, delay: 0.5, ease: "easeOut" }}
                className="absolute left-10 md:left-32 bottom-20 text-5xl z-30 pointer-events-none drop-shadow-xl"
              >
                🎁
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 100, scale: 0.5, rotate: 20 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 4, delay: 0.8, ease: "easeOut" }}
                className="absolute right-10 md:right-32 top-32 text-6xl z-30 pointer-events-none drop-shadow-xl"
              >
                🎁
              </motion.div>

              {/* Birthday Text Reveal */}
              <div className="relative z-40 flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-40px] pointer-events-none z-50 rounded-full"
                >
                  <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                  <Sparkles className="absolute bottom-0 right-1/4 w-6 h-6 text-accent drop-shadow-[0_0_10px_rgba(255,42,133,1)]" />
                </motion.div>

                <motion.h2
                  initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)", textShadow: ["0 0 20px rgba(255, 255, 255, 0.4)", "0 0 60px rgba(255, 255, 255, 0.8)", "0 0 20px rgba(255, 255, 255, 0.4)"] }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 40, damping: 12, delay: 0.2 },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="font-serif text-5xl md:text-8xl lg:text-[7rem] font-bold text-white tracking-tight leading-none text-glow mt-12 relative overflow-hidden"
                >
                  HAPPY
                  <br />
                  BIRTHDAY
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 mix-blend-overlay pointer-events-none"
                  />
                </motion.h2>

                <motion.div
                  initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)", textShadow: ["0 0 30px rgba(255, 42, 133, 0.6)", "0 0 80px rgba(255, 42, 133, 1)", "0 0 30px rgba(255, 42, 133, 0.6)"] }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 40, damping: 12, delay: 0.6 },
                    textShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  className="font-serif text-6xl md:text-9xl lg:text-[9rem] font-bold text-accent tracking-tighter leading-none box-glow relative overflow-hidden"
                >
                  AARYA
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 mix-blend-overlay pointer-events-none"
                  />
                </motion.div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {stage === "fireworks" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="absolute bottom-3 flex flex-col items-center gap-1 text-neutral-500 hover:text-accent transition-colors duration-300 z-50"
          >
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm">Scroll to Discover</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}