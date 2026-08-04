"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type MicPermissionState = "idle" | "listening" | "denied" | "unsupported";

interface UseBlowDetectionProps {
  onBlowDetected: () => void;
  enabled: boolean;
  energyThreshold?: number;
  windThreshold?: number;
}

export function useBlowDetection({
  onBlowDetected,
  enabled,
  energyThreshold = 18,
  windThreshold = 22,
}: UseBlowDetectionProps) {
  const [micState, setMicState] = useState<MicPermissionState>("idle");
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);
  const onBlowDetectedRef = useRef(onBlowDetected);

  useEffect(() => {
    onBlowDetectedRef.current = onBlowDetected;
  }, [onBlowDetected]);

  const stopMic = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
    }
    setMicState("idle");
  }, []);

  const enableMic = useCallback(async () => {
    if (hasTriggeredRef.current || !enabled) return;
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicState("unsupported");
      return;
    }

    try {
      // 1. Initialize or resume AudioContext
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      if (streamRef.current) {
        setMicState("listening");
        return;
      }

      // 2. Request audio stream without noise suppression filtering wind turbulence
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      streamRef.current = stream;

      const audioContext = audioCtxRef.current;
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // 3. Connect MediaStreamSource to AnalyserNode
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicState("listening");

      let blowFrameCount = 0;

      // 4. Real-time blow detection loop
      const detectBlow = () => {
        if (hasTriggeredRef.current || !audioCtxRef.current) return;

        analyser.getByteFrequencyData(dataArray);

        let totalSum = 0;
        let lowWindSum = 0;
        let highFreqSum = 0;

        const totalBins = dataArray.length;
        const windCutoffBin = Math.min(32, totalBins); // Bins 0-32 (0Hz to ~3kHz)

        for (let i = 0; i < totalBins; i++) {
          const val = dataArray[i];
          totalSum += val;
          if (i < windCutoffBin) {
            lowWindSum += val;
          } else {
            highFreqSum += val;
          }
        }

        const totalAvg = totalSum / totalBins;
        const lowWindAvg = lowWindSum / windCutoffBin;
        const highAvg = highFreqSum / (totalBins - windCutoffBin);
        const blowRatio = highAvg / (lowWindAvg + 1);

        // Calibrated blow detection condition:
        // Evaluates low-mid wind turbulence & overall audio volume amplitude
        const isBlowingFrame =
          (lowWindAvg > windThreshold && totalAvg > energyThreshold) ||
          (totalAvg > energyThreshold * 1.4) ||
          (blowRatio > 0.35 && totalAvg > 14);

        if (isBlowingFrame) {
          blowFrameCount++;
        } else {
          blowFrameCount = Math.max(0, blowFrameCount - 1);
        }

        // Require 2 consecutive frames (~30ms) to confirm intentional blow
        if (blowFrameCount >= 2 && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          stopMic();
          onBlowDetectedRef.current();
          return;
        }

        animFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err) {
      console.warn("Microphone access error:", err);
      setMicState("denied");
    }
  }, [enabled, energyThreshold, windThreshold, stopMic]);

  useEffect(() => {
    if (!enabled) {
      stopMic();
    }
    return () => {
      stopMic();
    };
  }, [enabled, stopMic]);

  return {
    micState,
    enableMic,
    stopMic,
  };
}
