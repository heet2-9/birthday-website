"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowDown, Sparkles, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFX } from "@/lib/soundFX";

const PLAYER_BG_IMAGE = "/images/music-player-bg.jpeg";

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

// Inside components/Hero.tsx (Top Constants)

const EXTRA_EMOJIS = ["🎉", "🎈", "🎂", "🎁", "✨", "🌟", "🥳", "🎊"];

const EARLY_BALLOONS = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: `${5 + (i * 6) + (Math.random() * 2 - 1)}%`,
  delay: i * 0.08, // Staggered entry starting ~400ms after launch
  duration: 4.5 + Math.random() * 2.5,
  color: ["#ff2a85", "#ffffff", "#FFD700", "#ff73b3"][i % 4],
  scale: 0.5 + Math.random() * 0.4,
  swing: (Math.random() - 0.5) * 40,
}));

const EARLY_EMOJIS = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  emoji: EXTRA_EMOJIS[i % EXTRA_EMOJIS.length],
  left: `${4 + (i * 5.2)}%`,
  delay: 0.1 + i * 0.06,
  duration: 4 + Math.random() * 2.5,
  rotation: (Math.random() - 0.5) * 60,
  drift: (Math.random() - 0.5) * 30,
}));

const VISUALIZER_BARS = [8, 15, 10, 18, 9, 21, 13, 24, 12, 17, 10, 20, 15, 10, 17, 8];

