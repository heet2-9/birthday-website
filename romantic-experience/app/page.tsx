"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Critical top-of-page components (Loaded synchronously for zero latency)
import LoadingScreen from "@/components/ui/LoadingScreen";
import CanvasParticles from "@/components/ui/CanvasParticles";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Hero from "@/components/Hero";

// Below-the-fold experience components (Dynamically imported to optimize bundle)
const LoveLetter = dynamic(() => import("@/components/LoveLetter"), { ssr: false });
const NameReveal = dynamic(() => import("@/components/NameReveal"), { ssr: false });
const MemoriesGallery = dynamic(() => import("@/components/MemoriesGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const FinalScene = dynamic(() => import("@/components/FinalScene"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden relative">
      {/* 1. Loading Screen Stage */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Main Romantic Experience */}
      {!isLoading && (
        <>
          <CanvasParticles />

          <SmoothScroll>
            <Hero />
            <LoveLetter />
            <NameReveal />
            <MemoriesGallery />
            <Timeline />
            <FinalScene />
          </SmoothScroll>
        </>
      )}
    </main>
  );
}
