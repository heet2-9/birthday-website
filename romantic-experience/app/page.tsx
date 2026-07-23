"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Critical top-of-page components (Loaded synchronously)
import LoadingScreen from "@/components/LoadingScreen";
import CanvasParticles from "@/components/CanvasParticles";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";

// Non-critical below-the-fold components (Dynamically imported to cut bundle size)
const LoveLetter = dynamic(() => import("@/components/LoveLetter"), { ssr: false });
const NameReveal = dynamic(() => import("@/components/NameReveal"), { ssr: false });
const MemoriesGallery = dynamic(() => import("@/components/MemoriesGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const FinalScene = dynamic(() => import("@/components/FinalScene"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden relative">
      {/* 1. Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Main Experience */}
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