export default function Hero() {
  const [stage, setStage] = useState<"idle" | "launching" | "fireworks">("idle");
  const fireworkIntervalRef = useRef<number | null>(null);

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
    audioRef.current.volume = soundFX.getMusicVolume();

    soundFX.registerBackgroundMusic(audioRef.current);

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

  const safePlayAudio = () => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.debug("Audio play deferred until user interaction:", err);
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (!isPlaying) {
      safePlayAudio();
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
    soundFX.setMusicVolume(newVol);
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

  const safeConfetti = (options: confetti.Options) => {
    try {
      confetti(options);
    } catch {
      // Safe catch
    }
  };

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

      safeConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.35) },
        colors: ["#ff2a85", "#ff73b3", "#ffffff", "#f5efe2", "#ba1c5c"],
      });
    }, 400);
  };

  const triggerPartyPoppers = () => {
    const popperColors = ["#ff2a85", "#ffffff", "#FFD700"];

    safeConfetti({ particleCount: 80, spread: 70, origin: { x: 0, y: 1 }, angle: 60, colors: popperColors, startVelocity: 45, zIndex: 100 });
    safeConfetti({ particleCount: 80, spread: 70, origin: { x: 1, y: 1 }, angle: 120, colors: popperColors, startVelocity: 45, zIndex: 100 });
  };

  // Inside components/Hero.tsx

  // --- NEW: Premium Theme-Matched Confetti Burst Helper ---
  const triggerCelebrationConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;

    // Custom Shapes & Theme Palette (#ff2a85 Pink, #FFD700 Gold, White, Cream)
    const themeColors = ["#ff2a85", "#FFD700", "#ffffff", "#f5efe2", "#ff73b3"];

    // 1. Center / Top Star & Streamer Explosion
    safeConfetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.35, x: 0.5 },
      colors: themeColors,
      shapes: ["star", "square", "circle"],
      scalar: 1.2,
      ticks: 200,
      startVelocity: 35,
      zIndex: 120,
    });

    // 2. 2.5-Second Side Cannon Streamer Cascades
    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 25 * (timeLeft / duration);

      // Left Streamers & Confetti
      safeConfetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.4 },
        colors: themeColors,
        shapes: ["square", "circle"],
        startVelocity: 45,
        zIndex: 120,
      });

      // Right Streamers & Confetti
      safeConfetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.4 },
        colors: themeColors,
        shapes: ["square", "circle"],
        startVelocity: 45,
        zIndex: 120,
      });
    }, 250);
  };

  const handleLaunch = () => {
    if (stage !== "idle") return;

    setStage("launching");

    setTimeout(() => {
      setStage("fireworks");
      
      // 🎊 Trigger Premium Confetti Celebration
      triggerCelebrationConfetti();

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
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 py-8 sm:py-12">
      <div className="absolute w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-accent/5 blur-[90px] sm:blur-[120px] pointer-events-none z-0" />

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
            <div className="absolute top-1/4 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-accent/10 rounded-full blur-[60px] sm:blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-60 sm:w-96 h-60 sm:h-96 bg-white/5 rounded-full blur-[80px] sm:blur-[100px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center justify-center w-full z-20 my-auto">
        <AnimatePresence mode="wait">
          {(stage === "idle" || stage === "launching") && (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
              className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-lg"
            >
              <div className="text-center space-y-0.5 mt-0.5">
                <h1 className="font-serif text-xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  Let&apos;s <span className="italic text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light text-glow">Celebrate</span>
                </h1>
                <p className="font-mono text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest">
                  {stage === "idle" ? "Click the rocket to begin the celebration" : "Liftoff initiated..."}
                </p>
              </div>

              <motion.button
                aria-label="Launch Rocket Celebration"
                animate={
                  stage === "launching"
                    ? { y: -1000, scale: 0.5, opacity: 0, transition: { duration: 1.5, ease: "easeIn" } }
                    : { y: [0, -5, 0] }
                }
                transition={stage === "idle" ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}}
                whileHover={stage === "idle" ? { scale: 1.06 } : {}}
                onClick={handleLaunch}
                className="glass-panel p-3 sm:p-4 rounded-full cursor-pointer flex items-center justify-center text-accent box-glow bg-accent/5 border border-accent/20 relative group my-0.5"
              >
                <motion.div
                  animate={stage === "launching" ? { x: [-3, 3, -3, 3, 0], y: [2, -2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                </motion.div>
                
                {stage === "launching" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 2 }}
                    className="absolute -bottom-8 w-5 h-14 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent blur-md rounded-full"
                  />
                )}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full flex justify-center items-center relative select-none mt-0.5"
              >
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.12, 1] : 1,
                    opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.18,
                  }}
                  transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
                  className="absolute w-[180px] sm:w-[200px] h-[220px] sm:h-[240px] rounded-2xl bg-gradient-to-tr from-[#ff2a85] via-amber-400/20 to-transparent blur-[50px] sm:blur-[60px] pointer-events-none z-0"
                />

                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative w-[170px] xs:w-[185px] sm:w-[200px] rounded-2xl bg-[#0d0d0d]/85 backdrop-blur-2xl border border-white/20 p-2 sm:p-3 shadow-[0_18px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.3)] z-20 overflow-hidden flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 hover:border-[#ff2a85]/40 hover:shadow-[0_0_24px_rgba(255,42,133,0.25)]"
                >
                  <div className="absolute inset-1 rounded-[13px] border border-[#FFD700]/30 pointer-events-none z-10" />

                  <motion.div
                    animate={{ x: ["-100%", "250%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none z-30"
                  />

                  <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.8)] border border-white/20 z-20 bg-black/40">
                    <Image
                      src={PLAYER_BG_IMAGE}
                      alt="Aarya's Keepsake Photo"
                      fill
                      sizes="(max-width: 640px) 170px, 200px"
                      quality={75}
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />
                  </div>

                  <div className="text-center space-y-0.5 w-full z-20 px-0.5">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles className="w-2 h-2 text-[#ff2a85]" />
                      <h2 className="font-serif text-[11px] xs:text-xs sm:text-sm text-white tracking-tight font-semibold">
                        For Aarya <span className="text-[#ff2a85]">❤️</span>
                      </h2>
                      <Sparkles className="w-2 h-2 text-[#ff2a85]" />
                    </div>
                    <p className="font-mono text-[6.5px] sm:text-[7.5px] text-amber-200/80 uppercase tracking-[0.16em]">
                     Birthday Symphony • Dedicated to Aarya
                    </p>
                  </div>

                  <div className="w-full space-y-0.5 z-20 px-0.5">
                    <div className="relative w-full flex items-center">
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        aria-label="Audio Seek Time"
                        className="w-full h-0.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#ff2a85] focus:outline-none shadow-sm"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[7px] sm:text-[7.5px] font-mono text-neutral-300">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full z-20 px-1 pt-0.5">
                    <div 
                      className="relative flex items-center"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <button
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
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
                              aria-label="Volume Slider"
                              className="w-10 h-0.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ff2a85]"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous Track"
                        className="p-0.5 text-neutral-300 hover:text-white transition-colors"
                      >
                        <SkipBack className="w-3 h-3" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause Music" : "Play Music"}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-white via-amber-100 to-[#ff2a85] text-black flex items-center justify-center shadow-[0_0_12px_rgba(255,42,133,0.5)] hover:shadow-[0_0_20px_rgba(255,42,133,0.8)] transition-all duration-300"
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
                        aria-label="Next Track"
                        className="p-0.5 text-neutral-300 hover:text-white transition-colors"
                      >
                        <SkipForward className="w-3 h-3" />
                      </motion.button>
                    </div>

                    <div className="w-4" />
                  </div>

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

          {stage === "fireworks" && (
            <motion.div
              key="fireworks-text"
              className="text-center flex flex-col items-center justify-center space-y-3 sm:space-y-6 absolute inset-0 w-full h-full px-2"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
              />

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

              {EARLY_BALLOONS.map((b) => (
                <motion.div
                  key={`balloon-${b.id}`}
                  initial={{ opacity: 0, y: "100vh", rotate: -10 }}
                  animate={{ opacity: 1, y: "-20vh", rotate: 10 }}
                  transition={{ duration: b.duration, delay: b.delay, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  className="absolute z-10 pointer-events-none flex flex-col items-center"
                  style={{ left: b.left, transform: `scale(${b.scale})` }}
                >
                  <div 
                    className="w-9 h-12 sm:w-12 sm:h-16 relative shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.2)]" 
                    style={{ backgroundColor: b.color, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%" }}
                  >
                    <div className="absolute top-1.5 left-1.5 w-2 sm:w-3 h-3 sm:h-5 bg-white/40 rounded-full blur-[2px] rotate-45" />
                    <div 
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-t-[6px] border-l-[4px] border-r-[4px] border-transparent" 
                      style={{ borderTopColor: b.color }} 
                    />
                  </div>
                  <div className="w-[1px] h-14 sm:h-20 bg-white/20 -mt-1" />
                </motion.div>
              ))}

              {EARLY_EMOJIS.map((e) => (
                <motion.div
                  key={`emoji-${e.id}`}
                  initial={{ opacity: 0, y: "100vh", rotate: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], y: "-20vh", rotate: e.rotation }}
                  transition={{ duration: e.duration, delay: e.delay, ease: "linear", repeat: Infinity }}
                  className="absolute text-xl sm:text-2xl md:text-3xl z-10 pointer-events-none drop-shadow-lg"
                  style={{ left: e.left }}
                >
                  {e.emoji}
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0, x: -100, scale: 0.5, rotate: -20 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 4, delay: 0.5, ease: "easeOut" }}
                className="absolute left-4 sm:left-10 md:left-32 bottom-12 sm:bottom-20 text-3xl sm:text-5xl z-30 pointer-events-none drop-shadow-xl"
              >
                🎁
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 100, scale: 0.5, rotate: 20 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 4, delay: 0.8, ease: "easeOut" }}
                className="absolute right-4 sm:right-10 md:right-32 top-16 sm:top-32 text-4xl sm:text-6xl z-30 pointer-events-none drop-shadow-xl"
              >
                🎁
              </motion.div>

              <div className="relative z-40 flex flex-col items-center max-w-full px-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] sm:inset-[-40px] pointer-events-none z-50 rounded-full"
                >
                  <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-8 sm:h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                  <Sparkles className="absolute bottom-0 right-1/4 w-4 h-4 sm:w-6 sm:h-6 text-accent drop-shadow-[0_0_10px_rgba(255,42,133,1)]" />
                </motion.div>

                <motion.h2
                  initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)", textShadow: ["0 0 20px rgba(255, 255, 255, 0.4)", "0 0 60px rgba(255, 255, 255, 0.8)", "0 0 20px rgba(255, 255, 255, 0.4)"] }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 40, damping: 12, delay: 0.2 },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="font-serif text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold text-white tracking-tight leading-none text-glow mt-6 sm:mt-12 relative overflow-hidden"
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
                  className="font-serif text-4xl xs:text-5xl sm:text-8xl md:text-9xl lg:text-[9rem] font-bold text-accent tracking-tighter leading-none box-glow relative overflow-hidden"
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

      <AnimatePresence>
        {stage === "fireworks" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="absolute bottom-2 sm:bottom-3 flex flex-col items-center gap-1 text-neutral-500 hover:text-accent transition-colors duration-300 z-50"
          >
            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase bg-black/50 px-2 sm:px-2.5 py-0.5 rounded-full backdrop-blur-sm">Scroll to Discover</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}