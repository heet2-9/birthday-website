"use client";

import { useState } from "react";

// --- Import all your beautiful components ---
import LoadingScreen from "@/components/LoadingScreen";
import MusicToggle from "@/components/MusicToggle";
import CanvasParticles from "@/components/CanvasParticles";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import NameReveal from "@/components/NameReveal";
import MemoriesGallery from "@/components/MemoriesGallery";
import Timeline from "@/components/Timeline";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  // This state controls the Loading Screen overlay
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden relative">
      
      {/* 1. The Loading Screen Overlay */}
      {/* It will automatically call setIsLoading(false) when it reaches 100% */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. The Main Experience (Only shows after loading is done) */}
      {!isLoading && (
        <>
          {/* Global UI Elements (These stay on screen the whole time) */}
          <MusicToggle />
          <CanvasParticles />
          
          {/* Smooth Scrolling Wrapper for the page content */}
          <SmoothScroll>
            
            {/* --- THE CINEMATIC JOURNEY --- */}
            
            {/* Act 1: The Rocket Launch & Happy Birthday */}
            <Hero />
            
            {/* Act 2: Unpacking the Gift & The Letter */}
            <LoveLetter />
            
            {/* Act 3: "Wishes For You" Text Reveal */}
            <NameReveal />
            
            {/* Act 4: The Polaroid Camera Memories */}
            <MemoriesGallery />
            
            {/* Act 5: The Luxury Cake & The Wish (Your updated file!) */}
            <Timeline />
            
            {/* Act 6: The Final Goodbye & Aurora */}
            <FinalScene />

          </SmoothScroll>
        </>
      )}
      
    </main>
  );
}