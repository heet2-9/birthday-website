"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import NameReveal from "@/components/NameReveal";
import LoveLetter from "@/components/LoveLetter";
import MemoriesGallery from "@/components/MemoriesGallery";
import Timeline from "@/components/Timeline";
import SurpriseBox from "@/components/SurpriseBox";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative bg-[#030303] min-h-screen selection:bg-accent selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content" className="relative z-20">
            <Hero />
            <NameReveal />
            <LoveLetter />
            <MemoriesGallery />
            <Timeline />
            <SurpriseBox />
            <FinalScene />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}