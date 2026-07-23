"use client";

import { useState } from "react";

// --- Import components ---
import LoadingScreen from "@/components/LoadingScreen";
import CanvasParticles from "@/components/CanvasParticles";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import NameReveal from "@/components/NameReveal";
import MemoriesGallery from "@/components/MemoriesGallery";
import Timeline from "@/components/Timeline";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  // Controls the Loading Screen overlay state[cite: 19]
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden relative">
      
      {/* 1. The Loading Screen Overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. The Main Experience (Shows once loaded) */}
      {!isLoading && (
        <>
          {/* Global Ambient Background Particles */}
          <CanvasParticles />
          
          {/* Smooth Scrolling Wrapper */}
          <SmoothScroll>
            
            {/* --- THE CINEMATIC JOURNEY --- */}
            
            {/* Act 1: The Rocket Launch, Integrated Music Keepsake Player, & Fireworks */}
            <Hero />
            
            {/* Act 2: Unpacking the Gift & The Luxury Invitation Letter */}
            <LoveLetter />

            {/* Act 3: "Wishes For You" Text Reveal */}
            <NameReveal />
            
            {/* Act 4: The Polaroid Camera Memories */}
            <MemoriesGallery />
            
            {/* Act 5: The Luxury Cake & Wish Ceremony */}
            <Timeline />
            
            {/* Act 6: The Final Goodbye & Aurora */}
            <FinalScene />

          </SmoothScroll>
        </>
      )}
      
    </main>
  );
}