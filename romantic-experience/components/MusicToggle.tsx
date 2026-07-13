"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  // Update the path here to point to your .mpeg file
  audioRef.current = new Audio("/birthday-piano.mpeg");
  audioRef.current.loop = true;

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
}, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback interaction hurdle: ", err);
      });
        }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white/80 hover:text-accent transition-all duration-300 group text-xs font-mono tracking-widest uppercase"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-accent animate-pulse" />
          <span>Music On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-neutral-500 group-hover:text-accent" />
          <span>Music Off</span>
        </>
      )}
    </button>
  );
}