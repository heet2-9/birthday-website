import { useState, useEffect, useRef, useCallback } from "react";
import { soundFX } from "@/lib/soundFX";

export interface UseAudioReturn {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  showVolumeSlider: boolean;
  setShowVolumeSlider: (show: boolean) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number) => string;
}

export function useAudio(src: string = "/birthday-piano.mpeg"): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialVolume = soundFX.getMusicVolume();
    setVolume(initialVolume);

    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = initialVolume;

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
  }, [src]);

  const safePlayAudio = useCallback(() => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.debug("Audio play deferred until user interaction:", err);
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
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
  }, [isPlaying, volume, safePlayAudio]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = parseFloat(e.target.value);
      setVolume(newVol);
      soundFX.setMusicVolume(newVol);
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        if (audioRef.current) audioRef.current.muted = false;
      }
    },
    [isMuted]
  );

  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  return {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    volume,
    showVolumeSlider,
    setShowVolumeSlider,
    togglePlay,
    toggleMute,
    handleSeek,
    handleVolumeChange,
    formatTime,
  };
}
